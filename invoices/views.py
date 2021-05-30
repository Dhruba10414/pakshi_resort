from django.shortcuts import render
from rest_framework import serializers
from bookings.models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAdminUser, AllowAny
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
                            F('stayed'), output_field=FloatField())
                            ).annotate(vat=ExpressionWrapper(F('bill')*
                            F('applied_vat'), output_field=FloatField())).order_by('check_in')

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
                        F('stayed'), output_field=FloatField())
                        ).annotate(vat=ExpressionWrapper(F('bill') * F('vat'),
                        output_field=FloatField())).first()
        
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
        guest_id = request.query_params.get('guest', None)

        try:
            guest = Guests.objects.get(id=guest_id)
            bills = Bookings.objects.filter(guest__id=guest_id, is_canceled=False).annotate(
                                stayed=Datediff('check_out', 'check_in')
                                ).annotate(bill=ExpressionWrapper(F('rate') * F('stayed'), 
                                output_field=FloatField())
                                ).annotate(vat=ExpressionWrapper(F('bill') * F('applied_vat'),
                                output_field=FloatField()))
            total_bill = bills.aggregate(total_bill=Coalesce(Sum('bill'), 0.0))['total_bill']
            total_vat = bills.aggregate(total_vat=Coalesce(Sum('vat'), 0.0))['total_vat']

            payments = Payments.objects.filter(guest__id=guest_id, paid_for='RB')
            total_paid = payments.aggregate(total_paid=Coalesce(Sum('amount'), 0.0))['total_paid']
            
            summury = {
                'total_bills': total_bill,
                'total_vat': total_vat,
                'net_payable': total_bill + total_vat,
                'discount': guest.discount_bookings,
                'total_paid': total_paid,
                'due': total_bill + total_vat - total_paid - guest.discount_bookings
            }
            
            return Response(data=summury, status=status.HTTP_200_OK)
        except Guests.DoesNotExist:
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
                            )
        
        writer.writerow(['Guest', 'Guest Email', 'Room No', 'Booked On', 'Check In Date', 'Check Out Date', 'Guest leaved', 'Canceled', 'Completed', 'Nights Stayed', 'Cost per Night', 'Applied Vat', 'Registed By'])
        for q in filtered:
            row = [q.guest.name,
                    q.guest.email,
                    q.room.room_num,
                    datetime.strftime(q.booked_on, format="%d-%m-%Y"), 
                    datetime.strftime(q.check_in, format="%d-%m-%Y"), 
                    datetime.strftime(q.check_out, format="%d-%m-%Y"),
                    datetime.strftime(q.leaved_on, format="%d-%m-%Y") if q.leaved_on else "nil",
                    q.is_canceled,
                    q.is_complete,
                    q.stayed,
                    q.rate,
                    f'{(q.applied_vat * 100):.2f}%', 
                    q.by_staff.user_name]
            writer.writerow(row)

        return response


class GuestInvoiceLog(generics.GenericAPIView):
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        default_month = date.today().month
        default_year = date.today().year
        month_from = request.query_params.get('month_start', default_month)
        year_from = request.query_params.get('year_start', default_year)
        month_to = request.query_params.get('month_end', default_month)
        year_to = request.query_params.get('year_end', default_year)

        response = HttpResponse(content_type='text/csv')
        filename = f'Resort-Incomes-From{month_from}-{year_from}To{month_to}-{year_to}.csv'
        response['Content-Disposition'] = u'attachment; filename="{0}"'.format(filename)
        writer = csv.writer(response)

        filtered = Bookings.objects.filter(check_in__month__gte=month_from, check_in__year__gte=year_from, 
                            check_in__month__lte=month_to, check_in__year__lte=year_to
                            ).annotate(stayed=Datediff('check_out', 'check_in')
                            ).annotate(bill=ExpressionWrapper(F('rate') * F('stayed'), output_field=FloatField())
                            ).annotate(vat=ExpressionWrapper(F('bill') * F('applied_vat'), output_field=FloatField())
                            ).values('guest').annotate(total_bill=Sum('bill'), total_vat=Sum('vat'), rooms_booked=Count('id'))

        print(filtered)
        writer.writerow(['Guest', 'Guest Email', 'Guest Address', 'Guest Contact', 'Rooms Booked', 'Rooms Bill', 'Total Vat', 'Total Bill', 'Discount Amount', 'Discounted Bill'])
        for entry in filtered:
            guest = Guests.objects.get(id=entry['guest'])
            row = [guest.name,
                    guest.email,
                    guest.address,
                    guest.contact,
                    entry['rooms_booked'],
                    entry['total_bill'],
                    entry['total_vat'],
                    entry['total_bill'] + entry['total_vat'],
                    guest.discount_bookings,
                    entry['total_bill'] + entry['total_vat'] - guest.discount_bookings]
            
            writer.writerow(row)
            print(guest.name, entry['total_bill'], entry['total_vat'], guest.discount_bookings, float(entry['total_bill'] + entry['total_vat'] - guest.discount_bookings))

        return response


class ResortAnalytics(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = AnalyticsSerializer

    def get(self, request, *args, **kwargs):
        analytics = Bookings.objects.filter(is_canceled=False).annotate(stayed=Datediff(
                        'check_out', 'check_in')).annotate(bill=ExpressionWrapper(
                            F('stayed')*F('rate'), output_field=FloatField())).annotate(
                                month=TruncMonth('check_in')).values('month').annotate(
                                    income=Sum('bill'), bookings=Count('id')).order_by('month')[:12]

        analytics_serialized = self.get_serializer(analytics, many=True)

        return Response(analytics_serialized.data, status=status.HTTP_200_OK)
