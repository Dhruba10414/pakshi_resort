from django.shortcuts import render
from .models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from datetime import date, datetime, timedelta
from django.db.models import Q, Subquery, Count, F

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

class RoomSearch(generics.GenericAPIView):
    serializer_class = AvailableRoomCountSerializer

    def get(self, request, *args, **kwargs):
        check_in = request.query_params.get('check_in', None)
        check_out = request.query_params.get('check_out', None)

        if check_in is not None:
            check_in_date = datetime.strptime(check_in, "%d-%m-%Y").date()
        else:
            check_in_date = date.today()

        if check_out is not None:
            check_out_date = datetime.strptime(check_out, "%d-%m-%Y").date()
        else:
            check_out_date = date.today() + timedelta(days=1)

        existing_bookings = Bookings.objects.filter(
                (Q(check_in__gte=check_in_date) & Q(check_in__lt=check_out_date)) |
                (Q(check_out__gt=check_in_date) & Q(check_out__lt=check_out_date))
            )
        
        available_rooms = Rooms.objects.exclude(id__in=Subquery(existing_bookings.values_list('room__id', flat=True)))
        type_group = available_rooms.values('room_type').annotate(type_=F('room_type__room_type'), available=Count('room_type'))
    
        rooms_count = self.get_serializer(type_group, many=True)

        return Response(rooms_count.data, status=status.HTTP_200_OK)