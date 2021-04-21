from .models import Services, Tickets
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .serializers import *
from django.db.models import F, ExpressionWrapper, FloatField
from django.db.models.functions import TruncMonth
from django.db.models.aggregates import Sum
from datetime import datetime
from django.http import HttpResponse
import csv

class ServicesEndpoint(GenericAPIView):
    serializer_class = ServicesSerializer

    def get(self, request, *args, **kwargs):
        services = Services.objects.all()
        services_serialized = self.get_serializer(services, many=True)

        return Response(services_serialized.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        new_service = self.get_serializer(data=request.data)
        new_service.is_valid(raise_exception=True)
        new_service.save()

        return Response(new_service.data, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        service_id = request.data.pop('id', None)
        try:
            service = Services.objects.get(id=service_id)
            updated_service = self.get_serializer(service, data=request.data, partial=True)
            updated_service.is_valid(raise_exception=True)
            updated_service.save()

            return Response(updated_service.data, status=status.HTTP_202_ACCEPTED)
        except Services.DoesNotExist:
            return Response({"error": "No such service"}, status=status.HTTP_404_NOT_FOUND)


class TicketsView(GenericAPIView):
    serializer_class = TicketWriteSerializer

    def get(self, request, *args, **kwargs):
        check_ = request.query_params.get('date', None)

        if check_:
            check_date = datetime.strptime(check_, "%d-%m-%Y").date()
            tickets = Tickets.objects.filter(issued_date=check_date)
            tickets_serialized = TicketReadOnlySerializer(tickets, many=True)

            return Response(tickets_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No date filter provided"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        ticket_bought = self.get_serializer(data=request.data)
        ticket_bought.is_valid(raise_exception=True)
        ticket_bought.save()

        return Response(ticket_bought.data, status=status.HTTP_201_CREATED)


class GuestTicketsInvoiceList(GenericAPIView):
    serializer_class = TicketWithTotalPrice

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id:
            tickets = Tickets.objects.filter(bought_by_id=guest_id).annotate(
                total_price=ExpressionWrapper(F('num_tickets')*F('ticket_tariff'), output_field=FloatField()))
            tickets_serialized = self.get_serializer(tickets, many=True)

            return Response(tickets_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Request. Provide guest id."}, status=status.HTTP_400_BAD_REQUEST)


class TicketsLog(GenericAPIView):
    permission_classes = [IsAdminUser, ]

    def get(self, request, *args, **kwargs):
        default_month = date.today().month
        default_year = date.today().year
        month_from = request.query_params.get('month_start', default_month)
        year_from = request.query_params.get('year_start', default_year)
        month_to = request.query_params.get('month_end', default_month)
        year_to = request.query_params.get('year_end', default_year)

        response = HttpResponse(content_type='text/csv')
        filename = f'Tickets-Sells-From{month_from}-{year_from}To{month_to}-{year_to}.csv'
        response['Content-Disposition'] = u'attachment; filename="{0}"'.format(filename)
        writer = csv.writer(response)

        tickets = Tickets.objects.filter(issued_date__month__gte=month_from, issued_date__year__gte=year_from, 
                            issued_date__month__lte=month_to, issued_date__year__lte=year_to)

        writer.writerow(['Guest', 'Guest Email', 'Ticket For Service', 'Price', 'Number Of Tickets', 'Ticket Bought On', 'Registed By'])
        for tick in tickets:
            row = [tick.bought_by.name,
                    tick.bought_by.email,
                    tick.ticket_for.name,
                    tick.ticket_tariff,
                    tick.num_tickets,
                    datetime.strftime(tick.issued_date, format="%d-%m-%Y")]
            writer.writerow(row)

        return response


class TicketsAnalytics(GenericAPIView):
    serializer_class = SellsAnalyticsSerializer
    permission_classes = [IsAdminUser, ]
    
    def get(self, request, *args, **kwargs):
        analytics = Tickets.objects.annotate(price=ExpressionWrapper(F('ticket_tariff')*F('num_tickets'),
                        output_field=FloatField())).annotate(month=TruncMonth('issued_date')).values(
                            'month').annotate(income=Sum('price'), sold=Sum('num_tickets'))
        
        analytics_serialized = self.get_serializer(analytics, many=True)

        return Response(analytics_serialized.data, status=status.HTTP_200_OK)