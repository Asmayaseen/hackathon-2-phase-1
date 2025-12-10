# Project Overview - Evolution of Todo Phase II

> **Hackathon:** Panaversity Hackathon II
> **Phase:** II - Full-Stack Web Application
> **Points:** 150 (of 1,000 total)
> **Due Date:** December 14, 2025
> **Status:** 🚧 In Development

---

## 🎯 Project Mission

Transform the Phase I console todo application into a production-ready, multi-user web application with persistent storage, authentication, and a modern responsive interface.

---

## 📋 Phase II Objectives

### Primary Goals

1. **Multi-User Support** - Multiple users can have separate task lists
2. **Web Interface** - Modern, responsive UI accessible from any device
3. **Persistent Storage** - Data saved in cloud database (Neon PostgreSQL)
4. **User Authentication** - Secure signup/login with Better Auth
5. **RESTful API** - Clean HTTP endpoints for all operations

### Success Metrics

| Metric | Target |
|--------|--------|
| User Registration | < 30 seconds |
| Task Creation | < 2 seconds |
| Page Load Time | < 3 seconds |
| Mobile Responsive | 100% |
| API Response Time | < 200ms (p95) |
| Security Score | A+ (OWASP) |

---

## 🏗️ Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Web Browser                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (Port 3000)            │   │
│  │  - React Components                              │   │
│  │  - Better Auth (Session Management)             │   │
│  │  - Tailwind CSS Styling                         │   │
│  └─────────────────┬───────────────────────────────┘   │
└────────────────────┼───────────────────────────────────┘
                     │ HTTPS/REST API
                     │ JWT Token in Header
                     ▼
┌─────────────────────────────────────────────────────────┐
│         FastAPI Backend (Port 8000)                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │  - JWT Verification                              │   │
│  │  - RESTful Endpoints                             │   │
│  │  - SQLModel ORM                                  │   │
│  │  - Business Logic                                │   │
│  └─────────────────┬───────────────────────────────┘   │
└────────────────────┼───────────────────────────────────┘
                     │ SQL Queries
                     ▼
┌─────────────────────────────────────────────────────────┐
│       Neon Serverless PostgreSQL (Cloud)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Tables: users, tasks                            │   │
│  │  Indexes: user_id, completed, created_at        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Framework: Next.js 16+ (App Router)
- Language: TypeScript 5.0+
- Styling: Tailwind CSS 3.4+
- Auth: Better Auth
- UI Components: shadcn/ui

**Backend:**
- Framework: FastAPI (Python 3.13+)
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Auth: JWT verification
- Validation: Pydantic v2

**Development:**
- Monorepo: Single repository
- Package Managers: npm (frontend), pip (backend)
- Version Control: Git + GitHub
- AI Assistant: Claude Code
- Methodology: Spec-Driven Development

---

## ✨ Core Features (Phase II)

### Basic CRUD Operations (From Phase I)

1. **Add Task**
   - User can create new task with title and description
   - Title required (1-200 chars), description optional (max 1000 chars)
   - Task automatically linked to authenticated user

2. **View Tasks**
   - Display all user's tasks in list format
   - Show title, status (complete/pending), creation date
   - Filter by status: all, pending, completed
   - Sort by: creation date, title, last updated

3. **Update Task**
   - Modify task title or description
   - Changes saved immediately to database
   - Updated timestamp tracked

4. **Delete Task**
   - Remove task permanently from database
   - Confirmation required (UI)
   - Cascade: No orphaned data

5. **Mark Complete/Incomplete**
   - Toggle task completion status
   - Visual indicator changes (✓/✗)
   - Updated timestamp tracked

### New Features (Phase II)

6. **User Authentication**
   - Sign up with email and password
   - Sign in with existing credentials
   - Sign out (clear session)
   - Password hashing (bcrypt)
   - Email validation

7. **User Isolation**
   - Each user sees only their own tasks
   - JWT token verification on every request
   - User ID embedded in token
   - Strict authorization checks

8. **Persistent Storage**
   - All data saved in PostgreSQL
   - Survives server restarts
   - Automatic timestamps
   - Foreign key integrity

