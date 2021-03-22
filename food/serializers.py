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
    guest = serializers.SlugRelatedField(slug_field='name', read_only=True)
    food = serializers.PrimaryKeyRelatedField(read_only=True)
    taken_by = serializers.SlugRelatedField(slug_field='user_name', read_only=True)

    class Meta:
        model=FoodOrdering
        fields = '__all__'

