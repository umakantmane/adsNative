from django.conf.urls import url
from sites import views
from rest_framework.authtoken import views as rest_view

urlpatterns = [
    url(r'^signup$', views.SignUp.as_view()),
    url(r'^createsuperuser$', views.CreateSuperUser.as_view()),
    url(r'^signin$', views.SignIn.as_view()),
    url(r'^get_auth_token/$', rest_view.obtain_auth_token, name='get_auth_token'),
]