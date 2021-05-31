from django.urls import path, include
from food.views import FoodOrderLogView,UpdateVatView,FoodAnalyticsView,OrderInvoiceSummuryView,FoodLogView,OrderInvoiceView,FoodItemView,CreateFoodItem,FoodDeleteView,FoodUpdateView,FoodOrderingView,OrderCancelView,OrderCompleteView



urlpatterns = [
    path('allfood/', FoodItemView.as_view(),name='Food_List'),
    path('create/',CreateFoodItem.as_view(),name='Create_food'),
    path('delete/<int:pk>/', FoodDeleteView.as_view(), name='delete_food'),
    path('update/<int:pk>/', FoodUpdateView.as_view(), name='update_food'),
    path('orders/',FoodOrderingView.as_view(),name='orderlist'),
    path('order/cancel/',OrderCancelView.as_view(),name='Cancel_Order'),
    path('order/complete/',OrderCompleteView.as_view(),name='Complete_Order'),
    path('invoice/',OrderInvoiceView.as_view(),name='Invoice_list'),
    path('food-log/',FoodLogView.as_view(),name='food-log-csv'),
    path('invoice-summary/',OrderInvoiceSummuryView.as_view(),name='food-invoice-summary'),
    path('analytics/',FoodAnalyticsView.as_view(),name = 'food-Analytics'),
    path('vat/',UpdateVatView.as_view(),name='food-vat'),
    path('food-order-log/',FoodOrderLogView.as_view(),name='all-food-orders-csv')
]