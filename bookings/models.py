from django.db import models
from django.contrib.auth import get_user_model


class RoomType(models.Model):
    room_type = models.CharField(max_length=32)
    total_rooms = models.IntegerField()
    tariff = models.FloatField()


class Rooms(models.Model):
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='rooms')
    room_num = models.IntegerField(unique=True)
    active_booking = models.ForeignKey('Bookings', on_delete=models.SET_NULL, null=True)


class Guests(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    address = models.CharField(max_length=256)
    contact = models.CharField(max_length=16)
    is_staying = models.BooleanField(default=False)


class Bookings(models.Model):
    room = models.ForeignKey(Rooms, on_delete=models.PROTECT, related_name='bookings')
    guest = models.ForeignKey(Guests, on_delete=models.PROTECT, related_name='booked')
    booked_on = models.DateField(auto_now_add=True)
    check_in = models.DateField()
    check_out = models.DateField()
    is_complete = models.BooleanField(default=False)
    is_canceled = models.BooleanField(default=False)
    by_staff = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='staff_booked', null=True)


class BookingRequest(models.Model):
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE, related_name='pending_bookings')
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    requested_on = models.DateTimeField(auto_now=True)
    check_in = models.DateField()
    check_out = models.DateField()
    num_of_rooms = models.IntegerField()
    has_confirmed = models.BooleanField(default=False)
    has_canceled = models.BooleanField(default=False)