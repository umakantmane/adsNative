from django.contrib.auth.models import User
from student.serializers import SignUpSerializer, SignInSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

class SignUp(APIView):

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = User()
            user.username = serializer.data['username']
            user.set_password(serializer.data['password_one'])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateSuperUser(APIView):

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = User()
            user.username = serializer.data['username']
            user.set_password(serializer.data['password_one'])
            user.is_superuser = True
            user.is_staff = True
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignIn(APIView):

    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.get(username=serializer.data['username'])
            try:
                t = Token.objects.get(user_id=user.id)
                t.delete()
            except Token.DoesNotExist:
                pass
            token = Token.objects.create(user=user)
            return JsonResponse({'user_id':user.id,'access_token':token.key, 'username':user.username})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


