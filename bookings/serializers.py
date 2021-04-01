from rest_framework import serializers
from .models import Rooms, RoomType, Bookings, Guests, BookingRequest
from datetime import date


class RoomTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomType
        fields = '__all__'


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
    
    class Meta:
        model = Rooms
        fields = ['id', 'room_num', 'room_type']

class RoomOccupiedSerializer(RoomSerializer):
    is_occupied = serializers.SerializerMethodField()
    active_booking = BookingSerializer(allow_null=True)

    def get_is_occupied(self, obj):
        return obj.active_booking is not None


class RoomGuestEmbededSerializer(RoomOccupiedSerializer):
    active_booking = BookingEmbededSerializer(allow_null=True)

    class Meta:
        model = Rooms
        fields = ['id', 'room_num', 'room_type', 'is_occupied', 'active_booking']

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


class BookingRequestSerializer(serializers.ModelSerializer):
    guest = GuestSerializer(read_only=True)
    room_type = serializers.SlugRelatedField(slug_field="room_type", read_only=True)
    check_in = serializers.DateField(format="%d-%m-%Y", input_formats=["%d-%m-%Y", ])
    check_out = serializers.DateField(format="%d-%m-%Y", input_formats=["%d-%m-%Y", ])
    requested_on = serializers.DateTimeField(format="%d-%m-%Y %I:%M %p", read_only=True)

    class Meta:
        model = BookingRequest
        fields = '__all__'


class BookingRequestWriteSerializer(BookingRequestSerializer):
    guest = serializers.PrimaryKeyRelatedField(queryset=Guests.objects.all())
    room_type = serializers.PrimaryKeyRelatedField(queryset=RoomType.objects.all())

    def validate(self, data):
        if data['check_in'] >= data['check_out'] or data['check_in'] <= date.today():
            raise serializers.ValidationError("Check In can't past Check Out or In past date.")
        return data

    def create(self, validated_data):
        guest = validated_data.pop('guest')
        requested_booking = BookingRequest(**validated_data)
        requested_booking.guest = guest
        requested_booking.save()

        return requested_booking