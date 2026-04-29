# Backend (Django)

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
# edit .env and set DATABASE_URL (Render PostgreSQL), DJANGO_SECRET_KEY, etc.
set -a; source .env; set +a
python manage.py migrate
# optional
python manage.py createsuperuser
python manage.py runserver
```

If you see `ModuleNotFoundError: No module named 'django'`, you likely didn’t activate the virtualenv. Use `source .venv/bin/activate` or run `./.venv/bin/python manage.py runserver`.

## Database (Render PostgreSQL)

- Set `DATABASE_URL` to your Render PostgreSQL connection string (keep it out of git; `.env` is ignored).
- `DATABASE_URL` is required (dev + prod).
  - One-off example: `DATABASE_URL='postgresql://...' python manage.py migrate`

## Connect from Expo (mobile)

If you’re running the Expo app on a phone (or Android emulator), don’t use `localhost` for the API URL.

- Run Django on your LAN IP: `python manage.py runserver 0.0.0.0:8000`
- Make sure your phone and computer are on the same Wi‑Fi network.
- In dev (`DJANGO_DEBUG=1`), CORS is open (`CORS_ALLOW_ALL_ORIGINS=True`).

## Django Admin

- Admin URL: `http://127.0.0.1:8000/admin/`
- If the admin login page looks unstyled, make sure `DJANGO_DEBUG=1` (dev) or run `python manage.py collectstatic` and serve `staticfiles/` in production.

## Auth (JWT)

- Obtain token: `POST /api/auth/token/`
- Refresh token: `POST /api/auth/token/refresh/`
- Register: `POST /api/auth/register/`

## Business rule (earnings)

- `1000` video views = `100` Birr
# alx-connect
