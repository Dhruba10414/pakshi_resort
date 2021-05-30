from django.urls import path
from .views import *

urlpatterns = [
    path('room-type/', RoomCategoryView.as_view(), name='room_type'),
    path('rooms/', RoomView.as_view(), name='room'),
    path('rooms/bookings/', Room_BookingsListView.as_view(), name='rooms_bookings'),
    path('guests/', GuestDetail.as_view(), name='guest_info'),
    path('guests/bookings/', GuestBookings.as_view(), name='guest_bookings'),
    path('rooms/available/', RoomSearch.as_view(), name='available_rooms'),
    path('checkin/', CheckIn.as_view(), name='checkin'),
    path('checkout/', CheckOut.as_view(), name='checkout'),
    path('add/', BookRooms.as_view(), name='add_booking'),
    path('guest_requests/', BookingRequestView.as_view(), name='all_requests'),
    path('guest_requests/add/', AddNewBookingRequestView.as_view(), name='new_request'),
    path('guests/frauds/', RemoveFraudBookingRequests.as_view(), name='fraud_removal'),
    path('cancel/', CancelBooking.as_view(), name='cancel_booking'),
    path('guest_requests/notifications/', BookingRequestNotifications.as_view(), name='notifications'),
    path('guest-discounts/', GuestDiscountOffers.as_view(), name='discounts'),
]