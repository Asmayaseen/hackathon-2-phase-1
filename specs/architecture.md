# System Architecture Specification

> **Phase:** II - Full-Stack Web Application
> **Architecture Style:** Monorepo + Client-Server + RESTful
> **Status:** ✅ Active

---

## 🏗️ High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       CLIENT LAYER                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Web Browser (Chrome, Safari, etc.)         │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │      Next.js 16+ Application                 │ │     │
│  │  │  - React Components (TSX)                    │ │     │
│  │  │  - Better Auth Client                        │ │     │
│  │  │  - API Client (fetch)                        │ │     │
│  │  │  - Tailwind CSS                              │ │     │
│  │  │  - TypeScript                                │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTPS/REST API
                       │ Authorization: Bearer <JWT>
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                       SERVER LAYER                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │         FastAPI Application (Python 3.13+)         │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │  Middleware Layer                            │ │     │
│  │  │  - CORS                                      │ │     │
│  │  │  - JWT Verification                          │ │     │
│  │  │  - Request Logging                           │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │  Route Handlers                              │ │     │
│  │  │  - /api/{user_id}/tasks (CRUD)              │ │     │
│  │  │  - /health (Health Check)                    │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │  Business Logic Layer                        │ │     │
│  │  │  - Task CRUD Operations                      │ │     │
│  │  │  - Input Validation                          │ │     │
│  │  │  - Authorization Checks                      │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  │                                                     │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │  Data Access Layer (SQLModel ORM)            │ │     │
│  │  │  - Database Models                           │ │     │
│  │  │  - Query Builder                             │ │     │
│  │  │  - Transaction Management                    │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ SQL Queries (TCP/IP)
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                    DATABASE LAYER                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │      Neon Serverless PostgreSQL (Cloud)            │     │
│  │                                                     │     │
│  │  Tables:                                           │     │
│  │  - users (managed by Better Auth)                 │     │
│  │  - tasks (application data)                       │     │
│  │                                                     │     │
│  │  Indexes:                                          │     │
│  │  - idx_tasks_user_id                              │     │
│  │  - idx_tasks_completed                            │     │
│  │  - idx_tasks_created_at                           │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 📦 Component Breakdown

### Frontend Components

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (global)
│   ├── page.tsx                  # Landing page
│   ├── (auth)/                   # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── signup/
│   │       └── page.tsx          # Signup page
│   ├── dashboard/                # Protected routes
│   │   ├── layout.tsx            # Dashboard layout
│   │   └── page.tsx              # Main dashboard
│   └── api/                      # Better Auth API routes
│       └── auth/[...all]/
│           └── route.ts          # Better Auth handler
│
├── components/                   # React Components
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── checkbox.tsx
│   │   └── ...
│   ├── TaskList.tsx              # Task list container
│   ├── TaskItem.tsx              # Individual task
│   ├── CreateTaskForm.tsx        # New task form
│   ├── Header.tsx                # App header
│   └── Footer.tsx                # App footer
│
├── lib/                          # Utilities
│   ├── api.ts                    # API client
│   ├── auth.ts                   # Better Auth config
│   ├── auth-client.ts            # Client-side auth
│   └── utils.ts                  # Helper functions
│
└── types/                        # TypeScript types
    └── task.ts                   # Task interfaces
```

### Backend Components

```
backend/
├── main.py                       # FastAPI app entry
│   ├── App initialization
│   ├── CORS middleware
│   ├── Route registration
│   └── Error handlers
│
├── database.py                   # Database connection
│   ├── Engine creation
│   ├── Session management
│   └── get_db() dependency
│
├── models.py                     # SQLModel models
│   ├── Task model
│   └── (User model reference)
│
├── routes/                       # API endpoints
│   ├── __init__.py
│   ├── tasks.py                  # Task CRUD endpoints
│   └── health.py                 # Health check
│
├── middleware/                   # Middleware
│   ├── __init__.py
│   └── auth.py                   # JWT verification
│
├── schemas/                      # Pydantic schemas
│   ├── __init__.py
│   └── task.py                   # Request/response schemas
│
└── config.py                     # Configuration
    ├── Environment variables
    ├── Settings class
    └── Constants
