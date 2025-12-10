# Phase II Specification: Full-Stack Web Application

> **Project:** Evolution of Todo - Hackathon II
> **Phase:** II - Full-Stack Web Application
> **Date:** December 9-14, 2025
> **Points:** 150 (of 1,000 total)
> **Status:** 🚧 In Implementation

---

## 📋 Specification Summary

This document consolidates all Phase II specifications into a single reference for the implementation phase.

---

## 🎯 Objectives

Transform the Phase I console application into a production-ready, multi-user web application with:

1. **Next.js 16+ Frontend** - Modern responsive UI with Tailwind CSS
2. **FastAPI Backend** - RESTful API with SQLModel ORM
3. **PostgreSQL Database** - Neon Serverless cloud database
4. **Better Auth** - JWT-based user authentication
5. **User Isolation** - Each user sees only their own tasks

---

## 📚 Complete Specification Reference

### Core Specifications
- **Overview:** `specs/overview.md` - Mission, objectives, success metrics
- **Architecture:** `specs/architecture.md` - System design, data flows, patterns

### Database Specifications
- **Schema:** `specs/database/schema.md` - Tables, models, indexes, CRUD operations

### API Specifications
- **REST Endpoints:** `specs/api/rest-endpoints.md` - All 7 endpoints with auth

### Feature Specifications
- **Task CRUD:** `specs/features/task-crud.md` - Complete task management flows
- **Authentication:** `specs/features/authentication.md` - Auth flows, security

### UI Specifications
- **Components:** `specs/ui/components.md` - 15 reusable components
- **Pages:** `specs/ui/pages.md` - 4 pages (landing, auth, dashboard)

---

## 🏗️ Technology Stack

### Frontend
```
Framework:     Next.js 16+ (App Router)
Language:      TypeScript 5.0+
Styling:       Tailwind CSS 3.4+
Auth:          Better Auth (client)
UI Library:    shadcn/ui
```

### Backend
```
Framework:     FastAPI (latest)
Language:      Python 3.13+
ORM:           SQLModel
Database:      Neon Serverless PostgreSQL
Auth:          JWT verification
Validation:    Pydantic v2
```

### Development
```
Monorepo:      Single repository
Version Control: Git + GitHub
AI Assistant:  Claude Code
Methodology:   Spec-Driven Development
```

---

## 🔐 Security Requirements

### Authentication
- ✅ JWT tokens issued by Better Auth
- ✅ Tokens verified on every backend request
- ✅ 7-day token expiry
- ✅ Passwords hashed with bcrypt

### Authorization
- ✅ URL `user_id` must match token `user_id`
- ✅ All database queries filtered by `user_id`
- ✅ 403 Forbidden on user_id mismatch
- ✅ Users can only access their own data

### Input Validation
- ✅ Frontend validation (immediate feedback)
- ✅ Backend validation (Pydantic schemas)
- ✅ SQL injection prevention (SQLModel ORM)
- ✅ XSS prevention (React escaping)

---

## 📊 Database Schema

### Tables

**users** (Managed by Better Auth)
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**tasks** (Application Data)
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

---

## 🛣️ API Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/health` | Health check | No |
| GET | `/api/{user_id}/tasks` | List tasks | Yes |
| POST | `/api/{user_id}/tasks` | Create task | Yes |
| GET | `/api/{user_id}/tasks/{id}` | Get task | Yes |
| PUT | `/api/{user_id}/tasks/{id}` | Update task | Yes |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task | Yes |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion | Yes |

---

## 🎨 UI Components

### shadcn/ui Primitives
- Button, Input, Textarea, Checkbox
- Card, Dialog, AlertDialog
- Toast, Skeleton, DropdownMenu

### Custom Components
- TaskList, TaskItem, CreateTaskForm
- TaskFilter, Header, Footer

### Pages
- Landing Page (`/`)
- Sign Up (`/signup`)
- Sign In (`/login`)
- Dashboard (`/dashboard`) - Protected

---

## 📋 Acceptance Criteria

### Functional
- [ ] Users can sign up with email/password
- [ ] Users can sign in and authenticate
- [ ] Users can create tasks
- [ ] Users can view all their tasks
- [ ] Users can update tasks
- [ ] Users can delete tasks
- [ ] Users can mark tasks complete/incomplete
- [ ] Users can filter tasks (all/pending/completed)
- [ ] Data persists after refresh
- [ ] Each user sees only their own tasks

### Technical
- [ ] Next.js 16+ with App Router
- [ ] FastAPI backend with SQLModel
- [ ] Better Auth JWT authentication
- [ ] Neon PostgreSQL database
- [ ] Responsive design (mobile + desktop)
- [ ] REST API with proper status codes
- [ ] Error handling on all endpoints
- [ ] Input validation (frontend + backend)
- [ ] HTTPS in production
- [ ] Environment variables for secrets

### Quality
- [ ] Code follows style guides
- [ ] Type safety (TypeScript + Python type hints)
- [ ] No console errors
- [ ] API responses < 200ms
- [ ] Page load < 3 seconds
- [ ] Mobile-friendly (44px+ touch targets)
- [ ] Accessible (WCAG AA)

---

## 🚀 Deployment

### Frontend
- Platform: Vercel
- Build: `npm run build`
- Auto-deploy: Push to main branch

### Backend
- Platform: Railway or Render
- Runtime: Python 3.13+
- Start: `uvicorn main:app`

### Database
- Platform: Neon Serverless PostgreSQL
- Connection: Environment variable `DATABASE_URL`
- Migrations: SQLModel auto-create or Alembic

---

## 📦 Deliverables

1. **GitHub Repository** - All source code
2. **Deployed Frontend** - Vercel URL
3. **Deployed Backend** - Railway/Render URL
4. **Database** - Neon instance
5. **Demo Video** - 90 seconds max
6. **Documentation** - README, setup instructions

---

## 🎓 Learning Outcomes

- Full-stack development (Next.js + FastAPI)
- RESTful API design
- Database modeling with relationships
- JWT authentication & authorization
- ORM usage (SQLModel)
- Modern frontend (App Router, Server Components)
- Responsive design
- Security practices
- Cloud deployment

---

**Specification Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Complete and Ready for Implementation
