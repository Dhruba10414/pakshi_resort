from rest_framework import serializers
from .models import Services, Tickets
from bookings.models import Guests
from django.contrib.auth import get_user_model
from datetime import date

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'


class TicketWriteSerializer(serializers.ModelSerializer):
    bought_by = serializers.PrimaryKeyRelatedField(queryset=Guests.objects.all())
    ticket_for = serializers.PrimaryKeyRelatedField(queryset=Services.objects.all())
    issued_date = serializers.DateField(format="%d-%m-%Y", input_formats=("%d-%m-%Y", ))

    class Meta:
        model = Tickets
        fields = ['bought_by', 'issued_date', 'num_tickets', 'ticket_for']

    def create(self, validated_data):
        service = validated_data.pop('ticket_for')
        ticket = Tickets(**validated_data)
        ticket.registered_by = self.context['request'].user
        ticket.ticket_for = service
        ticket.ticket_tariff = service.ticket_price
        ticket.save()

        return ticket

    def validate_issued_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Can't buy tickets for a past date")

        return value


class TicketReadOnlySerializer(serializers.ModelSerializer):
    issued_on = serializers.DateTimeField(format="%d-%m-%Y %I:%M %p")
    issued_date = serializers.DateField(format="%d-%m-%Y", input_formats=("%d-%m-%Y", ))
    bought_by = serializers.SlugRelatedField(slug_field='name', read_only=True)
    registered_by = serializers.SlugRelatedField(slug_field='user_name', read_only=True)
    ticket_for = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Tickets
        fields = '__all__'

class TicketWithTotalPrice(TicketReadOnlySerializer):
    total_price = serializers.FloatField()