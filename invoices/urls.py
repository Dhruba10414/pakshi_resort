from django.urls import path
from .views import *

urlpatterns = [
    path('guests/invoice/', GuestInvoiceView.as_view(), name='guest_invoice'),
    path('rooms/invoice/', BookingBill.as_view(), name='guest_invoice'),
    path('payments/receive/', PaymentReceiveView.as_view(), name='payment_recieve'),
    path('guests/summury/', GuestInvoiceSummuryView.as_view(), name='invoice_summury'),
]