```

---

## 🔄 Data Flow

### 1. User Authentication Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Submit email/password
     ▼
┌─────────────────┐
│  Better Auth    │
│  (Frontend)     │
└────┬────────────┘
     │ 2. POST /api/auth/signin
     ▼
┌─────────────────┐
│  Better Auth    │
│  (Backend)      │
│  - Verify creds │
│  - Hash password│
└────┬────────────┘
     │ 3. Query users table
     ▼
┌─────────────────┐
│  PostgreSQL     │
│  users table    │
└────┬────────────┘
     │ 4. User found & password matches
     ▼
┌─────────────────┐
│  Better Auth    │
│  - Generate JWT │
│  - Set expiry   │
└────┬────────────┘
     │ 5. Return JWT token
     ▼
┌─────────────────┐
│  Frontend       │
│  - Store token  │
│  - Redirect     │
└─────────────────┘
```

### 2. Task Creation Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Fill form, click "Create Task"
     ▼
┌─────────────────┐
│  React Form     │
│  - Validate     │
│  - Disable btn  │
└────┬────────────┘
     │ 2. Call API client
     ▼
┌─────────────────┐
│  lib/api.ts     │
│  createTask()   │
└────┬────────────┘
     │ 3. POST /api/{user_id}/tasks
     │    Header: Authorization: Bearer <JWT>
     │    Body: {title, description}
     ▼
┌─────────────────┐
│  FastAPI        │
│  Middleware     │
│  - Extract JWT  │
│  - Verify sig   │
│  - Decode       │
└────┬────────────┘
     │ 4. JWT valid → Extract user_id
     ▼
┌─────────────────┐
│  Route Handler  │
│  - Validate URL │
│    user_id ==   │
│    token user_id│
└────┬────────────┘
     │ 5. Authorized → Create task
     ▼
┌─────────────────┐
│  Business Logic │
│  - Validate     │
│  - Create Task  │
│    model        │
└────┬────────────┘
     │ 6. db.add(task); db.commit()
     ▼
┌─────────────────┐
│  PostgreSQL     │
│  INSERT INTO    │
│  tasks          │
└────┬────────────┘
     │ 7. Return created task
     ▼
┌─────────────────┐
│  FastAPI        │
│  Response       │
│  201 Created    │
└────┬────────────┘
     │ 8. JSON response
     ▼
┌─────────────────┐
│  Frontend       │
│  - Update UI    │
│  - Show success │
│  - Reset form   │
└─────────────────┘
```

### 3. Task List Retrieval Flow

```
User clicks "Dashboard"
       ↓
Frontend: GET /api/{user_id}/tasks
Header: Authorization: Bearer <JWT>
       ↓
Backend: Verify JWT → Extract user_id
       ↓
Validate: URL user_id == Token user_id
       ↓
Database: SELECT * FROM tasks WHERE user_id = ?
       ↓
Backend: Return JSON array of tasks
       ↓
Frontend: Render TaskList component
       ↓
User sees their tasks
```

---

## 🔐 Security Architecture

### Authentication Layer

```
Request Flow with Security:

1. Client makes request
   ├─ No JWT? → 401 Unauthorized
   └─ Has JWT? → Continue

2. Extract JWT from header
   ├─ Invalid format? → 401 Unauthorized
   └─ Valid format? → Continue

3. Verify JWT signature
   ├─ Invalid signature? → 401 Unauthorized
   ├─ Expired? → 401 Unauthorized
   └─ Valid? → Continue

4. Decode JWT payload
   ├─ Missing user_id? → 401 Unauthorized
   └─ Has user_id? → Continue

5. Check authorization
   ├─ URL user_id ≠ Token user_id? → 403 Forbidden
   └─ Match? → Continue

6. Execute business logic
   ├─ Filter by user_id
   └─ Return user's data only
```

### Data Isolation

Every database query MUST include user_id filter:

```sql
-- ✅ CORRECT: User-scoped query
SELECT * FROM tasks WHERE user_id = 'authenticated_user_id';

