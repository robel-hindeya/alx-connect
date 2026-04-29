from rest_framework import serializers

from .models import Earnings


class EarningsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Earnings
        fields = ["views", "birr", "updated_at"]

