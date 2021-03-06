
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from allauth.account.views import PasswordResetView
from django.http import HttpRequest
from django.middleware.csrf import get_token
from django.conf import settings
from django.contrib.auth.models import User
from home.models import UserProfile

from home.api.v1.serializers import AppCitizenSignupSerializer,AppOfficerSignupSerializer,SignupSerializer, CustomTextSerializer, HomePageSerializer
from home.models import CustomText, HomePage


class PasswordResetAPI(APIView):
    def post(self, request):
        email = request.data.get('email')
        request = HttpRequest()
        request.method = 'POST'
        print(request.get_full_path())
        # add the absolute url to be be included in email
        if settings.DEBUG:
            request.META['HTTP_HOST'] = '127.0.0.1:8000'
        else:
            request.META['HTTP_HOST'] = 'severstar-backend.herokuapp.com'
        # pass the post form data
        request.POST = {
            'email': email,
            'csrfmiddlewaretoken': get_token(HttpRequest())
        }
        PasswordResetView.as_view()(request)
        return Response({"response": "reset link has been send to email.."})

class ImageUploadAPI(APIView):
    def post(self, request):
        image = request.data.get('image')
        print(image)
        return Response({"response": "Image File Name"})

class LoginUserNameCheckView(APIView):
    def post(self, request):
        username = request.data.get('username')
        if User.objects.filter(username=username).exists():
          return Response({"response": {'error':'Username already exist..'}})
        else:
          return Response({"response": {'success':'Username is not exist.'}})


class OfficerView(APIView):
    def post(self, request):
        return Response({"response": "success"})

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ['post']

class AppOfficerViewSet(ModelViewSet):
    serializer_class = AppOfficerSignupSerializer
    http_method_names = ['post']

class AppCitizenViewSet(ModelViewSet):
    serializer_class = AppCitizenSignupSerializer
    http_method_names = ['post']

class LoginUserName(APIView):
    def post(self, request):
        try:
          username = request.data.get('username')
          user = User.objects.filter(username=username)
          approved_user = UserProfile.objects.get(user=user[0]).approved_user
          if approved_user == 1:
            token = ObtainAuthToken().post(request)
            login = LoginViewSet
            return login.create(self, request)
          else:
            return Response({"response": {'error':'Please wait for verification'}})
        except:
          return Response({"response": {'error':'username or password is incorrect.'}})

class LoginViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(request)


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ['get', 'put', 'patch']


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ['get', 'put', 'patch']

