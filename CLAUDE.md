# CLAUDE.md - Root Instructions for AI Assistant

> **Project:** Evolution of Todo - Phase II
> **Type:** Full-Stack Web Application (Monorepo)
> **Methodology:** Spec-Kit Plus Principles + Spec-Driven Development
> **Hackathon:** Panaversity Hackathon II

---

## 🎯 Mission Statement

You are the Senior System Architect and Full-Stack Developer for the "Evolution of Todo" project. Your role is to build a production-ready, multi-user web application following strict spec-driven development principles.

**Core Principle:** SPECIFICATION BEFORE IMPLEMENTATION
- Never write code without a corresponding specification
- Always validate implementation against acceptance criteria
- Maintain consistency between specs and code across frontend and backend

---

## 📋 Phase II: Full-Stack Web Application

### Current Phase Overview

**Phase II Objectives:**
- Transform Phase I console app into modern web application
- Implement multi-user authentication
- Add persistent storage (Neon PostgreSQL)
- Build responsive frontend (Next.js 16+)
- Create RESTful API (FastAPI)

**Points:** 150 (of 1,000 total)
**Due Date:** December 14, 2025

### Technology Stack

```yaml
Frontend:
  Framework: Next.js 16+ (App Router)
  Language: TypeScript
  Styling: Tailwind CSS
  Auth: Better Auth
  UI: shadcn/ui components

Backend:
  Framework: FastAPI
  Language: Python 3.13+
  ORM: SQLModel
  Database: Neon Serverless PostgreSQL
  Auth: JWT (Better Auth tokens)

Development:
  Monorepo: Single repository
  Package Managers: npm (frontend), pip (backend)
  Spec Management: Spec-Kit Plus
  AI Assistant: Claude Code
```

### Core Features (Phase II)

All Basic Level features from Phase I, plus:
1. **User Authentication** - Signup, login, logout via Better Auth
2. **Multi-User Support** - Each user has isolated task list
3. **Persistent Storage** - Tasks saved in PostgreSQL database
4. **Responsive Web UI** - Works on mobile, tablet, desktop
5. **RESTful API** - Clean HTTP endpoints for all operations

---

## 🏗️ Monorepo Structure

```
hackathon-2-phase-1/
├── .spec-kit/                # Spec-Kit configuration
│   └── config.yaml
├── specs/                    # Organized specifications
│   ├── overview.md
│   ├── architecture.md
│   ├── features/
│   │   ├── task-crud.md
│   │   └── authentication.md
│   ├── api/
│   │   └── rest-endpoints.md
│   ├── database/
│   │   └── schema.md
│   └── ui/
│       ├── components.md
│       └── pages.md
├── frontend/                 # Next.js application
│   ├── CLAUDE.md             # Frontend-specific instructions
│   ├── app/                  # App Router pages
│   ├── components/           # React components
│   ├── lib/                  # Utilities (API client, auth)
│   ├── types/                # TypeScript types
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
├── backend/                  # FastAPI application
│   ├── CLAUDE.md             # Backend-specific instructions
│   ├── main.py               # FastAPI app entry
│   ├── models.py             # SQLModel database models
│   ├── database.py           # DB connection
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, CORS
│   ├── schemas/              # Pydantic schemas
│   ├── config.py             # Configuration
│   └── requirements.txt
├── phase-1-archive/          # Phase I console app (archived)
│   └── src/
├── CLAUDE.md                 # This file (root instructions)
├── HACKATHON_CONSTITUTION.md # Complete 5-phase constitution
├── README.md                 # Project documentation
├── docker-compose.yml        # Local development setup
└── .gitignore
```

---

## 📚 Spec-Kit Organization

### Specification Structure

Specs are organized by type for clarity:

**Feature Specs** (`specs/features/`)
- What to build (user stories, acceptance criteria)
- Example: `task-crud.md`, `authentication.md`

**API Specs** (`specs/api/`)
- How APIs should work (endpoints, request/response)
- Example: `rest-endpoints.md`

**Database Specs** (`specs/database/`)
- Data models and schema
- Example: `schema.md`

**UI Specs** (`specs/ui/`)
- Component structure and page layouts
- Example: `components.md`, `pages.md`

### Referencing Specs

When Claude Code implements features:

```bash
# Implement a feature
@specs/features/task-crud.md implement create task endpoint

# Implement API
@specs/api/rest-endpoints.md implement GET /api/{user_id}/tasks

# Update database
@specs/database/schema.md add completed column to tasks

# Implement UI
@specs/ui/components.md create TaskList component
```

---

## 🔄 Development Workflow

### 1. Read Relevant Specs

