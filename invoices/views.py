from django.shortcuts import render
from rest_framework import serializers
from bookings.models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny


class GuestInvoiceView(generics.GenericAPIView):
    serializer_class = BookingWithBill
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id is not None:
            guest_bookings = Bookings.objects.filter(
                                guest__id=guest_id, is_canceled=False, 
                                is_complete=False).order_by('check_in')

            bills = self.get_serializer(guest_bookings, many=True)

            return Response(bills.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RoomBill(generics.GenericAPIView):
    serializer_class = BookingWithBill
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room', None)

        if room_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            room = Rooms.objects.get(id=room_id)
            if room.active_booking is None:
                return Response(status=status.HTTP_404_NOT_FOUND)

            booking = room.active_booking
            bill = self.get_serializer(booking)

            return Response(bill.data, status=status.HTTP_200_OK)
        except Rooms.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)