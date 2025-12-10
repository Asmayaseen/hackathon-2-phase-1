# Evolution of Todo - Phase II

> **Hackathon:** Panaversity Hackathon II
> **Phase:** II - Full-Stack Web Application
> **Points:** 150 (of 1,000 total)
> **Status:** 🚧 Ready for Implementation

A production-ready, multi-user todo application built with Next.js 16+, FastAPI, and PostgreSQL.

---

## 🎯 Project Overview

Transform a Phase I console application into a full-stack web application with:
- ✅ Modern responsive UI (Next.js 16+ with App Router)
- ✅ RESTful API backend (FastAPI with SQLModel)
- ✅ User authentication (Better Auth with JWT)
- ✅ Cloud database (Neon Serverless PostgreSQL)
- ✅ Secure multi-user isolation

---

## 🏗️ Technology Stack

### Frontend
```
Framework:     Next.js 16+ (App Router)
Language:      TypeScript 5.0+
Styling:       Tailwind CSS 3.4+
Authentication: Better Auth
UI Components: shadcn/ui
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
Docker:        docker-compose for local development
Git:           Version control with detailed history
AI:            Claude Code (spec-driven development)
```

---

## 📁 Project Structure

```
hackathon-2-phase-1/
├── frontend/                  # Next.js application
│   ├── app/                   # App Router pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   ├── types/                 # TypeScript types
│   ├── package.json           # Dependencies
│   └── CLAUDE.md              # Frontend guidelines
│
├── backend/                   # FastAPI application
│   ├── routes/                # API endpoints
│   ├── middleware/            # JWT verification
│   ├── schemas/               # Pydantic schemas
│   ├── models.py              # Database models
│   ├── main.py                # FastAPI app
│   ├── requirements.txt       # Python dependencies
│   └── CLAUDE.md              # Backend guidelines
│
├── specs/                     # Specifications
│   ├── overview.md            # Project mission
│   ├── architecture.md        # System design
│   ├── database/schema.md     # Database schema
│   ├── api/rest-endpoints.md # API documentation
│   ├── features/              # Feature specs
│   └── ui/                    # UI specs
│
├── specs-history/             # Spec history
│   └── phase-2-fullstack/
│       ├── spec.md            # Consolidated spec
│       ├── plan.md            # Implementation plan
│       └── tasks.md           # Task breakdown
│
├── .claude/                   # Claude Code configuration
│   ├── agents/                # Subagents (4)
│   └── skills/                # Skills (10)
│
├── docker-compose.yml         # Local development
├── CLAUDE.md                  # Root AI guidelines
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.13+
- PostgreSQL (or use Neon cloud)
- Git

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/Asmayaseen/hackathon-2-phase-1.git
cd hackathon-2-phase-1

# Set environment variables
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.example backend/.env
# Edit .env files with your values

# Start all services
docker-compose up
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env with your values

# Run development server
uvicorn main:app --reload
```

---

## 🔐 Environment Variables

### Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth (must match backend)
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# Database (for Better Auth)
DATABASE_URL=postgresql://user:password@host/db
```

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@host/db

# Authentication (must match frontend)
BETTER_AUTH_SECRET=your-secret-key-min-32-chars

# CORS
ALLOWED_ORIGINS=http://localhost:3000

# Server
PORT=8000
ENVIRONMENT=development
```

**Generate Secret Key:**
```bash
openssl rand -base64 32
```

---

## 📊 Database Setup

### Using Neon (Recommended)

1. Create account at https://console.neon.tech/
2. Create new project
3. Copy connection string
4. Add to `.env` files as `DATABASE_URL`

### Using Local PostgreSQL

```bash
# Create database
createdb todo_db

# Update DATABASE_URL
DATABASE_URL=postgresql://username:password@localhost/todo_db
```

---

## 🎨 Features

### Phase II Features