Before any implementation:
- Feature spec: `@specs/features/[feature-name].md`
- API spec: `@specs/api/rest-endpoints.md`
- Database spec: `@specs/database/schema.md`
- UI spec (if frontend): `@specs/ui/[component].md`

### 2. Understand Context

- Root CLAUDE.md (this file) - Project overview
- Layer-specific CLAUDE.md:
  - `@frontend/CLAUDE.md` for frontend work
  - `@backend/CLAUDE.md` for backend work

### 3. Implement Feature

**Backend Flow:**
1. Create/update database model in `backend/models.py`
2. Create Pydantic schemas in `backend/schemas/`
3. Implement route in `backend/routes/`
4. Add authentication middleware if needed
5. Test with curl or Postman

**Frontend Flow:**
1. Define TypeScript types in `frontend/types/`
2. Create API client methods in `frontend/lib/api.ts`
3. Build React components in `frontend/components/`
4. Create pages in `frontend/app/`
5. Test in browser

### 4. Validate Against Spec

Check that implementation meets all acceptance criteria in the spec.

### 5. Update Specs If Needed

If requirements change during implementation, update specs BEFORE changing code.

---

## 🔐 Authentication Flow

### How It Works

1. **User Signup/Login** (Frontend)
   - User submits credentials via Better Auth
   - Better Auth creates session and issues JWT token

2. **API Requests** (Frontend → Backend)
   - Frontend includes JWT in header: `Authorization: Bearer <token>`
   - Backend receives request with token

3. **Token Verification** (Backend)
   - Extract token from `Authorization` header
   - Verify signature using `BETTER_AUTH_SECRET`
   - Decode token to get `user_id`, `email`

4. **User Isolation** (Backend)
   - Match URL `user_id` with token `user_id`
   - Filter all database queries by authenticated user
   - Return `403 Forbidden` if user_id mismatch

### Security Requirements

✅ All `/api/{user_id}/*` endpoints require valid JWT
✅ Requests without token receive `401 Unauthorized`
✅ Each user only sees/modifies their own data
✅ Token expiry enforced (7 days default)

---

## 🗄️ Database Schema

### Users Table (Managed by Better Auth)

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

---

## 🛣️ API Endpoints

All endpoints under `/api/{user_id}/tasks`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{user_id}/tasks` | List all tasks for user |
| POST | `/api/{user_id}/tasks` | Create new task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion |

**Authentication:** Required for all endpoints (JWT in `Authorization` header)

---

## 🎨 Frontend Patterns

### Component Organization

```
components/
├── ui/              # shadcn/ui primitives (Button, Input, etc.)
├── TaskList.tsx     # List of tasks
├── TaskItem.tsx     # Single task display
├── CreateTaskForm.tsx  # Form to create task
├── Header.tsx       # App header with nav
└── Footer.tsx       # App footer
```

### Page Structure

```
app/
├── layout.tsx       # Root layout (header, footer)
├── page.tsx         # Landing page
├── (auth)/          # Auth routes group
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
└── dashboard/       # Protected routes
    ├── layout.tsx   # Dashboard layout (auth check)
    └── page.tsx     # Main dashboard
```

### State Management

Use React Hooks for local state:
- `useState` for component state
- `useEffect` for side effects (data fetching)
- `useSession` (Better Auth) for auth state

---

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # Runs on port 3000
```

**Both (with docker-compose):**
```bash
docker-compose up
```

### Environment Setup

**Backend `.env`:**
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
BETTER_AUTH_SECRET=your-secret-key
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

---

## 🧪 Testing Strategy

### Manual Testing

1. **Backend API** - Use curl or Postman
   ```bash
   curl -H "Authorization: Bearer <token>" \
        http://localhost:8000/api/user123/tasks
   ```

2. **Frontend** - Test in browser
   - Chrome DevTools → Network tab to inspect API calls
   - Test auth flow (signup → login → dashboard)
   - Test CRUD operations (create → read → update → delete)

### Automated Testing (Phase IV+)

- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

---

## 📋 Development Checklist

Before considering Phase II complete:

**Backend:**
- [ ] All 6 REST endpoints implemented
- [ ] JWT authentication working
- [ ] Database models created
- [ ] Migrations run on Neon
- [ ] CORS configured for frontend
- [ ] Error handling comprehensive

**Frontend:**
- [ ] User signup/login functional
- [ ] Dashboard displays tasks
- [ ] Create, update, delete working
- [ ] Toggle completion functional
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error messages displayed

**Integration:**
- [ ] Frontend successfully calls backend API
- [ ] JWT tokens passed correctly
- [ ] User isolation verified (can't see others' tasks)
- [ ] Data persists after page reload

