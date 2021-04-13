from django.db import models
from bookings.models import Guests
from django.contrib.auth import get_user_model

class Services(models.Model):
    name = models.CharField(max_length=128, unique=True)
    ticket_price = models.FloatField()

class Tickets(models.Model):
    bought_by = models.ForeignKey(Guests, on_delete=models.CASCADE, related_name='tickets')
    registered_by = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    issued_on = models.DateTimeField(auto_now=True)
    issued_date = models.DateField()
    num_tickets = models.IntegerField()
    ticket_tariff = models.FloatField()
    ticket_for = models.ForeignKey(Services, on_delete=models.PROTECT)
    