9. **Responsive UI**
   - Works on mobile (320px+)
   - Works on tablet (768px+)
   - Works on desktop (1024px+)
   - Touch-friendly controls

10. **Real-time Feedback**
    - Loading states for async operations
    - Success/error messages
    - Form validation
    - Optimistic UI updates

---

## 🔐 Security Model

### Authentication Flow

```
1. User Sign Up
   ↓
   Better Auth creates account → users table
   ↓
   Password hashed (bcrypt)
   ↓
   User record created

2. User Sign In
   ↓
   Better Auth verifies credentials
   ↓
   JWT token issued (7-day expiry)
   ↓
   Token stored in session/cookie

3. API Request
   ↓
   Frontend includes JWT in header
   ↓
   Backend extracts & verifies token
   ↓
   Decode token → extract user_id
   ↓
   Validate user_id matches request
   ↓
   Execute query with user_id filter
   ↓
   Return response
```

### Security Requirements

✅ **Authentication:**
- All API endpoints (except health check) require valid JWT
- Passwords hashed with bcrypt
- JWT signed with `BETTER_AUTH_SECRET`
- Token expiry enforced (7 days default)

✅ **Authorization:**
- Users can only access their own data
- URL user_id must match token user_id
- All database queries filtered by user_id

✅ **Input Validation:**
- Title: 1-200 characters, no HTML
- Description: max 1000 characters
- Email: valid format
- Password: min 8 characters

✅ **Data Protection:**
- HTTPS in production
- Secrets in environment variables
- SQL injection prevention (ORM)
- XSS prevention (React escaping)

---

## 📊 Database Schema (Summary)

### Tables

**users** (Managed by Better Auth)
```
id (TEXT, PK)
email (TEXT, UNIQUE)
name (TEXT)
password_hash (TEXT)
created_at (TIMESTAMP)
```

