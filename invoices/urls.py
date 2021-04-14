from django.urls import path
from .views import *

urlpatterns = [
    path('resort-invoice/', GuestInvoiceView.as_view(), name='guest_invoice'),
    path('rooms/bill/', BookingBill.as_view(), name='guest_invoice'),
    path('payments/', PaymentsView.as_view(), name='payment_recieve'),
    path('resort-short-invoice/', GuestInvoiceSummuryView.as_view(), name='invoice_summury'),
    path('resort-logs/', ResortLog.as_view(), name='resort_log'),
    path('analytics/', ResortAnalytics.as_view(), name='resort_analytics'),
]