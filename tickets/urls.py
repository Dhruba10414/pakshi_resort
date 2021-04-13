from django.urls import path
from .views import *

urlpatterns = [
    path('services/', ServicesEndpoint.as_view(), name='services'),
    path('sells/', TicketsView.as_view(), name='ticket_buying'),
    path('guest-tickets/', GuestTicketsInvoiceList.as_view(), name='guest_tickets'),
    path('logs/', TicketsLog.as_view(), name='ticket_logs'),
]