**tasks** (Application Data)
```
id (SERIAL, PK)
user_id (TEXT, FK → users.id)
title (TEXT, NOT NULL)
description (TEXT, NULL)
completed (BOOLEAN, DEFAULT false)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Relationships

- 1 User : N Tasks (one-to-many)
- Cascade delete: Delete user → delete all tasks

---

## 🛣️ API Endpoints (Summary)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check (no auth) |
| GET | `/api/{user_id}/tasks` | List all tasks |
| POST | `/api/{user_id}/tasks` | Create task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion |

All endpoints (except `/health`) require:
- Header: `Authorization: Bearer <jwt_token>`
- User ID in URL must match token user ID

---

## 🎨 UI/UX Design Principles

### Design Goals

1. **Simplicity** - Clean, uncluttered interface
2. **Speed** - Fast load times, instant feedback
3. **Accessibility** - Keyboard navigation, ARIA labels
4. **Responsiveness** - Mobile-first design
5. **Consistency** - Uniform colors, spacing, typography

### Color Palette

```css
Primary: #18181b (dark gray)
Secondary: #f4f4f5 (light gray)
Success: #22c55e (green)
Error: #ef4444 (red)
Warning: #f59e0b (amber)
Info: #3b82f6 (blue)
```

### Key Screens

1. **Landing Page** - Hero section, CTA buttons
2. **Sign Up** - Email, password, name fields
3. **Sign In** - Email, password fields
4. **Dashboard** - Task list, create form, filters
5. **Task Details** - Full task view (future)

---

## 📦 Deliverables

### Required Submissions

1. **GitHub Repository**
   - Public repository
   - All source code (frontend + backend)
   - Comprehensive README
   - Spec files in `/specs`
   - Git history showing incremental development

2. **Deployed Applications**
   - Frontend: Vercel URL
   - Backend: Railway/Render/etc URL
   - Both accessible via HTTPS

3. **Database**
   - Neon PostgreSQL instance
   - Tables created
   - Indexes applied
   - Connection string secured

4. **Demo Video**
   - Maximum 90 seconds
   - Show signup → login → CRUD operations
   - Demonstrate mobile responsiveness
   - Highlight key features

5. **Documentation**
   - README with setup instructions
   - API documentation
   - Environment variables guide
   - Testing instructions

---

## 🎯 Acceptance Criteria

### Functional Requirements

- [ ] Users can sign up with email/password
- [ ] Users can sign in and get authenticated
- [ ] Users can create tasks
- [ ] Users can view all their tasks
- [ ] Users can update task title/description
- [ ] Users can delete tasks
- [ ] Users can mark tasks complete/incomplete
- [ ] Users can filter tasks (all/pending/completed)
- [ ] Data persists after browser refresh
- [ ] Each user sees only their own tasks

### Technical Requirements

- [ ] Next.js 16+ with App Router
- [ ] FastAPI backend with SQLModel
- [ ] Better Auth JWT authentication
- [ ] Neon PostgreSQL database
- [ ] Responsive design (mobile + desktop)
- [ ] REST API following OpenAPI spec
- [ ] Error handling on all endpoints
- [ ] Input validation (frontend + backend)
- [ ] HTTPS in production
- [ ] Environment variables for secrets

### Quality Requirements

- [ ] Code follows style guides (PEP 8, ESLint)
- [ ] Type safety (TypeScript, Python type hints)
- [ ] No console errors in browser
- [ ] API responses < 200ms
- [ ] Page load < 3 seconds
- [ ] Mobile-friendly (touch targets 44px+)
- [ ] Accessible (WCAG AA)

---

## 🚀 Development Milestones

### Week 1: Foundation (Dec 2-8)
- [x] Phase I console app completed
- [x] Phase II constitution written
- [x] Monorepo structure created
- [x] Specs written

### Week 2: Implementation (Dec 9-14)
- [ ] Backend API implemented
- [ ] Frontend UI built
- [ ] Authentication integrated
- [ ] Database connected
- [ ] Local testing complete

### Week 3: Deployment (Dec 13-14)
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed
- [ ] Database migrations run
- [ ] Demo video recorded
- [ ] Final submission

---

## 📊 Project Metrics

### Code Statistics (Target)

| Metric | Target |
|--------|--------|
| Total Files | ~50 files |
| Frontend LOC | ~2,000 lines |
| Backend LOC | ~1,500 lines |
| Spec Files | ~3,000 lines |
| Total LOC | ~15,000+ lines |

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | 90+ |
| API Latency (p95) | < 200ms |
| Database Queries | < 50ms |
| Bundle Size | < 500 KB |
| Time to Interactive | < 3s |

---

## 🔗 Related Documents

| Document | Purpose |
|----------|---------|
| `HACKATHON_CONSTITUTION.md` | Complete 5-phase constitution |
| `CLAUDE.md` | Root AI assistant instructions |
| `frontend/CLAUDE.md` | Frontend development guide |
| `backend/CLAUDE.md` | Backend development guide |
| `specs/database/schema.md` | Database schema specification |
| `specs/api/rest-endpoints.md` | API endpoints specification |
| `specs/features/task-crud.md` | Task CRUD feature spec |
| `specs/features/authentication.md` | Authentication feature spec |
| `specs/ui/components.md` | UI components specification |
| `specs/ui/pages.md` | Page layouts specification |

---

## 🎓 Learning Outcomes

By completing Phase II, participants will master:

1. **Full-Stack Development** - Connect frontend to backend
2. **RESTful API Design** - Create well-structured endpoints
3. **Database Modeling** - Design schemas with relationships
4. **Authentication** - Implement secure user authentication
5. **ORM Usage** - Use SQLModel for database operations
6. **Modern Frontend** - Build with Next.js 16+ App Router
7. **Responsive Design** - Create mobile-first interfaces
8. **Security Practices** - Implement JWT, input validation
9. **Cloud Deployment** - Deploy to Vercel + Neon
10. **Spec-Driven Development** - Build from specifications

---

## 🏆 Success Story

**From Console to Cloud:**

Phase I → Simple Python script, in-memory storage
Phase II → Full-stack web app, cloud database, multi-user

**Key Achievements:**
- ✅ 150 points earned
- ✅ Production-ready application
- ✅ Deployed and accessible
- ✅ Modern tech stack mastered
- ✅ Portfolio project completed

---

**Project Status:** 🚧 In Active Development
**Next Milestone:** Backend API Implementation
**Expected Completion:** December 14, 2025

🚀 **Building the Future, One Spec at a Time!**
