# Generated by Django 3.1.7 on 2021-04-03 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0005_auto_20210331_0224'),
    ]

    operations = [
        migrations.AddField(
            model_name='foodordering',
            name='order_price',
            field=models.FloatField(default=0.0),
        ),
    ]
