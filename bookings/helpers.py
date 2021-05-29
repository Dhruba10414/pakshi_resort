from .models import *
from datetime import date, datetime
from django.db.models import Q


def convert_to_date(date_string, f="%d-%m-%Y"):
    if date_string is not None:
        return datetime.strptime(date_string, "%d-%m-%Y").date()
    else:
        return date.today() 


def room_available(room_id, from_, to_):
    is_available = Bookings.objects.filter(Q(room__id=room_id),
                                            (
                                                (Q(check_in__lte=from_) & Q(check_out__gt=from_)) |
                                                (Q(check_in__lt=to_) & Q(check_out__gte=to_)) |
                                                (Q(check_in__gt=from_) & Q(check_out__lt=to_))
                                            )).exclude(Q(is_canceled=True) | Q(is_complete=True)).exists()
    
    return not is_available
                                

def add_new_booking(room_id, guest_id, staff_id, check_in, check_out):
    if check_in < date.today() or check_in > check_out:
        return None

    ok = room_available(room_id, check_in, check_out)
    if not ok:
        return None

    try:
        room = Rooms.objects.get(id=room_id)
        new_booking = Bookings(room=room, guest_id=guest_id, check_in=check_in, 
                                check_out=check_out, by_staff_id=staff_id)
        new_booking.rate = room.room_type.tariff
        new_booking.applied_vat = room.room_type.vat
        new_booking.save()
    
        return new_booking
    except Rooms.DoesNotExist:
        return None   