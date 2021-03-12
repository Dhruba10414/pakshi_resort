
from django.conf.urls import url
from django.urls import path, include
from staff.views import UserRegistrationView
from staff.views import UserLoginView


urlpatterns = [
     url(r'^signup', UserRegistrationView.as_view()),
     url(r'^signin', UserLoginView.as_view()),
     path('', include('staff.profile.urls')),
    ]