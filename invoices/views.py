from django.shortcuts import render
from rest_framework import serializers
from bookings.models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAdminUser
from django.db.models import F, ExpressionWrapper, Q
from django.db.models import DurationField, FloatField, IntegerField
from .db_tools import Datediff
from django.db.models.aggregates import Sum, Count
from django.db.models.functions import Coalesce, TruncMonth
import csv
from django.http import HttpResponse
from datetime import datetime, date


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


class ResortLog(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]

    def get(self, request, *args, **kwargs):
        default_month = date.today().month
        default_year = date.today().year
        month_from = request.query_params.get('month_start', default_month)
        year_from = request.query_params.get('year_start', default_year)
        month_to = request.query_params.get('month_end', default_month)
        year_to = request.query_params.get('year_end', default_year)

        response = HttpResponse(content_type='text/csv')
        filename = f'Resort-Bookings-From{month_from}-{year_from}To{month_to}-{year_to}.csv'
        response['Content-Disposition'] = u'attachment; filename="{0}"'.format(filename)
        writer = csv.writer(response)

        filtered = Bookings.objects.filter(check_in__month__gte=month_from, check_in__year__gte=year_from, 
                            check_in__month__lte=month_to, check_in__year__lte=year_to).annotate(
                            stayed=Datediff('check_out', 'check_in')
                            ).annotate(bill=ExpressionWrapper(F('rate')*
                            F('stayed'), output_field=FloatField()))
        
        writer.writerow(['Guest', 'Guest Email', 'Room No', 'Booked On', 'Check In Date', 'Check Out Date', 'Nights Stayed', 'Bill', 'Registed By'])
        for q in filtered:
            row = [q.guest.name,
                    q.guest.email,
                    q.room.room_num,
                    datetime.strftime(q.booked_on, format="%d-%m-%Y"), 
                    datetime.strftime(q.check_in, format="%d-%m-%Y"), 
                    datetime.strftime(q.check_out, format="%d-%m-%Y"),
                    q.stayed,
                    q.bill, 
                    q.by_staff.user_name]
            writer.writerow(row)

        return response


class ResortAnalytics(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = AnalyticsSerializer

    def get(self, request, *args, **kwargs):
        analytics = Bookings.objects.filter(is_canceled=False).annotate(stayed=Datediff(
                        'check_out', 'check_in')).annotate(bill=ExpressionWrapper(
                            F('stayed')*F('rate'), output_field=FloatField())).annotate(
                                month=TruncMonth('check_in')).values('month').annotate(
                                    income=Sum('bill'), bookings=Count('id'))

        analytics_serialized = self.get_serializer(analytics, many=True)

        return Response(analytics_serialized.data, status=status.HTTP_200_OK)
