from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
import threading
from django.conf import settings


class ConformationEmailDelivery(threading.Thread):
    def __init__(self, guest, bookings):
        reciever = guest.email
        subject = 'Room Reservation Confirmed'
        html_content = render_to_string('confirmation.html', {'guest': guest, 'bookings': bookings})
        text_content = 'To view this email enable HTML rendering in your email viewer'
        message = EmailMultiAlternatives(subject, text_content, to=[reciever])
        message.attach_alternative(html_content, 'text/html')
        message.content_subtype = 'html'
        message.mixed_subtype = 'relative'
        img_path = settings.STATIC_ROOT / 'images' / 'logo-white.png'

        with open(img_path, 'rb') as img:
            a_img = MIMEImage(img.read())
            a_img.add_header('Content-ID', '<logo>')
            message.attach(a_img)

        self.email = message
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class CancelationEmailDelivery(threading.Thread):
    def __init__(self, booking):
        reciever = booking.guest.email
        subject = 'Room Reservation Canceled'
        html_content = render_to_string('cancelation.html', {'booking': booking})
        text_content = 'To view this email enable HTML rendering in your email viewer'
        message = EmailMultiAlternatives(subject, text_content, to=[reciever])
        message.attach_alternative(html_content, 'text/html')
        message.content_subtype = 'html'
        message.mixed_subtype = 'relative'
        img_path = settings.STATIC_ROOT / 'images' / 'logo-white.png'

        with open(img_path, 'rb') as img:
            a_img = MIMEImage(img.read())
            a_img.add_header('Content-ID', '<logo>')
            message.attach(a_img)

        self.email = message
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class ReservationEmailDelivery(threading.Thread):
    def __init__(self, booking_req):
        reciever = booking_req.guest.email
        subject = 'Room Reservation Order Received'
        html_content = render_to_string('reservation_accepted.html', {'reservation': booking_req})
        text_content = 'To view this email enable HTML rendering in your email viewer'
        message = EmailMultiAlternatives(subject, text_content, to=[reciever])
        message.attach_alternative(html_content, 'text/html')
        message.content_subtype = 'html'
        message.mixed_subtype = 'relative'
        img_path = settings.STATIC_ROOT / 'images' / 'logo-white.png'

        with open(img_path, 'rb') as img:
            a_img = MIMEImage(img.read())
            a_img.add_header('Content-ID', '<logo>')
            message.attach(a_img)

        self.email = message
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()
