# Generated by Django 3.1.7 on 2021-03-22 20:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('food', '0002_auto_20210323_0203'),
    ]

    operations = [
        migrations.AlterField(
            model_name='foodordering',
            name='guest',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='guest', to='bookings.guests'),
        ),
        migrations.AlterField(
            model_name='foodordering',
            name='taken_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='taken_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
