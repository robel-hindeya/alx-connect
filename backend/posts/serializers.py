from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "user_id", "title", "post_file", "views", "created_at"]
        read_only_fields = ["id", "user_id", "views", "created_at"]

