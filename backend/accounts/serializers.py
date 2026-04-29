from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Profile

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["home", "bio"]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile"]


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(min_length=6, write_only=True)
    name = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value: str) -> str:
        username = value.strip()
        if not username:
            raise serializers.ValidationError("Username is required.")
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username is already taken.")
        return username

    def create(self, validated_data):
        name = (validated_data.get("name") or "").strip()
        user = User.objects.create_user(
            username=validated_data["username"].strip(),
            email=validated_data.get("email") or "",
            password=validated_data["password"],
            first_name=name,
        )
        return user
