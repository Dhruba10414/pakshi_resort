from rest_framework import serializers
from food.models import FoodItem,FoodOrdering
from bookings.serializers import GuestSerializer
from staff.serializers import UserSerializer
from datetime import datetime

class FoodItemSerilizer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'


class FoodOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodOrdering
        fields = ['quantity','time','isComplete','isCancel']

class OrderItemEmbededSerializer(serializers.ModelSerializer):
    guest = GuestSerializer(read_only=True)
    food = FoodItemSerilizer(read_only=True)
    
    taken_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model=FoodOrdering
        fields = ['id','guest','food','taken_by','order_price','quantity','isComplete','isCancel','time']


class FoodOrderEmbededSerializer(serializers.ModelSerializer):
    food = FoodItemSerilizer(read_only=True)
    taken_by = serializers.PrimaryKeyRelatedField(read_only=True)
    guest = GuestSerializer(read_only=True)
    time = serializers.DateTimeField(format="%d-%m-%Y %I:%M %p", read_only=True)
    total=serializers.SerializerMethodField()

    class Meta:
        model=FoodOrdering
        fields=['id','food','quantity','time','taken_by', 'isComplete', 'isCancel', 'guest','order_price','total']
    
    def get_total(self,obj):
        return (obj.order_price*obj.quantity)

class FoodAnalyticsSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):

        return {
            'month': instance['month'].month,
            'year': instance['month'].year,
            'total_food_orders': instance['orders'],
            'total_income': instance['income']
        }
