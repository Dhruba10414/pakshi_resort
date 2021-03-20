from django.urls import path
from .views import *

urlpatterns = [
    path('guests/invoice/', GuestInvoiceView.as_view(), name='guest_invoice'),
    path('rooms/invoice/', RoomBill.as_view(), name='guest_invoice'),
]