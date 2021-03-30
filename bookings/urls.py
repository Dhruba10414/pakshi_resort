from django.urls import path
from .views import *

urlpatterns = [
    path('rooms/', RoomListView.as_view(), name='rooms_list'),
    path('rooms/bookings/', Room_BookingsListView.as_view(), name='rooms_bookings'),
    path('guests/', GuestDetail.as_view(), name='guest_info'),
    path('guests/bookings/', GuestBookings.as_view(), name='guest_bookings'),
    path('rooms/available/', RoomSearch.as_view(), name='available_rooms'),
    path('checkin/', CheckIn.as_view(), name='checkin'),
    path('checkout/', CheckOut.as_view(), name='checkout'),
    path('rooms/check/', RoomAvailable.as_view(), name='room_check'),
    path('add/', BookARoom.as_view(), name='add_booking'),
    path('guest_requests/', BookingRequestView.as_view(), name='all_requests'),
    path('guest_requests/add/', AddNewBookingRequestView.as_view(), name='new_request'),
]