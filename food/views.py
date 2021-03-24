
from rest_framework import viewsets
from rest_framework import generics, status
from food.models import FoodItem,FoodOrdering
from .serializers import FoodItemSerilizer,FoodOrderingSerializer,OrderItemEmbededSerializer,FoodOrderEmbededSerializer
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

class OrderCancelView(generics.GenericAPIView):
    serializer_class = OrderItemEmbededSerializer
    queryset=FoodOrdering.objects.all() #is  it possible to avoid retriving all objects of order?
    def post(self,request,*args,**kwargs):
        order_id_list = request.data.get('order_id',None)
        try:
            for order_id in order_id_list:
                order = FoodOrdering.objects.get(id=order_id)
                order.isCancel=True
                order.save()
            return Response(data={'message : Your order cancel Successfully '},status=status.HTTP_200_OK)
        except FoodOrdering.DoesNotExist:
            return Response(data={'message : Please Select a valid food Order for canceling'},status=status.HTTP_404_NOT_FOUND)

class OrderCompleteView(generics.GenericAPIView):
    serializer_class = OrderItemEmbededSerializer
    queryset=FoodOrdering.objects.all() #is  it possible to avoid retriving all objects of order?
    def post(self,request,*args,**kwargs):
        order_id_list = request.data.get('order_id',None)
        try:
            for order_id in order_id_list:
                order = FoodOrdering.objects.get(id=order_id)
                order.isComplete=True
                order.save()
            return Response(data={'message : Your order Completed Successfully '},status=status.HTTP_200_OK)
        except FoodOrdering.DoesNotExist:
            return Response(data={'message : Please Select a valid food Order for completing'},status=status.HTTP_404_NOT_FOUND)


class FoodOrderingView(generics.GenericAPIView):
    serializer_class=OrderItemEmbededSerializer
    queryset=FoodOrdering.objects.all() #is  it possible to avoid retriving all objects of order?

    def get(self,request,*args,**kwargs):
        yesterday = date.today() - timedelta(days=1)
        orders = FoodOrdering.objects.filter(time__gte=yesterday,isCancel=False,isComplete=False).order_by('guest_id','-time')
        serialzer_data = self.get_serializer(orders,many=True)
        return Response(serialzer_data.data,status=status.HTTP_200_OK)
   
    def post(self,request,*args,**kwargs):
        food_id_list = request.data.get('food_id', None)
        guest_id = request.data.get('guest_id', None)
        quantity_i = request.data.get('quantity',None)
       
        try:
            for food_id in food_id_list:
                select_food = FoodItem.objects.get(id=food_id)
                if select_food.available is False:
                    return Response(data={'message :' 'Your selected food is not available'},status=status.HTTP_404_NOT_FOUND)
                
                if quantity_i is None :
                    return Response(data={'message :''You have to select a specific Quantity'},status=status.HTTP_404_NOT_FOUND)
                
                new_order = FoodOrdering(quantity=quantity_i,guest_id=guest_id,food_id=food_id)
                new_order.taken_by=request.user.id
                new_order.save()
                order = self.get_serializer(new_order)
            return Response(data={'message :''Your order recieved Successfully'},status=status.HTTP_200_OK)
        except FoodItem.DoesNotExist:
            return Response(data={'message : ''Please Select a valid food Item '},status=status.HTTP_404_NOT_FOUND)


class OrderInvoiceView(generics.GenericAPIView):
    serializer_class=FoodOrderEmbededSerializer

    def get(self,request,*args,**kwargs):
        guest_no = request.data.get('guest_id',None)

        try:
            order_list = FoodOrdering.objects.filter(guest_id=guest_no,isCancel=False)
            food_list  = FoodItem.objects.all()
            orders=[]
            for order in order_list:
              food_l = food_list.filter(id=order.food_id) #this queryset has one attribute 
              for food in food_l: #for accessing this single attribute call a for loop 
                 food_name = food.name
                 food_price = food.price
                 food_type = food.food_type

                 order_quantity = order.quantity
                 order_time = order.time
                 guest_id = order.guest_id

                 orderDic = {
                     "food_name" : food.name,
                     "food_price" : food.price,
                     "food_type" : food.food_type,

                     "order_quantity" : order.quantity,
                     "order_time" : order.time,
                     "guest_id" : order.guest_id
                 }
                 orders.append(orderDic)
            
            serializer_data=self.get_serializer(orders,many=True)
            return Response(data=serializer_data.data,status=status.HTTP_200_OK)

        except FoodOrdering.DoesNotExist:
            return Response(data={'message : Guest id does not exists in the Food order list..'},status=status.HTTP_404_NOT_FOUND)