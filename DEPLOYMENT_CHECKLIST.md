# FitForge production deployment checklist

Use this checklist before making FitForge publicly available.

## Environment

- [ ] Create a production PostgreSQL database and application user.
- [ ] Set `DATABASE_URL` to the production database connection string.
- [ ] Generate and set a new, unique `NEXTAUTH_SECRET` of at least 32 characters.
- [ ] Set `NEXTAUTH_URL` to the exact public HTTPS address, for example `https://fitforge.example.com`.
- [ ] Set `AI_API_KEY` only if external AI chatbot responses are required. It is optional; the rule-based fallback works without it.
- [ ] Confirm no secret uses a `NEXT_PUBLIC_` prefix.
- [ ] Confirm `.env` is not committed; only `.env.example` belongs in source control.

## Database

- [ ] Confirm the production database is reachable from the deployment environment.
- [ ] Apply committed migrations only:

  ```bash
  npx prisma migrate deploy
  ```

- [ ] Run the seed command once if the production exercise and food catalog is empty:

  ```bash
  npx prisma db seed
  ```

## Build and release

- [ ] Install locked dependencies:

  ```bash
  npm ci
  ```

- [ ] Verify the release build locally or in CI:

  ```bash
  npm run build
  ```

- [ ] For a Node host, start the optimized application:

  ```bash
  npm run start
  ```

- [ ] For Vercel, connect the repository, set the production environment variables, and deploy. Vercel runs `npm run build` automatically.

## Post-deployment smoke test

- [ ] Open the home, login, register, Privacy Policy, and Terms pages.
- [ ] Register or sign in with a test account.
- [ ] Confirm unauthenticated users are redirected away from `/dashboard`.
- [ ] Log a workout and food item; verify they appear only in the signed-in account.
- [ ] Confirm the chatbot works with the configured AI provider or its fallback.
- [ ] Verify account deletion requires the `DELETE` confirmation.
- [ ] Check `/robots.txt` and confirm the dashboard and API routes are not crawlable.
