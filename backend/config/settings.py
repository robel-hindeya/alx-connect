from pathlib import Path
import os
from urllib.parse import parse_qs, unquote, urlparse

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-secret-key-change-me-please-use-a-long-random-value")
DEBUG = os.getenv("DJANGO_DEBUG", "1") == "1"
ALLOWED_HOSTS = [h for h in os.getenv("DJANGO_ALLOWED_HOSTS", "*").split(",") if h]

INSTALLED_APPS = [
  "django.contrib.admin",
  "django.contrib.auth",
  "django.contrib.contenttypes",
  "django.contrib.sessions",
  "django.contrib.messages",
  "django.contrib.staticfiles",
  "corsheaders",
  "rest_framework",
  "rest_framework_simplejwt",
  "accounts.apps.AccountsConfig",
  "posts.apps.PostsConfig",
  "earnings.apps.EarningsConfig",
]

MIDDLEWARE = [
  "corsheaders.middleware.CorsMiddleware",
  "django.middleware.security.SecurityMiddleware",
  "django.contrib.sessions.middleware.SessionMiddleware",
  "django.middleware.common.CommonMiddleware",
  "django.middleware.csrf.CsrfViewMiddleware",
  "django.contrib.auth.middleware.AuthenticationMiddleware",
  "django.contrib.messages.middleware.MessageMiddleware",
  "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
  {
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [],
    "APP_DIRS": True,
    "OPTIONS": {
      "context_processors": [
        "django.template.context_processors.debug",
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
      ],
    },
  },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

def _postgres_db_config_from_url(database_url: str):
  parsed = urlparse(database_url)
  if parsed.scheme not in {"postgres", "postgresql"}:
    raise ValueError("DATABASE_URL must start with postgres:// or postgresql://")

  query = parse_qs(parsed.query)
  sslmode = query.get("sslmode", [os.getenv("DJANGO_DB_SSLMODE", "require")])[0]

  options = {}
  if sslmode:
    options["sslmode"] = sslmode

  return {
    "ENGINE": "django.db.backends.postgresql",
    "NAME": (parsed.path or "").lstrip("/"),
    "USER": unquote(parsed.username or ""),
    "PASSWORD": unquote(parsed.password or ""),
    "HOST": parsed.hostname or "",
    "PORT": str(parsed.port or ""),
    "CONN_MAX_AGE": int(os.getenv("DJANGO_DB_CONN_MAX_AGE", "60")),
    "OPTIONS": options,
  }


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
  raise RuntimeError("DATABASE_URL is required (set it to your Render PostgreSQL URL).")
DATABASES = {"default": _postgres_db_config_from_url(DATABASE_URL)}

AUTH_PASSWORD_VALIDATORS = [
  {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
  {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
  {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
  {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = os.getenv("DJANGO_TIME_ZONE", "UTC")
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_ALL_ORIGINS = DEBUG

REST_FRAMEWORK = {
  "DEFAULT_AUTHENTICATION_CLASSES": (
    "rest_framework_simplejwt.authentication.JWTAuthentication",
  ),
  "DEFAULT_PERMISSION_CLASSES": (
    "rest_framework.permissions.IsAuthenticated",
  ),
}
