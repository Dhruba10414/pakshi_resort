from django.urls import path
from .views import *

urlpatterns = [
    path('guests/rooms-bills/', GuestInvoiceView.as_view(), name='guest_invoice'),
    path('rooms/bill/', BookingBill.as_view(), name='guest_invoice'),
    path('payments/receive/', PaymentReceiveView.as_view(), name='payment_recieve'),
    path('guests/summury/', GuestInvoiceSummuryView.as_view(), name='invoice_summury'),
    path('guests/payments/', GuestPaymentsList.as_view(), name='guest_payments'),
]