# FitForge

FitForge is a premium fitness web app for planning training, logging workouts and meals, understanding nutrition, and tracking progress over time. It combines a searchable exercise library with user-owned workout and food logs, a diet chatbot, and a private progress dashboard.

> This app provides general fitness and nutrition guidance only. It is not medical advice.

## Tech stack

- [Next.js](https://nextjs.org/) App Router, React, and TypeScript
- Tailwind CSS for the responsive dark UI
- PostgreSQL with Prisma ORM
- Auth.js / NextAuth credentials authentication with bcrypt password hashing
- Zod and React Hook Form for validation and forms
- Recharts for progress visualizations
- Lucide React for icons

## Features

- Secure email/password authentication
- Exercise library with search, filters, images, and exercise details
- Workout tracking for sets, reps, weight, duration, rest, and notes
- Daily nutrition tracking for calories, protein, carbs, and fats
- Common-food picker and editable food logs
- Diet chatbot with a helpful rule-based fallback when no AI key is configured
- Profile metrics and workout, nutrition, and strength-progress charts
- Settings for profile and macro goals
- Privacy Policy, Terms of Use, logout, and safe account deletion

## Prerequisites

Install the following before starting:

- Node.js 20 or newer
- npm
- A PostgreSQL database (local or hosted)

## Local setup

1. Clone the repository and enter the project directory.

   ```bash
   git clone <your-repository-url>
   cd Fitforge
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create your local environment file. Never commit this file.

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add at least `DATABASE_URL` and `NEXTAUTH_SECRET`. See [Environment variables](#environment-variables) below.

5. Generate the Prisma client, apply migrations, and load the exercise and food catalog.

   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

   To create a new migration while developing a schema change, use:

   ```bash
   npx prisma migrate dev --name <migration-name>
   ```

6. Start the development server.

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Create a `.env` file from `.env.example`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
AI_API_KEY=
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `NEXTAUTH_SECRET` | Yes | Long random secret used to sign authentication tokens. |
| `NEXTAUTH_URL` | Yes | Canonical app URL. Use `http://localhost:3000` locally and your deployed HTTPS URL in production. |
| `AI_API_KEY` | No | Server-side AI key for chatbot responses. If omitted, FitForge uses its built-in rule-based diet bot. |

Generate a suitable local secret with:

```bash
openssl rand -base64 32
```

Do not prefix any of these variables with `NEXT_PUBLIC_`, and never put database credentials or AI keys in client-side code.

## Database setup

FitForge uses PostgreSQL. Make sure the database named in `DATABASE_URL` exists and the supplied user can create tables.

Useful Prisma commands:

```bash
# Generate the Prisma client after installing dependencies or changing the schema
npx prisma generate

# Apply existing migrations locally and create a new migration if the schema changed
npx prisma migrate dev

# Load the exercise library and common food items
npx prisma db seed

# Open Prisma's local database browser (optional)
npx prisma studio
```

The seed command is idempotent: it can be run again to update the common exercise and food catalog without intentionally creating duplicate exercise slugs.

## Production setup

1. Create a production PostgreSQL database with a dedicated, least-privilege application user.
2. Configure production environment variables in your hosting provider:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (use a new strong secret, not your local one)
   - `NEXTAUTH_URL` (for example, `https://your-domain.com`)
   - `AI_API_KEY` only if you want external AI responses
3. Generate the Prisma client and apply committed migrations:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

4. Optionally load the shared exercise and food catalog once:

   ```bash
   npx prisma db seed
   ```

5. Build and run the application:

   ```bash
   npm run build
   npm run start
   ```

Use `prisma migrate deploy` in production. Do not run `prisma migrate dev` against a production database.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com/new), import the repository. Vercel detects Next.js automatically.
3. Add the production environment variables from the table above in **Project Settings → Environment Variables**.
4. Ensure `NEXTAUTH_URL` matches the final deployed URL exactly, including `https://`.
5. Before or immediately after the first deployment, run production migrations against the production database:

   ```bash
   npx prisma migrate deploy
   ```

6. Deploy. Vercel runs `npm run build` for the application.
7. Run `npx prisma db seed` once from a secure environment if the production exercise and food catalog is empty.

For another Node-compatible platform, use the same environment variables, migration command, build command (`npm run build`), and start command (`npm run start`).

## Privacy and safety

- User passwords are hashed with bcrypt and are never stored as plain text.
- Dashboard data and mutation routes require a session; workout logs, food logs, chat history, and profile updates are scoped to the current user.
- `.env` is ignored by Git. Commit only `.env.example` with blank placeholder values.
- `AI_API_KEY` is read only on the server. The chatbot supplies general fitness and nutrition guidance, not diagnosis or treatment.
- People with medical conditions, injuries, eating disorders, pregnancy, or special dietary needs should consult an appropriately qualified professional before changing exercise or nutrition habits.

## Checks

Run these before opening a pull request or deploying:

```bash
npx tsc --noEmit
npm run lint
npm run build
```
