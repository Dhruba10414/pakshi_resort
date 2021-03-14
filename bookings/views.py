from django.shortcuts import render
from .models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from datetime import date

class RoomListView(generics.GenericAPIView):
    serializer_class = RoomGuestEmbededSerializer

    def get(self, request, *args, **kwargs):
        rooms = Rooms.objects.all()
        serialized_data = self.get_serializer(rooms, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)


class Room_BookingsListView(generics.GenericAPIView):
    serializer_class = BookingSerializer
    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room_id', None)
        if room_id is None:
            bookings = Bookings.objects.filter(check_out__gte=date.today(), is_complete=0).order_by('check_in')
        else:
            bookings = Bookings.objects.filter(room__id=room_id, check_out__gte=date.today(), is_complete=0).order_by('check_in')
        serialized = self.get_serializer(bookings, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)


class GuestRoomBookView(generics.GenericAPIView):
    serializer_class = BookingGuestDetailSerializer

    def get(self, request, *args, **kwargs):
        booking_id = request.query_params.get('booking', None)

        if booking_id:
            bookings = Bookings.objects.get(id=booking_id)
            serialized = self.get_serializer(bookings)
        else:
            bookings = Bookings.objects.filter(check_out__gte=date.today(), is_complete=False, is_canceled=False).order_by('check_in')
            serialized = self.get_serializer(bookings, many=True)
        
        return Response(serialized.data, status=status.HTTP_200_OK)

class GuestDetail(generics.GenericAPIView):
    serializer_class = GuestSerializer

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)
    
        try:
            guest = Guests.objects.get(id=guest_id)
            guest_serialized = self.get_serializer(guest)
            return Response(guest_serialized.data, status=status.HTTP_200_OK)

        except Guests.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class GuestBookings(generics.GenericAPIView):
    serializer_class = BookingSerializer

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id is not None:
            bookings = Bookings.objects.filter(guest__id=guest_id, is_canceled=False).order_by('check_in')
            bookings_serialized = self.get_serializer(bookings, many=True)

            return Response(bookings_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)