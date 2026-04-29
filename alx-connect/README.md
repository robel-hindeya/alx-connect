# ALX Connect

Modern social networking UI for ALX students to connect, collaborate, and share projects.

Built with Expo + React Native (TypeScript), using Expo Router (React Navigation tabs/stack) and dummy data.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

## Backend (Auth)

Auth screen calls the Django backend (SimpleJWT). Set the API URL:

```bash
EXPO_PUBLIC_API_BASE_URL=http://YOUR_PC_LAN_IP:8000
```

Notes:

- Android emulator: use `http://10.0.2.2:8000`
- Real phone: run Django with `python manage.py runserver 0.0.0.0:8000` and use your computer's LAN IP (e.g. `http://192.168.1.10:8000`)

## Screens

- Auth (Login / Signup)
- Home Feed (posts with like/comment actions)
- Create Post
- Edit Profile
- Profile (skills + user posts)
- Settings (Profile/Privacy/Notifications)
- Earnings Dashboard (1000 views = 100 Birr)

## Project structure

- `app/`: Expo Router routes (tabs + stack)
- `screens/`: screen UIs
- `components/alx/`: shared UI components (cards, buttons, post cards)
- `context/AppState.tsx`: in-memory app state (auth + posts)
- `data/dummy.ts`: seed data
- `constants/alxTheme.ts`: light theme tokens

## Notes

- Feed/comments are still demo data (no backend yet).
- Posts are stored in memory while the app is running.
