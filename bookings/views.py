from .models import RoomType, Rooms, Guests, Bookings
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from datetime import date, datetime, timedelta
from django.db.models import Q, Subquery, Count, F
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny
from .helpers import convert_to_date, room_available, add_new_booking
from pakshi_resort.permissions import AdminWriteOrAuthenticatedReadOnly, AdminWriteOrReadOnly


class RoomCategoryView(generics.GenericAPIView):
    serializer_class = RoomTypeSerializer
    permission_classes = [AdminWriteOrReadOnly, ]

    def get(self, request, *args, **kwargs):
        categories = RoomType.objects.all()
        categories_serialized = self.get_serializer(categories, many=True)

        return Response(categories_serialized.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        new_category = self.get_serializer(data=request.data)
        new_category.is_valid(raise_exception=True)
        new_category.save()

        return Response(new_category.data, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        id_ = request.data.pop('id', None)

        try:
            category = RoomType.objects.get(id=id_)
            updated = self.get_serializer(category, data=request.data, partial=True)
            updated.is_valid(raise_exception=True)
            updated.save()

            return Response(updated.data, status=status.HTTP_202_ACCEPTED)
        except RoomType.DoesNotExist:
            return Response({"error": "No such room category"}, status=status.HTTP_404_NOT_FOUND)


class RoomView(generics.GenericAPIView):
    serializer_class = RoomSerializer
    permission_classes = [AdminWriteOrAuthenticatedReadOnly, ]

    def get(self, request, *args, **kwargs):
        rooms = Rooms.objects.all()
        serialized_data = RoomGuestEmbededSerializer(rooms, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        new_room = self.get_serializer(data=request.data)
        new_room.is_valid(raise_exception=True)
        new_room.save()

        return Response(new_room.data, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        id_ = request.data.pop('id', None)

        try:
            room = Rooms.objects.get(id=id_)
            updated_room = self.get_serializer(room, data=request.data, partial=True)
            updated_room.is_valid(raise_exception=True)
            updated_room.save()

            return Response(updated_room.data, status=status.HTTP_202_ACCEPTED)
        except Rooms.DoesNotExist:
            return Response({"error": "No such room"}, status=status.HTTP_400_BAD_REQUEST)


class Room_BookingsListView(generics.GenericAPIView):
    serializer_class = BookingSerializer
    
    def get(self, request, *args, **kwargs):
        room_id = request.query_params.get('room_id', None)
        if room_id is None:
            bookings = Bookings.objects.filter(check_out__gte=date.today(), 
                                                is_complete=False).order_by('check_in')
        else:
            bookings = Bookings.objects.filter(room__id=room_id, check_out__gte=date.today(), 
                                                is_complete=False).order_by('check_in')
        serialized = self.get_serializer(bookings, many=True)

        return Response(serialized.data, status=status.HTTP_200_OK)


class GuestDetail(generics.GenericAPIView):
    serializer_class = GuestSerializer
    permission_classes = [AllowAny, ]

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


class CheckIn(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        booking_id = request.data.get('booking', None)

        try:
            booking = Bookings.objects.get(id=booking_id)
            if booking.check_in > date.today() or booking.check_out < date.today() or booking.is_canceled:
                return Response({"error": "Invalid Checkin/Checkout dates OR booking has canceled eariler"}, 
                                status=status.HTTP_400_BAD_REQUEST)
            
            room = booking.room
            if room.active_booking is not None:
                return Response({"error": "Already staying a guest"}, status=status.HTTP_400_BAD_REQUEST)
            
            with transaction.atomic():
                room.active_booking = booking
                room.save()
                booking.is_active = True
                booking.save()
                guest = booking.guest
                guest.is_staying = True
                guest.save()

            return Response(status=status.HTTP_200_OK)
        
        except Bookings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CheckOut(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        booking_id = request.data.get('booking', None)

        try:
            booking = Bookings.objects.get(id=booking_id)

            if not booking.is_active or booking.is_canceled:
                return Response({"error": "Can't checkout from an unactive/canceled booking"}, status=status.HTTP_400_BAD_REQUEST)
            
            with transaction.atomic():
                room = booking.room
                room.active_booking = None
                room.save()
                guest = booking.guest
                still_staying = Bookings.objects.filter(guest=guest, is_complete=False).exists()
                if not still_staying:
                    guest.is_staying = False
                    guest.save()
                
                booking.is_complete = True
                booking.is_active = False
                booking.save()
            
            return Response(status=status.HTTP_200_OK)
        
        except Bookings.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class BookRooms(generics.GenericAPIView):
    serializer_class = BookingSerializer

    def post(self, request, *args, **kwargs):
        rooms = request.data.get('room', None)
        guest_id = request.data.get('guest', None)
        from_ = request.data.get('from_', None)
        to_ = request.data.get('to_', None)

        if from_ is None or to_ is None or not isinstance(rooms, list) or guest_id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if not Guests.objects.filter(id=guest_id).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        from_date = convert_to_date(from_)
        to_date = convert_to_date(to_)
        booked = []
        
        for room_id in rooms:
            new_booking = add_new_booking(room_id, guest_id, request.user.id, from_date, to_date)
            if new_booking:
                booked.append(new_booking)
        
        booking_info = self.get_serializer(booked, many=True)
        
        return Response(booking_info.data, status=status.HTTP_201_CREATED)


class BookingRequestView(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        req_id = request.query_params.get("id", None)

        if req_id is None:
            pendings = BookingRequest.objects.filter(has_confirmed=False, has_canceled=False)
            pendings_seri = BookingRequestSerializer(pendings, many=True)
        else:
            try:
                pendings = BookingRequest.objects.get(id=req_id)
                pendings_seri = BookingRequestSerializer(pendings)
            except BookingRequest.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
        return Response(pendings_seri.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        req_id = request.data.get("id", None)
        
        try:
            booking_req = BookingRequest.objects.get(id=req_id)
            booking_req.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except BookingRequest.DoesNotExist:
            return Response({"error": "No such pending booking"}, status=status.HTTP_404_NOT_FOUND)


class AddNewBookingRequestView(generics.GenericAPIView):
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        booking_request = BookingRequestWriteSerializer(data=request.data)
        booking_request.is_valid(raise_exception=True)
        booking_request.save()

        return Response(booking_request.data, status=status.HTTP_201_CREATED)


class RemoveFraudBookingRequests(generics.GenericAPIView):

    def delete(self, request, *args, **kwargs):
        guest_id = request.data.get('guest', None)

        try:
            guest = Guests.objects.get(id=guest_id)
            valid_bookings = Bookings.objects.filter(guest=guest).exists()
            if valid_bookings:
                return Response({"error": "Guest has previously confirmed bookings"}, status=status.HTTP_400_BAD_REQUEST)
            
            BookingRequest.objects.filter(guest=guest).delete()
            guest.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except Guests.DoesNotExist:
            return Response({"error": "No such Guest"}, status=status.HTTP_404_NOT_FOUND)


class CancelBooking(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        booking_id = request.data.get('booking', None)

        try:
            booking = Bookings.objects.get(id=booking_id)
            if booking.is_active:
                return Response({"error": "Can not cancel an active booking"}, status=status.HTTP_400_BAD_REQUEST)
            booking.is_canceled = True
            booking.save()
            return Response(status=status.HTTP_200_OK)

        except Bookings.DoesNotExist:
            return Response({"error": "No such booking"}, status=status.HTTP_404_NOT_FOUND)


class BookingRequestNotifications(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        notifications = BookingRequest.objects.filter(has_confirmed=False, has_canceled=False).count()

        return Response({"notifications": notifications}, status=status.HTTP_200_OK)