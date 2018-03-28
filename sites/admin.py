from django.contrib import admin
from student.models import Course,CorseEnrollment
# Register your models here.

admin.site.register(Course)
admin.site.register(CorseEnrollment)
