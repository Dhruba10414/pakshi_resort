from django.shortcuts import render
from rest_framework import serializers
from bookings.models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import F, ExpressionWrapper
from django.db.models import DurationField, FloatField, IntegerField
from .db_tools import Datediff
from django.db.models.aggregates import Sum
from django.db.models.functions import Coalesce


class GuestInvoiceView(generics.GenericAPIView):
    serializer_class = BookingWithBill

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id is not None:
            guest_bookings = Bookings.objects.filter(guest__id=guest_id, is_canceled=False
                            ).annotate(stayed=Datediff(F('check_out'), F('check_in'))
                            ).annotate(bill=ExpressionWrapper(F('rate')*
                            F('stayed'), output_field=FloatField())).order_by('check_in')

            bills = self.get_serializer(guest_bookings, many=True)

            return Response(bills.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class BookingBill(generics.GenericAPIView):
    serializer_class = BookingWithBill

    def get(self, request, *args, **kwargs):
        booking_id = request.query_params.get('booking', None)

        if booking_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        booking = Bookings.objects.filter(id=booking_id
                        ).annotate(stayed=Datediff('check_out', 'check_in')
                        ).annotate(bill=ExpressionWrapper(F('rate')*
                        F('stayed'), output_field=FloatField())).first()
        
        bill = self.get_serializer(booking)

        return Response(bill.data, status=status.HTTP_200_OK)


class PaymentsView(generics.GenericAPIView):
    serializer_class = PaymentReceiveSerializer

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id is not None:
            payments = Payments.objects.filter(guest_id=guest_id)
            payments_data = PaymentsSerializer(payments, many=True)
            return Response(payments_data.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        request.data['received_by'] = request.user.id
        new_payment = self.get_serializer(data=request.data)
        new_payment.is_valid(raise_exception=True)
        new_payment.save()

        return Response(new_payment.data, status=status.HTTP_201_CREATED)
        

class GuestInvoiceSummuryView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        guest = request.query_params.get('guest', None)

        if guest is not None:
            bills = Bookings.objects.filter(guest__id=guest, is_canceled=False).annotate(
                                stayed=Datediff('check_out', 'check_in')
                                ).annotate(bill=ExpressionWrapper(F('rate')*
                                F('stayed'), output_field=FloatField()))
            total_bill = bills.aggregate(total=Coalesce(Sum('bill'), 0.0))['total']

            payments = Payments.objects.filter(guest__id=guest)
            total_paid = payments.aggregate(total=Coalesce(Sum('amount'), 0.0))['total']
            
            summury = {
                'total_bills': total_bill,
                'total_paid': total_paid,
                'due': total_bill - total_paid
            }
            
            return Response(data=summury, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
