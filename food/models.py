
from django.db import models
from django.contrib.auth import get_user_model
from bookings.models import  Guests 

class FoodItem(models.Model):
    name=models.CharField(max_length=100,null=False)
    description = models.CharField(max_length=300,null=True)
    price = models.FloatField()
    available = models.BooleanField(default=True)

    Food_CHOICES = (
        ('B', 'Breakfast'),
        ('L', 'Lanch'),
        ('D','Dinner')
    )
    food_type = models.CharField(max_length=1,choices=Food_CHOICES)

class FoodOrdering(models.Model):
    quantity = models.IntegerField(default=1)
    time = models.DateField(auto_now_add=True)
    isComplete = models.BooleanField(default=False)
    isCancel = models.BooleanField(default=False)
    guest = models.ForeignKey(Guests,on_delete=models.SET_NULL,null=True)
    food = models.ForeignKey(FoodItem,on_delete=models.SET_NULL,null=True)
    taken_by = models.ForeignKey(get_user_model(),on_delete=models.SET_NULL,null=True)
