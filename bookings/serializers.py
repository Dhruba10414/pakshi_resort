from rest_framework import serializers
from .models import Rooms, RoomType, Bookings, Guests

class GuestIdNameSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Guests
        fields = ['id', 'name']

class BookingEmbededSerializer(serializers.ModelSerializer):
    guest = GuestIdNameSerailizer(read_only=True, allow_null=True)
    check_in = serializers.DateField(format="%d-%m-%Y", read_only=True)
    check_out = serializers.DateField(format="%d-%m-%Y", read_only=True)

    class Meta:
        model = Bookings
        fields = ['id', 'guest', 'check_in', 'check_out']


class BookingSerializer(serializers.ModelSerializer):
    guest = serializers.SlugRelatedField(slug_field='name', read_only=True)
    room = serializers.SlugRelatedField(slug_field='room_num', read_only=True)
    booked_on = serializers.DateField(format="%d-%m-%Y")
    check_in = serializers.DateField(format="%d-%m-%Y")
    check_out = serializers.DateField(format="%d-%m-%Y")
    by_staff = serializers.SlugRelatedField(slug_field='user_name', read_only=True, allow_null=True)

    class Meta:
        model = Bookings
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    room_type = serializers.SlugRelatedField(slug_field='room_type', read_only=True)
    is_occupied = serializers.SerializerMethodField()
    active_booking = BookingSerializer(allow_null=True)

    class Meta:
        model = Rooms
        fields = ['id', 'room_num', 'room_type', 'is_occupied', 'active_booking']

    def get_is_occupied(self, obj):
        return obj.active_booking is not None

class RoomGuestEmbededSerializer(RoomSerializer):
    active_booking = BookingEmbededSerializer(allow_null=True)

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guests
        fields = '__all__'

class BookingGuestDetailSerializer(BookingSerializer):
    guest = GuestSerializer()


class AvailableRoomCountSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'type': instance['type_'],
            'available': instance['available']
        }