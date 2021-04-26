from rest_framework import serializers
from .models import Services, Tickets
from bookings.models import Guests
from django.contrib.auth import get_user_model
from datetime import date, datetime

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'


class TicketWriteSerializer(serializers.ModelSerializer):
    bought_by = serializers.PrimaryKeyRelatedField(queryset=Guests.objects.all(), allow_null=True)
    ticket_for = serializers.PrimaryKeyRelatedField(queryset=Services.objects.all())

    class Meta:
        model = Tickets
        fields = ['bought_by', 'num_tickets', 'ticket_for']

    def create(self, validated_data):
        service = validated_data.pop('ticket_for')
        ticket = Tickets(**validated_data)
        ticket.registered_by = self.context['request'].user
        ticket.ticket_for = service
        ticket.ticket_tariff = service.ticket_price
        ticket.save()

        return ticket


class TicketReadOnlySerializer(serializers.ModelSerializer):
    issued_date = serializers.DateField(format="%d-%m-%Y", read_only=True)
    bought_by = serializers.SlugRelatedField(slug_field='name', read_only=True)
    registered_by = serializers.SlugRelatedField(slug_field='user_name', read_only=True)
    ticket_for = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Tickets
        fields = '__all__'

class TicketWithTotalPrice(TicketReadOnlySerializer):
    total_price = serializers.FloatField()


class SellsAnalyticsSerializer(serializers.BaseSerializer):

    def to_representation(self, instance):

        return {
            'month': instance['month'].month,
            'year': instance['month'].year,
            'total_sells': instance['sold'],
            'total_income': instance['income']
        }