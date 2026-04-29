from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.http import JsonResponse
from django.templatetags.static import static as static_path
from django.urls import include, path
from django.views.generic.base import RedirectView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def root(request):
  accept = (request.headers.get("accept") or "").lower()
  if "text/html" in accept:
    return RedirectView.as_view(url="/admin/", permanent=False)(request)
  return JsonResponse(
    {
      "status": "ok",
      "message": "ALX App Backend is running",
      "endpoints": {
        "admin": "/admin/",
        "token_obtain": "/api/auth/token/",
        "token_refresh": "/api/auth/token/refresh/",
        "auth": "/api/auth/",
        "api": "/api/",
      },
    }
  )

urlpatterns = [
  path("", root, name="root"),
  path(
    "favicon.ico",
    RedirectView.as_view(url=static_path("favicon.svg"), permanent=False),
    name="favicon",
  ),
  path("admin/", admin.site.urls),
  path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
  path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
  path("api/auth/", include("accounts.urls")),
  path("api/", include("posts.urls")),
  path("api/", include("earnings.urls")),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  urlpatterns += staticfiles_urlpatterns()
