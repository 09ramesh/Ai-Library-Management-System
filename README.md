# 📚 AI Library Management System

A full-stack Library Management System built with **React + Spring Boot + PostgreSQL**, enhanced with an **AI Library Assistant**.

## Features

- Dashboard with live book/student counts
- Book management
- Author management
- Category management
- Student management
- AI Library Assistant
- AI answers use the current library catalogue as context
- OpenAI API key stays on the Spring Boot backend
- PostgreSQL persistence
- CORS configuration for local and hosted frontends

## Architecture

React → Spring Boot REST API → PostgreSQL

React → Spring Boot `/api/ai/ask` → OpenAI Responses API

## Local run

### 1. Database

Create a PostgreSQL database named:

```text
librarydb
```

### 2. Backend

Set:

```text
OPENAI_API_KEY=your_key
```

Then:

```bash
cd backend
mvn spring-boot:run
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

For a hosted frontend, create `frontend/.env`:

```text
VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api
```

For a hosted backend, set:

```text
OPENAI_API_KEY=your_key
DATABASE_URL=your_postgresql_connection_string
CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-DOMAIN
```

## Important

Never commit your real API key. Commit only `.env.example`.

## GitHub

From the project root:

```bash
git init
git add .
git commit -m "Add AI Library Assistant"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
