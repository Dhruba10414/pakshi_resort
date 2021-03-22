
from rest_framework import viewsets
from rest_framework import generics, status
from food.models import FoodItem,FoodOrdering
from .serializers import FoodItemSerilizer,FoodOrderingSerializer,OrderItemEmbededSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,AllowAny,IsAuthenticated
from datetime import date, datetime, timedelta


class FoodItemView(generics.GenericAPIView):
    queryset = FoodItem.objects.all()
    permission_classes=[AllowAny]
    serializer_class = FoodItemSerilizer

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialized_data = FoodItemSerilizer(queryset, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

class CreateFoodItem(generics.CreateAPIView):
    queryset=FoodItem.objects.all()
    serializer_class=FoodItemSerilizer

class FoodDeleteView(generics.DestroyAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerilizer

class FoodUpdateView(generics.UpdateAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerilizer

class FoodOrderingView(generics.GenericAPIView):
    serializer_class=OrderItemEmbededSerializer
    queryset=FoodOrdering.objects.all()
    def get(self,request,*args,**kwargs):
        yesterday = date.today() - timedelta(days=1)
        orders = FoodOrdering.objects.filter(time__gte=yesterday)
        serialzer_data = self.get_serializer(orders,many=True)
        return Response(serialzer_data.data,status=status.HTTP_200_OK)
   
    def post(self,request,*args,**kwargs):
        food_id = request.query_params.get('food_id', None)
        guest_id = request.data.get('guest_id', None)
        quantity_i = request.data.get('quantity',None)
        select_food = FoodItem.objects.get(pk=food_id)

        if select_food.available is False:
            Response({'message :' 'Your selected food is not available'},status=status.HTTP_404_NOT_FOUND)
        
        if quantity_i is None :
            Response({'message :''You have to select a specific Quantity'},status=status.HTTP_404_NOT_FOUND)
        
        new_order = FoodOrdering(quantity=quantity_i,guest=guest_id,food=food_id)
        new_order.taken_by=request.user
        new_order.save()
        Response({'message :''Your order recieved Successfully'},status=status.HTTP_200_OK)