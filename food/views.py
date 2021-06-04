from django.core.checks import messages
from rest_framework import viewsets
from rest_framework import generics, status
from food.models import FoodItem,FoodOrdering
from invoices.models import Payments
from .serializers import FoodAnalyticsSerializer,FoodItemSerilizer,FoodOrderingSerializer,OrderItemEmbededSerializer,FoodOrderEmbededSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,AllowAny,IsAuthenticated
from datetime import date, datetime, timedelta
from django.db.models.functions import Extract

from django.db.models import F, ExpressionWrapper, Q
from django.db.models import DurationField, FloatField, IntegerField

from django.db.models.aggregates import Sum,Count
from django.db.models.functions import Coalesce,TruncMonth
import csv
from django.http import HttpResponse
from datetime import datetime
from django.utils import timezone
from bookings.models import Guests
import math

class FoodItemView(generics.GenericAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerilizer

    def get(self, request, *args, **kwargs):
        queryset = FoodItem.objects.all()
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

class UpdateVatView(generics.GenericAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerilizer
    
    def get(self , request , *agrs,**kwargs):
        food = FoodItem.objects.all()[0]
        serialzer_data =self.get_serializer(food)
        return Response(serialzer_data.data,status=status.HTTP_200_OK) 

    def post(self, request, *args, **kwargs):
        new_vat = request.data.get('vat', None)
        food_item = FoodItem.objects.all()

        if new_vat:
            for aType in food_item:
                updated = self.get_serializer(aType, data=request.data, partial=True)
                updated.is_valid(raise_exception=True)
                updated.save()
            
            all_vats = self.get_serializer(food_item, many=True) 
            return Response(all_vats.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'error': 'No vat specified'}, status=status.HTTP_400_BAD_REQUEST)


class OrderCancelView(generics.GenericAPIView):
    serializer_class = OrderItemEmbededSerializer
    queryset=FoodOrdering.objects.all() 
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
    queryset=FoodOrdering.objects.all() 

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
    serializer_class=FoodOrderEmbededSerializer
    queryset=FoodOrdering.objects.all() 

    
    def get(self,request,*args,**kwargs):
        IsCancel = request.query_params.get('isCancel',None)
        IsComplete = request.query_params.get('isComplete',None)
        food_Type = request.query_params.get('food_type',None)
        date_in = request.query_params.get('date',None)

        yesterday = date.today() - timedelta(days=1) #need to check 

        if IsCancel:
            orders = FoodOrdering.objects.filter(time__gte=yesterday,isCancel=True).order_by('-time')
        elif IsComplete:
            orders = FoodOrdering.objects.filter(time__gte=yesterday,isComplete=True).order_by('-time')
        elif food_Type:
            orders = FoodOrdering.objects.filter(time__gte=yesterday,food__food_type=food_Type).order_by('-time')
        elif date_in:
            orders = FoodOrdering.objects.filter(time__startswith=date_in).order_by('-time')
        else:
            orders = FoodOrdering.objects.filter(time__gte=yesterday).order_by('-time')

        serialzer_data = self.get_serializer(orders,many=True)
        return Response(serialzer_data.data,status=status.HTTP_200_OK)
   
    def post(self,request,*args,**kwargs):
        food_id_and_quantity_list = request.data.get('foods',[])
        guest_id = request.data.get('guest_id', None)
        guest_name = request.data.get('guest_name','Mr.')
        guest_contact = request.data.get('guest_contact','01730706252')
        discount = request.data.get('guest_discount',0)
        
       
        try:
            if guest_id is None:
                    new_guest = Guests(name = guest_name,discount_food = discount ,contact = guest_contact,email = 'xyz@gmail.com',address = 'restaurant anonymous guest')
                    new_guest.save()
                    guest_id = new_guest.id
            sum=0
            vat_obj=0
            
            for food in food_id_and_quantity_list:
                select_food = FoodItem.objects.get(id=food["id"])

                if select_food.available is False:
                    return Response(data={'message :' 'Your selected food is not available'},status=status.HTTP_404_NOT_FOUND)
                
                if food["quantity"] is None :
                    return Response(data={'message :''You have to select a specific Quantity'},status=status.HTTP_404_NOT_FOUND)
                    
                
                new_order = FoodOrdering(quantity=food["quantity"],notes = food["notes"],guest_id=guest_id,food_id=food["id"],order_price=select_food.price,vat=select_food.vat)
                new_order.taken_by=request.user
                new_order.save()
                sum = sum + (food["quantity"]*select_food.price)
                vat_obj = select_food.vat
            
            
            discount = float(discount)
            
            obj = {
                'guest_id':guest_id,
                'vat':math.ceil(sum*vat_obj),
                'discount':math.ceil(discount),
                'bill':math.ceil(sum)
            }
            return Response(data=obj,status=status.HTTP_200_OK)
        except FoodItem.DoesNotExist:
            return Response(data={'message' : 'Please Select a valid food Item'},status=status.HTTP_404_NOT_FOUND)


class OrderInvoiceView(generics.GenericAPIView):
    serializer_class=FoodOrderEmbededSerializer


    def get(self,request,*args,**kwargs):
        guest_no = request.query_params.get('guest_id',None)

        try:
            order_list = FoodOrdering.objects.filter(guest_id=guest_no,isCancel=False)
            serializer_data=self.get_serializer(order_list,many=True)
            return Response(data=serializer_data.data,status=status.HTTP_200_OK)

        except FoodOrdering.DoesNotExist:
            return Response(data={'message : Guest id does not exists in the Food order list..'},status=status.HTTP_404_NOT_FOUND)



class FoodLogView(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class=FoodOrderEmbededSerializer

    def get(self, request, *args, **kwargs):
        default_month = date.today().month
        default_year = date.today().year
        month_from = request.query_params.get('month_start', default_month)
        year_from = request.query_params.get('year_start', default_year)
        month_to = request.query_params.get('month_end', default_month)
        year_to = request.query_params.get('year_end', default_year)

        response = HttpResponse(content_type='text/csv')
        filename = f'Restaurant-Incomes-From{month_from}-{year_from}To{month_to}-{year_to}.csv'
        response['Content-Disposition'] = u'attachment; filename="{0}"'.format(filename)
        writer = csv.writer(response)

        filtered = FoodOrdering.objects.filter(isCancel=False,time__month__gte=month_from, time__year__gte=year_from, 
                            time__month__lte=month_to, time__year__lte=year_to
                            ).annotate(bill=ExpressionWrapper(F('order_price') * F('quantity'), output_field=FloatField())
                            ).annotate(vat_total=ExpressionWrapper(F('bill') * F('vat'), output_field=FloatField())
                            ).values('guest').annotate(total_bill=Sum('bill'), total_vat=Sum('vat_total'), orders=Count('id'))

        writer.writerow(['Guest', 'Email', 'Address', 'Contact' , 'Food_Bill', 'Vat', 'Total_Bill', 'Discount_Amount', 'Discounted Bill'])
        for entry in filtered:
            guest = Guests.objects.get(id=entry['guest'])
            row = [
                    guest.name,
                    guest.email,
                    guest.address,
                    guest.contact,
                    entry['total_bill'],
                    entry['total_vat'],
                    entry['total_bill'] + entry['total_vat'],
                    guest.discount_food,
                    entry['total_bill'] + entry['total_vat'] - guest.discount_food]
            
            writer.writerow(row)

        return response

class OrderInvoiceSummuryView(generics.GenericAPIView): 
    def get(self, request, *args, **kwargs):
        guest = request.query_params.get('guest', None)

        if guest is not None:
            bills = FoodOrdering.objects.filter(guest__id=guest, isCancel=False).annotate(bill=ExpressionWrapper(F('order_price')*
                                F('quantity'), output_field=FloatField())).annotate(total_vat=ExpressionWrapper(F('order_price')*
                                F('quantity')*F('vat'), output_field=FloatField()))
            total_bill = bills.aggregate(total=Coalesce(Sum('bill'), 0.0))['total']
            total_vat = bills.aggregate(total=Coalesce(Sum('total_vat'), 0.0))['total']
            payments = Payments.objects.filter(guest__id=guest,paid_for='RT')
            total_paid = payments.aggregate(total=Coalesce(Sum('amount'), 0.0))['total']
            discount = Guests.objects.get(id=guest)
            less = discount.discount_food
            net_pay = math.ceil(total_bill + total_vat  - less)
            due = math.ceil(total_bill + total_vat - total_paid - less)
            summury = {
                'total_bills': f'{total_bill:.2f}',
                'total_vat' : f'{total_vat:.2f}',
                'discount' : f'{less:.2f}',
                'net_payable': f'{net_pay:.2f}',
                'total_paid': f'{total_paid:.2f}',
                'due': f'{due:.2f}'
            }
            
            return Response(data=summury, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class FoodAnalyticsView(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class = FoodAnalyticsSerializer

    def get(self, request, *args, **kwargs):
        analytics = FoodOrdering.objects.filter(isCancel=False).annotate(bill=ExpressionWrapper(F('order_price')*F('quantity'), 
        output_field=FloatField())).annotate(vat_total=ExpressionWrapper(F('order_price')*F('quantity')*F('vat'), 
        output_field=FloatField())).annotate(month=TruncMonth('time')).values('month').annotate(income=Sum('bill'),total_vat = Sum('vat_total')  ,orders=Count('id')).order_by('month')[:12]

        analytics_serialized = self.get_serializer(analytics, many=True)

        return Response(analytics_serialized.data, status=status.HTTP_200_OK)

class FoodOrderLogView(generics.GenericAPIView):
    permission_classes = [IsAdminUser, ]
    serializer_class=FoodOrderEmbededSerializer

    def get(self, request, *args, **kwargs):
        default_month = date.today().month
        default_year = date.today().year
        month_from = request.query_params.get('month_start', default_month)
        year_from = request.query_params.get('year_start', default_year)
        month_to = request.query_params.get('month_end', default_month)
        year_to = request.query_params.get('year_end', default_year)

        response = HttpResponse(content_type='text/csv')
        filename = f'Resort-Food-Orders-From{month_from}-{year_from}To{month_to}-{year_to}.csv'
        response['Content-Disposition'] = u'attachment; filename="{0}"'.format(filename)
        writer = csv.writer(response)

        filtered = FoodOrdering.objects.filter(isCancel=False,time__month__gte=month_from, time__year__gte=year_from, 
                            time__month__lte=month_to, time__year__lte=year_to).annotate(bill=ExpressionWrapper(F('order_price')*
                                F('quantity'), output_field=FloatField())).annotate(vat_total=ExpressionWrapper(F('order_price')*
                                F('quantity')*F('vat'), output_field=FloatField()))
                                
        writer.writerow(['Guest', 'Guest Email', 'Order Time','Vat Percentage', 'Food Name', 'Type', 'Price', 'Quantity', 'Bill' ,'Vat', 'Total Bill','Registed By'])
        for q in filtered:
            row = [q.guest.name,
                    q.guest.email ,
                    datetime.strftime(timezone.localtime(q.time), "%d-%m-%Y %I:%M %p"),
                    f'{(q.food.vat * 100):.2f}%',
                    q.food.name,
                    q.food.food_type,
                    q.order_price,
                    q.quantity,
                    q.bill ,
                    q.vat_total,
                    q.bill + q.vat_total,
                    q.taken_by.user_name if q.taken_by else 'Terminated Staff']
            writer.writerow(row)

        return response