-- ❌ WRONG: Global query
SELECT * FROM tasks;
```

---

## 📊 Deployment Architecture

### Development Environment

```
┌───────────────────────────────────────────┐
│  Local Machine                            │
│                                           │
│  ┌─────────────┐      ┌────────────────┐│
│  │  Frontend   │      │    Backend     ││
│  │ localhost:  │◀────▶│  localhost:    ││
│  │   3000      │ REST │     8000       ││
│  └─────────────┘      └────────┬───────┘│
│                                 │        │
└─────────────────────────────────┼────────┘
                                  │ SQL
                                  ▼
                    ┌──────────────────────┐
                    │   Neon PostgreSQL    │
                    │   (Cloud Database)   │
                    └──────────────────────┘
```

### Production Environment

```
┌───────────────────────────────────────────┐
│  Vercel Edge Network                      │
│  (Frontend Deployment)                    │
│  ┌─────────────────────────────────────┐ │
│  │  Next.js Application                │ │
│  │  - Static pages                     │ │
│  │  - Server components                │ │
│  │  - API routes (Better Auth)         │ │
│  └─────────────────┬───────────────────┘ │
└────────────────────┼─────────────────────┘
                     │ HTTPS/REST
                     ▼
┌───────────────────────────────────────────┐
│  Railway/Render (Backend Deployment)      │
│  ┌─────────────────────────────────────┐ │
│  │  FastAPI Application                │ │
│  │  - Docker container                 │ │
│  │  - Auto-scaling                     │ │
│  │  - Health checks                    │ │
│  └─────────────────┬───────────────────┘ │
└────────────────────┼─────────────────────┘
                     │ SQL
                     ▼
┌───────────────────────────────────────────┐
│  Neon PostgreSQL (Cloud Database)         │
│  - Serverless                             │
│  - Auto-scaling                           │
│  - Automatic backups                      │
│  - Point-in-time recovery                 │
└───────────────────────────────────────────┘
```

---

## 🎯 Design Patterns

### 1. Repository Pattern (Data Access)

```python
# backend/repositories/task_repository.py
class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_tasks(self, user_id: str) -> list[Task]:
        return self.db.query(Task).filter(Task.user_id == user_id).all()

    def create(self, user_id: str, task_data: TaskCreate) -> Task:
        task = Task(user_id=user_id, **task_data.dict())
        self.db.add(task)
        self.db.commit()
        return task
```

### 2. Dependency Injection (FastAPI)

```python
# backend/main.py
from fastapi import Depends

def get_db():
    with Session(engine) as session:
        yield session

@app.get("/api/{user_id}/tasks")
def list_tasks(
    user_id: str,
    db: Session = Depends(get_db),  # Injected
    token: dict = Depends(verify_jwt)  # Injected
):
    return get_user_tasks(db, user_id)
```

### 3. Middleware Pattern (Authentication)

```python
# backend/middleware/auth.py
async def verify_jwt(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Missing token")
    token = authorization.replace("Bearer ", "")
    payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    return payload
```

### 4. Component Composition (React)

```tsx
// frontend/app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div>
      <Header />
      <CreateTaskForm onSubmit={handleCreate} />
      <TaskList tasks={tasks} onToggle={handleToggle} />
      <Footer />
    </div>
  )
}
```

---

## 📈 Scalability Considerations

### Current Design (Phase II)
- **Users:** 100-1,000
- **Tasks:** ~100,000
- **Requests:** ~1,000/day
- **Database:** Single instance (Neon)
- **Backend:** Single instance

### Future Optimizations (Phase III+)
- **Load Balancer:** Multiple backend instances
- **Caching:** Redis for session/API cache
- **CDN:** CloudFront/Cloudflare for static assets
- **Database:** Read replicas
- **Message Queue:** For async operations

---

## 🔗 API Versioning Strategy

```
Current: /api/{user_id}/tasks
Future:  /api/v2/{user_id}/tasks

Approach: URL-based versioning
```

---

**Architecture Version:** 2.0
**Last Updated:** December 9, 2025
**Status:** ✅ Active Implementation
