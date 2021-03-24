from rest_framework import serializers
from food.models import FoodItem,FoodOrdering
from bookings.serializers import GuestIdNameSerailizer
from staff.serializers import UserSerializer


class FoodItemSerilizer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = '__all__'


class FoodOrderingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodOrdering
        fields = ['quantity','time','isComplete','isCancel']

class OrderItemEmbededSerializer(serializers.ModelSerializer):
    guest = serializers.PrimaryKeyRelatedField(read_only=True)
    food = serializers.PrimaryKeyRelatedField(read_only=True)
    taken_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model=FoodOrdering
        fields = ['id','guest','food','taken_by','quantity','isComplete','isCancel','time']

class FoodOrderEmbededSerializer(serializers.Serializer):
    food_name = serializers.CharField(max_length=100)
    food_price = serializers.FloatField()
    food_type = serializers.CharField(max_length=1)

    order_quantity = serializers.IntegerField()
    order_time = serializers.DateTimeField()
    guest_id = serializers.IntegerField()
