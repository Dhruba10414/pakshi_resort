from rest_framework import serializers
from bookings.models import Rooms, RoomType, Bookings, Guests
from bookings.serializers import BookingSerializer
from .models import Payments
from django.contrib.auth import get_user_model

class BookingWithBill(BookingSerializer):
    room_num = serializers.SerializerMethodField()
    room_type = serializers.SerializerMethodField()
    room_tariff = serializers.SerializerMethodField()
    bill = serializers.FloatField()
    stayed = serializers.IntegerField()

    def get_room_num(self, obj):
        return obj.room.room_num

    def get_room_type(self, obj):
        return obj.room.room_type.room_type

    def get_room_tariff(self, obj):
        return obj.room.room_type.tariff


class PaymentsSerializer(serializers.ModelSerializer):
    guest = serializers.SlugRelatedField(slug_field='name', read_only=True)
    received_by = serializers.SlugRelatedField(slug_field='user_name', read_only=True)
    timestamp = serializers.DateTimeField(format="%d-%m-%Y %I:%M %p", read_only=True)
    class Meta:
        model = Payments
        fields = '__all__'

class PaymentReceiveSerializer(PaymentsSerializer):
    guest = serializers.PrimaryKeyRelatedField(queryset=Guests.objects.all())
    received_by = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())