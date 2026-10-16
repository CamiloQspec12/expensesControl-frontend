# Expenses Control

A full-stack personal finance app to track income and expenses, organise spending by category and spot small recurring "hormiga" (ant) expenses that add up over time.

**Live demo:** [expenses-control-phi.vercel.app](https://expenses-control-phi.vercel.app)

**Demo account:**` testuser@gmail.com` / `1234567`

**Backend repo:** [expensesControl-backend](https://github.com/CamiloQspec12/expensesControl-backend)

![Login](./screenshots/Login.png)

## Features

- Sign up and log in with JWT authentication
- Create expenses, incomes and categories
- Dashboard with total expenses, total income, balance and most used categories
- Form validation on both the frontend and the backend
- Loading states and clear error messages (validation, server and expired-session errors)
- Responsive layout with a mobile menu

## Tech stack

**Frontend:** Vue 3 (Composition API), Pinia, Vue Router, Axios, Tailwind CSS, Vite
**Backend:** Node.js, Express, Prisma, PostgreSQL, JWT, bcrypt
**Deployment:** Vercel (frontend), Render (backend), Neon (PostgreSQL)

## Screenshots

| Desktop                          | Mobile                                  |
| -------------------------------- | --------------------------------------- |
| ![](./screenshots/dashboard.png) | ![](./screenshots/dashboard_mobile.png) |

## Getting started

### Prerequisites

- Node.js v22+
- PostgreSQL running locally

### Backend

```bash
git clone https://github.com/CamiloQspec12/expensesControl-backend
cd expensesControl-backend
npm install
cp .env.example .env     # then edit .env with your Postgres credentials and a JWT secret
npx prisma migrate dev   # creates the database (if missing) and its tables
npm run dev
```

### Frontend

```bash
git clone https://github.com/CamiloQspec12/expensesControl-frontend
cd expensesControl-frontend
npm install
npm run dev

```

<!-- By default the frontend calls `http://localhost:3000/api`. To point it at another backend,
copy `.env.example` to `.env` and change `VITE_API_URL`. -->

## Environment variables

**Backend (`.env`)**

| Variable       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                         |
| `JWT_SECRET`   | Secret used to sign tokens                           |
| `PORT`         | Server port (default 3000)                           |
| `NODE_ENV`     | `production` enables SSL for the database connection |

**Frontend (`.env`)**

| Variable       | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API, e.g. `http://localhost:3000/api` |

## What I learned

- Deploying a full-stack app: Vercel + Render + Neon, CORS between environments, environment-specific database SSL
- Migrating hosting when a free trial expired: moving the database with Prisma migrations and repointing the frontend

## Next steps

- Edit and Delete records
- Charts on the dashboard
- Filters on expenses and on the dashboard
