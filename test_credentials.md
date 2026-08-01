# Test Credentials — ProTrack

## Admin Account (JWT / password)
- Email: `sma.adm.production@momogi.co.id`
- Password: `admin123`
- Role: `admin`

## Regular User (JWT / password)
- Email: `user@momogi.co.id`
- Password: `user123`
- Role: `user`

## Endpoints
- POST `/api/auth/login` — body `{ email, password }`
- POST `/api/auth/google-session` — body `{ session_id }` (Emergent OAuth exchange)
- GET  `/api/auth/me`
- POST `/api/auth/logout`
- POST `/api/auth/register` (admin only)

Auth token is set as httpOnly cookie `access_token` (JWT) or `session_token` (Google).
Backend also accepts `Authorization: Bearer <jwt>` header.
