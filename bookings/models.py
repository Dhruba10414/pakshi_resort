from django.db import models
from django.contrib.auth import get_user_model

# Not yet migrated
class RoomType(models.Model):
    room_type = models.CharField(max_length=32)
    total_rooms = models.IntegerField()
    tariff = models.FloatField()


class Rooms(models.Model):
    room = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='attr')
    room_num = models.IntegerField(unique=True)
    is_booked = models.BooleanField(default=False)


class Guests(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField()
    address = models.CharField(max_length=256)
    contact = models.CharField(max_length=16)
    is_leaved = models.BooleanField(default=False)


class Bookings(models.Model):
    room_id = models.ForeignKey(Rooms, on_delete=models.PROTECT, related_name='bookings')
    guest_id = models.ForeignKey(Guests, on_delete=models.PROTECT, related_name='booked')
    booked_on = models.DateField(auto_now_add=True)
    check_in = models.DateField()
    check_out = models.DateField()
    is_complete = models.BooleanField(default=False)
    by_staff = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL related_name='staff_booked', null=True)