**Deployment:**
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway, Render, or similar)
- [ ] Neon database accessible
- [ ] HTTPS enabled in production

---

## 🎯 Phase II Success Criteria

**Functional Requirements:**
✅ Users can sign up and log in
✅ Users can create, read, update, delete tasks
✅ Users can mark tasks complete/incomplete
✅ Data persists in database
✅ Each user sees only their own tasks

**Technical Requirements:**
✅ Next.js 16+ with App Router
✅ FastAPI backend with SQLModel
✅ Better Auth JWT authentication
✅ Neon PostgreSQL database
✅ Responsive UI (Tailwind CSS)
✅ RESTful API following spec

**Submission Requirements:**
✅ Public GitHub repository
✅ Vercel deployment URL (frontend)
✅ Backend API URL
✅ Demo video (< 90 seconds)
✅ README with setup instructions

---

## 📖 Key Documentation

| Document | Purpose |
|----------|---------|
| `HACKATHON_CONSTITUTION.md` | Complete 5-phase constitution |
| `README.md` | Project overview and setup |
| `frontend/CLAUDE.md` | Frontend-specific guidelines |
| `backend/CLAUDE.md` | Backend-specific guidelines |
| `/specs/` | Feature specifications |

---

## 🔍 Troubleshooting

### Common Issues

**CORS Errors:**
- Solution: Add frontend URL to `ALLOWED_ORIGINS` in backend `.env`

**401 Unauthorized:**
- Check JWT token format: `Bearer <token>`
- Verify `BETTER_AUTH_SECRET` matches in frontend and backend

**Database Connection Fails:**
- Verify `DATABASE_URL` in backend `.env`
- Check Neon database is active and accessible

**Frontend can't reach backend:**
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check backend is running on correct port (8000)

---

## 🌟 Best Practices

### Code Quality

1. **Type Safety** - 100% type coverage (TypeScript in frontend, type hints in backend)
2. **Error Handling** - Comprehensive try/catch, validation
3. **Documentation** - Clear comments, docstrings
4. **Separation of Concerns** - UI, logic, data layers distinct
5. **DRY Principle** - No code duplication

### Security

1. **Input Validation** - Sanitize all user inputs
2. **Authentication** - JWT tokens required for all endpoints
3. **Authorization** - Users can only access their own data
4. **Secrets Management** - Use environment variables, never commit secrets
5. **HTTPS** - Enforce in production

### Performance

1. **Database Queries** - Use indexes, avoid N+1 queries
2. **API Response Time** - < 200ms for CRUD operations
3. **Frontend Loading** - Show loading states, skeleton screens
4. **Caching** - Cache static assets, API responses (Phase III+)

---

## 🚀 Next Steps (Phase III)

After Phase II completion, next phase will add:
- **AI Chatbot** - Natural language task management
- **OpenAI ChatKit** - Conversational UI
- **MCP Server** - Tool-based agent architecture
- **Advanced Features** - Smart task suggestions

**Phase III Due:** December 21, 2025 (200 points)

---

## 📚 Resources

### Official Documentation

- **Next.js:** https://nextjs.org/docs
- **FastAPI:** https://fastapi.tiangolo.com
- **SQLModel:** https://sqlmodel.tiangolo.com
- **Better Auth:** https://www.better-auth.com/docs
- **Neon:** https://neon.tech/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Hackathon Resources

- **Constitution:** `HACKATHON_CONSTITUTION.md`
- **Submission Form:** https://forms.gle/KMKEKaFUD6ZX4UtY8
- **Zoom Presentations:** Sundays 8 PM

---

## 🎯 Remember

**The Nine Pillars of AI-Driven Development:**

1. 🏛️ **Specification Supremacy** - Specs before code
2. 🤖 **AI-Native Development** - Claude Code as primary developer
3. 🏗️ **Architectural Thinking** - System design over syntax
4. 📐 **Progressive Evolution** - Iterate from simple to complex
5. ☁️ **Cloud-Native Mindset** - Build for distributed systems
6. 🔄 **Event-Driven Architecture** - Loose coupling via events
7. 🧠 **Reusable Intelligence** - Agents, skills, blueprints
8. 🔒 **Security First** - Auth, validation, secrets management
9. 📊 **Observable Systems** - Logging, metrics, tracing

---

**Master the architecture. Command the intelligence. Build the future.**

🚀 **One Spec at a Time. One Phase at a Time.**

---

*Last Updated: Phase II Transition - December 9, 2025*
*Hackathon II: The Evolution of Todo - Panaversity*
