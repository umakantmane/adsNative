from django.conf.urls import url
from student import views

urlpatterns = [
    url(r'^course$', views.CourseList.as_view()),
    url(r'^course/(?P<pk>[0-9]+)/$', views.CourseDetail.as_view()),
    url(r'^enrollment$', views.EnrollmentList.as_view()),
    url(r'^enrollment/(?P<pk>[0-9]+)/$', views.EnrollmentDetail.as_view()),
    url(r'^studentenroll/(?P<user_id>[0-9]+)$', views.StudentEnroll.as_view()),
    url(r'^student_enroll_delete/(?P<pk>[0-9]+)$', views.StudentEnrollDetails.as_view())
]