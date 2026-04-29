from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Earnings

User = get_user_model()


@receiver(post_save, sender=User)
def create_earnings(sender, instance, created, **kwargs):
    if created:
        Earnings.objects.create(user=instance)

