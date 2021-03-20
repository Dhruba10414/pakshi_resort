from .models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from datetime import date, datetime, timedelta
from django.db.models import Q, Subquery, Count, F
from rest_framework.permissions import IsAuthenticated, AllowAny

def convert_to_date(date_string, f="%d-%m-%Y"):
    if date_string is not None:
        return datetime.strptime(date_string, "%d-%m-%Y").date()
    else:
        return date.today() 


def room_available(room_id, from_, to_):
    is_available = Bookings.objects.filter(Q(room__id=room_id),
                                            (
                                                (Q(check_in__gte=from_) & Q(check_in__lt=to_)) |
                                                (Q(check_out__gte=from_) & Q(check_out__lt=to_))
                                            )).exclude(is_canceled=True).exists()
    
    return not is_available
                                

def add_new_booking(room_id, guest_id, staff_id, check_in, check_out):
    if check_in < date.today() or check_in > check_out:
        return None

    ok = room_available(room_id, check_in, check_out)
    if not ok:
        return None

    new_booking = Bookings.objects.create(room__id=room_id, guest__id=guest_id, check_in=check_in, 
                            check_out=check_out, by_staff__id=staff_id)
    
    return new_booking

    

class RoomListView(generics.GenericAPIView):
    serializer_class = RoomGuestEmbededSerializer
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        rooms = Rooms.objects.all()
        serialized_data = self.get_serializer(rooms, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)


class Room_BookingsListView(generics.GenericAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, ]
    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room_id', None)
        if room_id is None:
            bookings = Bookings.objects.filter(check_out__gte=date.today(), is_complete=False).order_by('check_in')
        else:
            bookings = Bookings.objects.filter(room__id=room_id, check_out__gte=date.today(), is_complete=0).order_by('check_in')
        serialized = self.get_serializer(bookings, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)


class GuestRoomBookView(generics.GenericAPIView):
    serializer_class = BookingGuestDetailSerializer
    permission_classes = [IsAuthenticated, ]

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
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)
    
        try:
            guest = Guests.objects.get(id=guest_id)
            guest_serialized = self.get_serializer(guest)
            return Response(guest_serialized.data, status=status.HTTP_200_OK)

        except Guests.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        new_guest = self.get_serializer(data=request.data)
        new_guest.is_valid(raise_exception=True)
        new_guest.save()

        return Response(new_guest.data, status=status.HTTP_201_CREATED)


class GuestBookings(generics.GenericAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id is not None:
            bookings = Bookings.objects.filter(guest__id=guest_id, is_canceled=False).order_by('check_in')
            bookings_serialized = self.get_serializer(bookings, many=True)

            return Response(bookings_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RoomSearch(generics.GenericAPIView):
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        check_in = request.query_params.get('check_in', None)
        check_out = request.query_params.get('check_out', None)
        as_group = request.query_params.get('as_group', None)

        check_in_date = convert_to_date(check_in)
        check_out_date = convert_to_date(check_out)
        if check_out is None:
            check_out_date += timedelta(days=1)

        if check_in_date < date.today() or check_in_date >= check_out_date:
            msg = {
                'message': 'You can\'t travel time, Sorry! Enter valid check in and\\or check out dates.'
            }
            return Response(data=msg, status=status.HTTP_400_BAD_REQUEST)

        existing_bookings = Bookings.objects.filter(
                (Q(check_in__gte=check_in_date) & Q(check_in__lt=check_out_date)) |
                (Q(check_out__gt=check_in_date) & Q(check_out__lt=check_out_date))
            )
        
        available_rooms = Rooms.objects.exclude(id__in=Subquery(existing_bookings.values_list('room__id', flat=True)))
        if as_group:
            type_group = available_rooms.values('room_type').annotate(type_=F('room_type__room_type'), available=Count('room_type'))
    
            rooms = AvailableRoomCountSerializer(type_group, many=True)
        else:
            rooms = RoomSerializer(available_rooms, many=True)

        return Response(rooms.data, status=status.HTTP_200_OK)


class NewBooking(generics.GenericAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        room_type = request.data.get('room_type', None)
        guest_id = request.data.get('guest_id', None)
        check_in = request.data.get('check_in', None)
        check_out = request.data.get('check_out', None)
        
        if check_in is None or check_out is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        check_in_date = convert_to_date(check_in)
        check_out_date = convert_to_date(check_out)

        if check_in_date < date.today() or check_in_date >= check_out_date:
            msg = {
                'message': 'You can\'t travel time, Sorry! Enter valid check in and\\or check out dates.'
            }
            return Response(data=msg, status=status.HTTP_400_BAD_REQUEST)

        existing_bookings = Bookings.objects.filter(
                (Q(check_in__gte=check_in_date) & Q(check_in__lt=check_out_date)) |
                (Q(check_out__gt=check_in_date) & Q(check_out__lt=check_out_date))
            )
        
        room_to_book = Rooms.objects.filter(room_type__id=room_type).exclude(id__in=Subquery(existing_bookings.values_list('room__id', flat=True))).first()

        if not room_to_book:
            return Response(status=status.HTTP_404_NOT_FOUND)

        new_bookings = Bookings(room=room_to_book, guest_id=guest_id, check_in=check_in_date, check_out=check_out_date)
        new_bookings.by_staff = request.user
        new_bookings.save()
        booking = self.get_serializer(new_bookings)

        return Response(data=booking.data, status=status.HTTP_200_OK)

class CheckIn(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        booking_id = request.data.get('booking', None)

        try:
            booking = Bookings.objects.get(id=booking_id)
            if booking.check_in < date.today():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            room = booking.room
            room.active_booking = booking
            room.save()

            guest = booking.guest
            guest.is_staying = True
            guest.save()

            return Response(status=status.HTTP_200_OK)
        
        except Bookings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CheckOut(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        booking_id = request.data.get('booking', None)

        try:
            booking = Bookings.objects.get(id=booking_id)
        
            room = booking.room
            room.active_booking = None
            room.save()

            guest = booking.guest
            guest.is_staying = False
            guest.save()
            #This endpoint will return the invoice 
            booking.is_complete = True
            booking.save()
            return Response(status=status.HTTP_200_OK)
        
        except Bookings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class RoomAvailable(generics.GenericAPIView):
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room', None)
        from_ = request.query_params.get('from', None)
        to_ = request.query_params.get('to', None)

        if from_ is None or to_ is None or room_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        from_date = convert_to_date(from_)
        to_date = convert_to_date(to_)

        available = room_available(room_id, from_date, to_date)

        return Response(data={"available": available}, status=status.HTTP_200_OK)


class BookARoom(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = BookingSerializer

    def post(self, request, *args, **kwargs):
        room_id = request.query_params.get('room', None)
        guest_id = request.query_params.get('guest', None)
        from_ = request.query_params.get('from', None)
        to_ = request.query_params.get('to', None)

        if from_ is None or to_ is None or room_id is None or guest_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        from_date = convert_to_date(from_)
        to_date = convert_to_date(to_)

        new_booking = add_new_booking(room_id, guest_id, request.user.id, from_date, to_date)
        if new_booking is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        booking_info = self.get_serializer(new_booking)

        return Response(booking_info.data, status=status.HTTP_201_CREATED)