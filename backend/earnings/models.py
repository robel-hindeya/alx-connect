from decimal import Decimal

from django.conf import settings
from django.db import models


class Earnings(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="earnings"
    )
    views = models.PositiveIntegerField(default=0)
    birr = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Earnings({self.user_id})"

