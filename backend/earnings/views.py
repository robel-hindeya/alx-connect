from rest_framework import response
from rest_framework.views import APIView

from .models import Earnings
from .serializers import EarningsSerializer


class EarningsMeView(APIView):
    def get(self, request):
        earnings, _ = Earnings.objects.get_or_create(user=request.user)
        return response.Response(EarningsSerializer(earnings).data)

