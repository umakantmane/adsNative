# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-03-24 20:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0003_corseenrollment'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_desc',
            field=models.CharField(default=None, max_length=250),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='course',
            name='course_name',
            field=models.CharField(db_index=True, max_length=100, unique=True),
        ),
    ]
