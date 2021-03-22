from django.urls import path, include
from food.views import FoodItemView,CreateFoodItem,FoodDeleteView,FoodUpdateView,FoodOrderingView



urlpatterns = [
    path('allfood/', FoodItemView.as_view(),name='Food_List'),
    path('create/',CreateFoodItem.as_view(),name='Create_food'),
    path('delete/<int:pk>/', FoodDeleteView.as_view(), name='delete_food'),
    path('update/<int:pk>/', FoodUpdateView.as_view(), name='update_food'),
    path('orders/',FoodOrderingView.as_view(),name='orderlist')
]