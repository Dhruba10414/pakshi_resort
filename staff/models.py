
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if email is None:
            raise ValueError('Provide an Email for creating an staff')

        if kwargs.get('role') =='A':
            kwargs.setdefault('is_admin', True)
            kwargs.setdefault('is_active', True)
            kwargs.setdefault('is_staff', True)
          

        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_admin', True)
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_staff', True)
        
        if kwargs.get('is_admin') is not True:
            raise ValueError('Admin permission not given')
        if kwargs.get('is_active') is not True:
            raise ValueError('Admin must be an active staff')

        return self.create_user(email, password, **kwargs)


class User(AbstractBaseUser):

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
        )
    user_name = models.CharField(max_length=150)
    ROLE_CHOICES = (
        ('A', 'Admin'),
        ('S', 'Staff'),
    )
    role = models.CharField(max_length=1, choices=ROLE_CHOICES)

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    contact = models.CharField(max_length=15)
    start_date = models.DateTimeField(auto_now_add=True)
   
    is_active = models.BooleanField(default=True)
    is_staff =  models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name']
    objects = UserManager()

    def __str__(self):
        return self.email

    