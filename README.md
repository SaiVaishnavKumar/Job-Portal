<<<<<<< HEAD
# Job Portal (Basic Version)

A full MERN stack job portal application with authentication, job posting, applications, search/filter, and responsive UI.

## Features

- User registration and login with JWT authentication
- Role support: `user` and `employer`
- CRUD operations for jobs
- Apply for jobs and manage applications
- Search and filter job listings
- Protected routes and role-based access control
- Express backend with MongoDB
- React frontend with routing and context

## Folder structure

- `backend/` - Node.js + Express API
- `frontend/` - React application (Vite)

## Setup

1. Copy `.env.example` to `.env` in `backend/` and configure the values.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Start backend and frontend in separate terminals:
   ```bash
   cd backend
   npm run dev
   ```
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/jobs`
- `POST /api/jobs`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`
- `POST /api/applications/:jobId`
- `GET /api/applications`
- `PUT /api/applications/:id`

## Notes

- Use MongoDB Atlas or a local `mongodb://localhost:27017/job-portal` URI.
- The frontend calls the API using `VITE_API_URL`.
=======
# Job-Portal
A full-stack MERN Job Portal application with authentication, job management, and application tracking features.
>>>>>>> 52919f3034d46efc98b237a1a0c41925502176f3
