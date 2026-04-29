from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import generics, permissions, response, status
from rest_framework.views import APIView

from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = serializer.save()
        except IntegrityError:
            return response.Response(
                {"detail": "Username is already taken."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return response.Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return response.Response(UserSerializer(request.user).data)

    def put(self, request):
        user = request.user
        profile = getattr(user, "profile", None)
        data = request.data or {}

        for field in ["first_name", "last_name", "email"]:
            if field in data:
                setattr(user, field, data.get(field) or "")

        user.save()

        if profile:
            for field in ["home", "bio"]:
                if field in data:
                    setattr(profile, field, data.get(field) or "")
            profile.save()

        return response.Response(UserSerializer(user).data)
