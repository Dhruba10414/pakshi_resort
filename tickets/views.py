from .models import Services, Tickets
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from django.db.models import F, ExpressionWrapper, FloatField

class ServicesEndpoint(GenericAPIView):
    serializer_class = ServicesSerializer
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        services = Services.objects.all()
        services_serialized = self.get_serializer(services, many=True)

        return Response(services_serialized.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        new_service = self.get_serializer(data=request.data)
        new_service.is_valid(raise_exception=True)
        new_service.save()

        return Response(status=status.HTTP_201_CREATED)

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


class BuyTicket(GenericAPIView):
    serializer_class = TicketWriteSerializer

    def post(self, request, *args, **kwargs):
        ticket_bought = self.get_serializer(data=request.data)
        ticket_bought.is_valid(raise_exception=True)
        ticket_bought.save()

        return Response(status=status.HTTP_201_CREATED)


class GuestTicketsInvoiceList(GenericAPIView):
    serializer_class = TicketWithTotalPrice
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        guest_id = request.query_params.get('guest', None)

        if guest_id:
            tickets = Tickets.objects.filter(bought_by_id=guest_id).annotate(
                total_price=ExpressionWrapper(F('num_tickets')*F('ticket_tariff'), output_field=FloatField()))
            tickets_serialized = self.get_serializer(tickets, many=True)

            return Response(tickets_serialized.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid Request. Provide guest id."}, status=status.HTTP_400_BAD_REQUEST)
