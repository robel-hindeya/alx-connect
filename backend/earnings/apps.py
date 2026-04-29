from django.apps import AppConfig


class EarningsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "earnings"

    def ready(self) -> None:
        from . import signals  # noqa: F401

