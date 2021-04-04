
from django.db import models
from django.contrib.auth import get_user_model
from bookings.models import  Guests 

class FoodItem(models.Model):
    name=models.CharField(max_length=100,null=False)
    description = models.CharField(max_length=15,null=True)
    price = models.FloatField(null=False)
    available = models.BooleanField(default=True)

    Food_CHOICES = (
        ('B', 'Breakfast'),
        ('L', 'Lanch'),
        ('S','Snacks'),
        ('D','Dinner')
    )
    food_type = models.CharField(max_length=1,choices=Food_CHOICES)

class FoodOrdering(models.Model):
    quantity = models.IntegerField(default=1)
    time = models.DateTimeField(auto_now=True)
    isComplete = models.BooleanField(default=False)
    isCancel = models.BooleanField(default=False)
    order_price = models.FloatField(default=0.0)
    guest = models.ForeignKey(Guests,on_delete=models.SET_NULL,null=True,related_name='guest')
    food = models.ForeignKey(FoodItem,on_delete=models.SET_NULL,null=True,related_name='food')
    taken_by = models.ForeignKey(get_user_model(),on_delete=models.SET_NULL,null=True,related_name='taken_by')
