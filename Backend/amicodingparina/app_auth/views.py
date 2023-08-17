from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from app_auth import renderers
from . import serializers

# Create your views here.

# Creating tokens manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):
    # renderer_classes = [renderers.UserRenderer]

    def post(self, request, format=None):
        serializer = serializers.UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    renderer_classes = [renderers.UserRenderer]

    def post(self, request, format=None):
        serializer = serializers.UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors':
                                 {'non_field_errors':
                                  ['Email or password is not valid']}
                                 },
                                status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserDashboardView(APIView):
#     # renderer_classes = [renderers.UserRenderer]
#     permission_classes = [IsAuthenticated]

#     def get(self, request, format=None):
#         serializer = serializers.UserDashboardSerializer(request.user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
