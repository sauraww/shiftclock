# Generated by Django 3.2.11 on 2023-04-10 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shiftclock', '0002_timesheet_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='login_timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='logout_timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]