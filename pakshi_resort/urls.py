from django.urls import path,include
from django.contrib import admin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

###never merge this to main

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

...

schema_view = get_schema_view(
   openapi.Info(
      title="Pakshi API",
      default_version='v1',
      description="Test_101",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="tester@pakshiresort.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
   #path('admin/', admin.site.urls),
   path('api/', include('staff.urls')),
   path('food/',include('food.urls')),
   path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('bookings/', include('bookings.urls')),

   ###never merge this to main

   path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]