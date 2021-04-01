from django.urls import path
from .views import *

urlpatterns = [
    path('services/', ServicesEndpoint.as_view(), name='services'),
    path('buy/', BuyTicket.as_view(), name='ticket_buying'),
    path('guest-tickets/', GuestTicketsInvoiceList.as_view(), name='guest_tickets'),
]