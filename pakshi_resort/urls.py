from django.urls import path,include
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)




urlpatterns = [
   #path('admin/', admin.site.urls),
   path('api/', include('staff.urls')),
   path('food/',include('food.urls')),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('bookings/', include('bookings.urls')),
   path('invoices/', include('invoices.urls')),
   path('tickets/', include('tickets.urls')),
   path('auth/', include('djoser.urls')),
]