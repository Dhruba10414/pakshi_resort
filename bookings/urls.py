from django.urls import path
from .views import *

urlpatterns = [
    path('rooms/', RoomListView.as_view(), name='rooms_list'),
    path('rooms/bookings/', Room_BookingsListView.as_view(), name='rooms_bookings'),
    path('bookings/guests/', GuestRoomBookView.as_view(), name='bookings_guests'),
    path('guests/', GuestDetail.as_view(), name='guest_info'),
    path('guests/bookings/', GuestBookings.as_view(), name='guest_bookings'),
    path('rooms/available/', RoomSearch.as_view(), name='available_rooms'),
    path('new_booking/', NewBooking.as_view(), name='new_booking'),
]