from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class StaffManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if email is None:
            raise ValueError('Provide an Email for creating an staff')

        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_admin', True)
        kwargs.setdefault('is_active', True)
        
        if kwargs.get('is_admin') is not True:
            raise ValueError('Admin permission not given')
        if kwargs.get('is_active') is not True:
            raise ValueError('Admin must be an active staff')

        return self.create_user(email, password, **kwargs)

class Staff(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=64)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    objects = StaffManager()

    def __str__(self):
        return self.email

    
