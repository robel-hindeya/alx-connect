from decimal import Decimal

from django.db.models import F
from rest_framework import permissions, response, status, viewsets
from rest_framework.decorators import action

from earnings.models import Earnings

from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        user_id = self.request.query_params.get("user_id")
        if user_id:
            return qs.filter(user_id=user_id)
        return qs

    @action(detail=True, methods=["post"], permission_classes=[permissions.AllowAny])
    def view(self, request, pk=None):
        post = self.get_object()
        Post.objects.filter(pk=post.pk).update(views=F("views") + 1)

        # Earnings rule: 1000 views = 100 Birr => 1 view = 0.10 Birr
        Earnings.objects.get_or_create(user=post.user)
        Earnings.objects.filter(user=post.user).update(
            views=F("views") + 1,
            birr=F("birr") + Decimal("0.10"),
        )

        post.refresh_from_db(fields=["views"])
        return response.Response({"id": post.id, "views": post.views}, status=status.HTTP_200_OK)

