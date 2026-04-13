# Job Portal

A modern MERN job portal application with authentication, user roles, seeded sample data, and a professional dashboard.

## What’s included

- React frontend with dark/light mode and responsive UI
- Express backend with MongoDB authentication and role-based access
- Employer workflow: post jobs, review applicants, manage applications
- Job seeker workflow: search jobs, apply, and track application status
- Seed script for real sample users, jobs, and applications
- Vercel-ready frontend deployment configuration

## Project structure

- `backend/` - Node.js API server
- `frontend/` - React + Vite frontend app
- `vercel.json` - Vercel deployment configuration for the frontend

## Quick setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
2. Configure backend environment:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Make sure `.env` contains your MongoDB URI, JWT secret, and `PORT=7000`.
3. Seed sample data:
   ```bash
   cd backend
   npm run seed
   ```
4. Start both servers in separate terminals:
   ```bash
   cd backend
   npm run dev
   ```
   ```bash
   cd frontend
   npm run dev
   ```

## Seed data

Run `npm run seed` inside `backend/` to create:

- job seeker account: `alex@jobportal.com` / `Password123!`
- employer accounts: `taylor@startupx.com`, `jordan@recruitco.com`
- admin account: `admin@jobportal.com`
- sample jobs and applications

## GitHub workflow (main branch only)

If you want changes to apply directly and stay simple:

1. Edit your code.
2. Save the file.
3. Commit on `main`:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push origin main
   ```

That is the normal workflow. There is no need to create branches unless you want a separate feature copy.

## Vercel deployment guide

You can deploy the frontend from GitHub using Vercel:

1. Sign in at https://vercel.com and choose "Import Project".
2. Select your GitHub repository `Job-Portal`.
3. In Vercel project settings, confirm the root path is the repository root.
4. Vercel will detect the frontend and use `frontend/package.json` because of `vercel.json`.
5. Deploy the project.

### If you want automatic deployment

- Connect GitHub to Vercel.
- Use the `main` branch.
- Every commit pushed to `main` will trigger a new Vercel deployment.

## How the frontend talks to the backend

- Frontend uses `VITE_API_URL` from `frontend/.env`
- Backend runs on port `7000`
- The API base URL is `http://localhost:7000/api`

## Running the frontend build locally

From the `frontend/` folder:

```bash
npm run build
```

If the build succeeds, the app is ready for production deployment.
