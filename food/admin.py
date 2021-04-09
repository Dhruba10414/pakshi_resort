
from django.contrib import admin

# Register your models here.

from .models import FoodItem,FoodOrdering

admin.site.register(FoodItem)
admin.site.register(FoodOrdering)