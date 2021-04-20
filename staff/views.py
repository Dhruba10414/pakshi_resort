
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,AllowAny,IsAuthenticated
from staff.serializers import UserRemoveSerializer,UserSerializer,UserRegistrationSerializer,LogoutSerializer,SetNewPasswordSerializer,ChangePasswordSerializer,ResetPasswordEmailRequestSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from staff.models import User

#####
from .renderers import UserRenderer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
####


class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [IsAdminUser,] ##IsAdminUser

    def post(self, request,*args,**kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        
        
        return Response( status=status_code)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,) ###IsAuthenticated
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message': 'logout Successful'}, status=status.HTTP_204_NO_CONTENT)

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,) ###IsAuthenticated
    serializer_class = ChangePasswordSerializer
    


class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser,] ###IsAdminUser
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDeleteView(generics.DestroyAPIView):
    permission_classes=[IsAdminUser,] ###IsAdmin
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StaffLeaved(generics.GenericAPIView):
    permission_classes=[IsAdminUser,] ##IsAdmin
    serializer_class=UserRemoveSerializer
    

    def put(self, request, *args, **kwargs):
        staff_id = request.data.get('id', None)
        
        if staff_id is not None:
            try:
                staff = User.objects.get(id=staff_id)
                staff.is_active = False
                staff.save()
                return Response(status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


####funtionality need to be added
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer
    permission_classes=(AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({'Failed' :"this email does not refer to any user" },status=status.HTTP_204_NO_CONTENT)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes=(AllowAny,)

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes=(AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

class UserView(generics.GenericAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, req, *args, **kwargs):
        staff = req.user
        staff_data = self.get_serializer(staff)
        return Response(staff_data.data, status= status.HTTP_200_OK)
