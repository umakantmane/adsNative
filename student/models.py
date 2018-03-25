from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):

    course_name = models.CharField(max_length=100, db_index=True, unique=True)
    course_desc =  models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'course'

    def __str__(self):

        return self.course_name

class CorseEnrollment(models.Model):

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'course_enrollment'





