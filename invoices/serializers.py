from rest_framework import serializers
from bookings.models import Rooms, RoomType, Bookings, Guests


class BookingWithBill(BookingSerializer):
    room_num = serializers.SerializerMethodField()
    room_type = serializers.SerializerMethodField()
    room_tariff = serializers.SerializerMethodField()
    bill = serializers.SerializerMethodField()

    def get_room_num(self, obj):
        return obj.room.room_num

    def get_room_type(self, obj):
        return obj.room.room_type.room_type

    def get_room_tariff(self, obj):
        return obj.room.room_type.tariff

    def get_bill(self, obj):
        days_stayed = int((obj.check_out - obj.check_in).days)

        return obj.room.room_type.tariff * days_stayed