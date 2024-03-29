from django.db import models
from bookings.models import Guests
from django.contrib.auth import get_user_model


class Payments(models.Model):
    paid_for_options = (
        ('RB', 'Room Bookings'),
        ('RT', 'Restuarant'),
        ('PT', 'Park Tickets')
    )
    guest = models.ForeignKey(Guests, on_delete=models.CASCADE, related_name='payments')
    timestamp = models.DateTimeField(auto_now=True)
    amount = models.FloatField()
    received_by = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    notes = models.CharField(max_length=256)
    paid_for = models.CharField(max_length=3, choices=paid_for_options, default='RB')