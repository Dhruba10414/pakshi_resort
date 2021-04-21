
from django.conf.urls import url
from django.urls import path, include
from staff.views import UserView, StaffLeaved,UserDeleteView,UserList,UserRegistrationView,LogoutAPIView,ChangePasswordView



urlpatterns = [
     path('signup/', UserRegistrationView.as_view()),
     path('logout/', LogoutAPIView.as_view(), name="logout"),
     path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
     path('users/', UserList.as_view(),name='userList'),
     path('delete/<int:pk>/', UserDeleteView.as_view(), name='delete_user'),
     path('remove/',StaffLeaved.as_view(),name='remove_a_user'),
     path('user/', UserView.as_view(), name='get_a_user'),
    ]