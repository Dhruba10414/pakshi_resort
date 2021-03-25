from django.db import models

class Datediff(models.Func):
    function = ''
    interval = 'dd'
    param_order = ("date_end", "date_start")
    
    def __init__(self, *expressions, **extra):
        self.interval = 'dd'
        super(Datediff, self).__init__(output_field=models.IntegerField(), *expressions, **extra)


    def as_sql(self, compiler, connection, function=None, template=None):
        connection.ops.check_expression_support(self)
        params = []
        date_start_sql, date_start_params = compiler.compile(self.source_expressions[1])
        date_end_sql, date_end_params = compiler.compile(self.source_expressions[0])
        self.extra['date_start'] = date_start_sql
        self.extra['date_end'] = date_end_sql

        params_dict = {
            'date_start': date_start_params,
            'date_end': date_end_params
        }

        for params_for in self.param_order:
            params.extend(params_dict[params_for])

        template = template or self.extra.get('template', self.template)

        return ((template % self.extra), params) 


    def as_mysql(self, compiler, connection):
        interval_expression = 'DAY'
        self.template = 'TRUNCATE(TIMESTAMPDIFF(%(interval_expression)s,%(date_start)s,%(date_end)s),0)'
        self.extra["interval_expression"] = interval_expression
        self.param_order = ("date_start", "date_end")

        return self.as_sql(compiler, connection)