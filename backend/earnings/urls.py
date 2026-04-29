from django.urls import path

from .views import EarningsMeView

urlpatterns = [
    path("earnings/me/", EarningsMeView.as_view(), name="earnings_me"),
]

