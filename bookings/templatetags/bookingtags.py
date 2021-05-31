from django import template

register = template.Library()

@register.simple_tag(name='vatFormatter')
def vatFormatter(vat, *args, **kwargs):
    return f'{vat * 100}:.2f'