- ✅ **User Authentication**
  - Sign up with email/password
  - Sign in with credentials
  - Secure JWT tokens (7-day expiry)
  - Protected routes

- ✅ **Task Management**
  - Create tasks (title + description)
  - View all user's tasks
  - Update task details
  - Delete tasks
  - Mark complete/incomplete
  - Filter by status (all/pending/completed)

- ✅ **User Isolation**
  - Each user sees only their own tasks
  - Backend enforces authorization
  - Database queries filtered by user_id

- ✅ **Responsive UI**
  - Mobile-first design
  - Works on phone, tablet, desktop
  - Touch-friendly controls

- ✅ **Real-time Feedback**
  - Loading states
  - Success/error messages
  - Form validation

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

**Authentication:** All endpoints (except `/health`) require JWT token in `Authorization: Bearer <token>` header.

**API Documentation:** http://localhost:8000/docs

---

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Test health endpoint
curl http://localhost:8000/health

# Test with JWT (replace $TOKEN)
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8000/api/user123/tasks
```

### Frontend Testing

```bash
cd frontend

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

---

## 📦 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

**Environment Variables:** Set in Vercel dashboard
- `NEXT_PUBLIC_API_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `DATABASE_URL`

### Backend (Railway/Render)

1. Create new project
2. Connect GitHub repository
3. Set root directory to `backend/`
4. Add environment variables
5. Deploy

**Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## 📚 Documentation

### For Developers

- **Frontend Guidelines:** `frontend/CLAUDE.md`
- **Backend Guidelines:** `backend/CLAUDE.md`
- **Root Guidelines:** `CLAUDE.md`

### Specifications

- **Overview:** `specs/overview.md`
- **Architecture:** `specs/architecture.md`
- **Database Schema:** `specs/database/schema.md`
- **API Endpoints:** `specs/api/rest-endpoints.md`
- **Features:** `specs/features/`
- **UI Design:** `specs/ui/`

### Implementation

- **Spec:** `specs-history/phase-2-fullstack/spec.md`
- **Plan:** `specs-history/phase-2-fullstack/plan.md`
- **Tasks:** `specs-history/phase-2-fullstack/tasks.md`

---

## 🤝 Contributing

This is a hackathon project. Development follows spec-driven methodology:

1. Read specifications in `specs/`
2. Review implementation plan in `specs-history/`
3. Follow coding guidelines in `CLAUDE.md` files
4. Commit with descriptive messages

---

## 📊 Progress

**Completed:**
- ✅ All Phase II specifications (8 files)
- ✅ Subagents and skills
- ✅ Frontend structure (Next.js 16+)
- ✅ Backend structure (FastAPI)
- ✅ Docker configuration
- ✅ Documentation

**In Progress:**
- 🚧 API endpoint implementation
- 🚧 Frontend components
- 🚧 Authentication integration

**Pending:**
- ⏳ Full CRUD operations
- ⏳ Testing
- ⏳ Deployment

---

## 🏆 Hackathon Goals

- **Phase I:** ✅ Console App (Complete)
- **Phase II:** 🚧 Full-Stack Web App (In Progress)
- **Phase III:** ⏳ AI Chatbot Integration
- **Phase IV:** ⏳ Local Kubernetes Deployment
- **Phase V:** ⏳ Cloud Production Deployment

**Total Points:** 1,000 + 600 bonus

---

## 📜 License

This project is part of Panaversity Hackathon II.

---

## 🙏 Acknowledgments

- **Hackathon:** Panaversity Hackathon II
- **AI Assistant:** Claude Code (Sonnet 4.5)
- **Methodology:** Spec-Driven Development
- **Contributors:** Human + AI pair programming

---

## 📞 Contact

**GitHub:** https://github.com/Asmayaseen/hackathon-2-phase-1
**Author:** Asma Yaseen

---

**Built with ❤️ using Next.js, FastAPI, and Claude Code**

🚀 **From Console to Cloud - The Evolution Continues!**
