
# THE EVOLUTION OF TODO - COMPLETE CONSTITUTIONAL FRAMEWORK
## Comprehensive 5-Phase Hackathon Constitution (Merged Version 4.0)

> **Document Version:** 4.0 (Merged)
> **Project:** The Evolution of Todo - Mastering Spec-Driven Development & Cloud Native AI
> **Hackathon:** Panaversity Hackathon II
> **Total Points:** 1,000 (+ 600 Bonus)
> **Timeline:** December 1, 2025 - January 18, 2026
> **Last Updated:** December 20, 2025

---

## 📜 PREAMBLE

We, the developers of "The Evolution of Todo," in order to:

- **Master spec-driven development** with Claude Code and Spec-Kit Plus
- **Build cloud-native AI systems** from first principles
- **Transform** from console apps to distributed Kubernetes deployments
- **Embrace** reusable intelligence through AI agents and skills
- **Excel** in systematic, architectural thinking

Do hereby establish this Constitution to govern the development, architecture, and deployment of all five phases of this project.

---

## 🎯 NINE PILLARS OF AI-DRIVEN DEVELOPMENT

1. 🏛️ **Specification Supremacy** - Specs before code, always
2. 🤖 **AI-Native Development** - Claude Code as primary developer
3. 🏗️ **Architectural Thinking** - System design over syntax
4. 📐 **Progressive Evolution** - Iterate from simple to complex
5. ☁️ **Cloud-Native Mindset** - Build for distributed systems
6. 🔄 **Event-Driven Architecture** - Loose coupling via events
7. 🧠 **Reusable Intelligence** - Agents, skills, blueprints
8. 🔒 **Security First** - Auth, validation, secrets management
9. 📊 **Observable Systems** - Logging, metrics, tracing

---

## 🏛️ PART I: FOUNDATIONAL ARTICLES

### Article I: Specification Supremacy

**Section 1.1 - Spec-First Mandate (NON-NEGOTIABLE)**

All code SHALL be generated from specifications. Manual coding is PROHIBITED except for:
- Emergency bug fixes with post-facto spec updates
- Configuration files (with spec documentation)
- Infrastructure-as-code templates (with spec justification)

**Section 1.2 - Mandatory Specification Structure**

```
/specs/
├── overview.md              # Project vision & current phase status
├── architecture.md          # System architecture (MANDATORY for Phase II+)
├── features/               # Feature specifications
│   ├── task-crud.md        # Task CRUD operations
│   ├── authentication.md   # User authentication
│   └── chatbot.md          # AI chatbot (Phase III)
├── api/                    # API specifications
│   ├── rest-endpoints.md   # REST API endpoints
│   ├── chat-endpoint.md    # Chat API (Phase III - MANDATORY)
│   └── mcp-tools.md        # MCP tools (Phase III - MANDATORY)
├── database/               # Database specifications
│   └── schema.md           # Database schema and models
└── ui/                     # UI specifications
    ├── components.md       # UI components
    └── pages.md            # UI pages and routes
```

**Section 1.3 - Spec-Kit Plus Configuration (MANDATORY)**

Configuration file MUST be at `/.spec-kit/config.yaml`:

```yaml
name: hackathon-todo
version: "4.0.0"
structure:
  specs_dir: specs
  features_dir: specs/features
  api_dir: specs/api
  database_dir: specs/database
  ui_dir: specs/ui
phases:
  phase1-console:
    features: [task-crud]
  phase2-web:
    features: [task-crud, authentication]
  phase3-chatbot:
    features: [task-crud, authentication, chatbot]
  phase4-kubernetes:
    features: [task-crud, authentication, chatbot, deployment]
  phase5-cloud:
    features: [task-crud, authentication, chatbot, deployment, event-driven]
```

**Section 1.4 - Spec Template Requirements**

Every specification MUST contain:
- **User Stories** - As a [role], I want [goal] so that [benefit]
- **Acceptance Criteria** - Testable, measurable outcomes
- **Technical Requirements** - Stack, dependencies, constraints
- **Data Models** - Schema, types, relationships
- **API Contracts** - Endpoints, request/response formats
- **UI/UX Behavior** - Interaction patterns, states
- **Error Handling** - Edge cases, failure modes
- **Security Considerations** - Auth, validation, sanitization

---

### Article II: Claude Code Governance

**Section 2.1 - AI-Driven Development Protocol**

1. **Read Specification** - `@specs/features/[feature].md`
2. **Understand Context** - `@CLAUDE.md` at root and subfolder levels
3. **Generate Implementation** - Code MUST match spec exactly
4. **Validate Against Spec** - All acceptance criteria met
5. **Document Deviations** - If any, update spec immediately

**Section 2.2 - CLAUDE.md Hierarchy (MANDATORY)**

```
/CLAUDE.md                  # Root: Project overview, MCP usage, GitHub workflow
/frontend/CLAUDE.md         # Frontend: Next.js 16+ patterns, ChatKit setup
/backend/CLAUDE.md          # Backend: FastAPI patterns, JWT verification
```

**Section 2.3 - MCP Server Usage (MANDATORY - All Phases)**

**ALL version control and context operations MUST use MCP servers:**

- **GitHub MCP Server** - MUST be used for ALL git operations:
  - Commits, pushes, pulls
  - Branch creation and management
  - Repository operations
  - NO direct git commands allowed

- **Context7 MCP Server** - MUST be used for:
  - Code context management
  - Codebase understanding
  - Context retrieval across sessions

- **Better Auth MCP Server** - MUST be used for:
  - Authentication patterns
  - JWT token management
  - Better Auth configuration

---

### Article III: Core Principles (NON-NEGOTIABLE)

**Section 3.1 - Immutable Principles**

These principles apply to ALL phases and are NON-NEGOTIABLE:

1. **Persistent Database Storage** - All data MUST be stored in Neon Serverless PostgreSQL
2. **Web-First Multi-User Application** - All functionality MUST be accessible via web browser
3. **Clean Code Practices** - Small functions, clear names, single responsibility
4. **Modular Monorepo Structure** - Clear separation: /frontend, /backend, /specs
5. **Spec-Driven Development** - ALL work MUST start from Spec-Kit Plus commands
6. **Automated Testing** - Tests MUST pass before merging
7. **Clarity & Maintainability** - Prioritize readability over cleverness

**Section 3.2 - Multi-User Architecture**

- ALL data MUST be user-scoped
- Every task MUST be associated with authenticated user
- User isolation MUST be enforced at API AND database levels
- NO user can access another user's data
- ALL API endpoints MUST verify authentication before processing

---

## 🏛️ PART II: PHASE-SPECIFIC REQUIREMENTS

### Article IV: Phase I - Foundation (100 Points)

**Section 4.1 - Objective**

Build a command-line todo application storing tasks in memory using spec-driven development.

**Section 4.2 - Technology Stack**

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Python | 3.13+ |
| Package Manager | UV | Latest |
| Development | Claude Code | Latest |
| Methodology | Spec-Kit Plus | v1.0+ |
| Storage | In-Memory | Python list |

**Section 4.3 - Basic Level Features (ALL 5 MANDATORY)**

1. **Add Task** - Create new tasks with title and description
2. **List Tasks** - View all tasks with status indicators
3. **Update Task** - Modify task details
4. **Delete Task** - Remove tasks permanently
5. **Mark Complete/Incomplete** - Toggle task completion status

**Section 4.4 - Validation Checklist**

- [ ] All 5 basic features implemented
- [ ] Spec files created for each feature
- [ ] Code generated via Claude Code
- [ ] README with setup instructions
- [ ] Application runs without errors

---

### Article V: Phase II - Full-Stack Web App (150 Points)

**Section 5.1 - Objective**

Transform the console app into a modern multi-user web application with persistent storage.

**Section 5.2 - Technology Stack (MANDATORY)**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16+ (App Router) | UI layer |
| Backend | Python FastAPI | Business logic |
| ORM | SQLModel | Data access |
| Database | Neon Serverless PostgreSQL | Persistent storage |
| Authentication | Better Auth | User management |
| Styling | Tailwind CSS | Frontend styling |

**Section 5.3 - Monorepo Structure (MANDATORY)**

```
hackathon-todo/
├── .spec-kit/
│   └── config.yaml              # Spec-Kit Plus configuration
├── .specify/
│   └── memory/
│       └── constitution.md      # This document
├── specs/                       # All specifications
│   ├── overview.md
│   ├── architecture.md          # MANDATORY
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── CLAUDE.md                    # Root instructions
├── frontend/
│   ├── CLAUDE.md                # Frontend guidelines
│   ├── app/                     # Next.js App Router
│   ├── components/              # React components
│   ├── lib/
│   │   └── api.ts               # Centralized API client
│   └── package.json
├── backend/
│   ├── CLAUDE.md                # Backend guidelines
│   ├── main.py                  # FastAPI entry point
│   ├── models.py                # SQLModel database models
│   ├── routes/                  # API route handlers
│   ├── db.py                    # Database connection
│   ├── middleware/              # JWT verification, CORS
│   ├── schemas/                 # Pydantic models
│   ├── services/                # Business logic layer
│   └── tests/                   # Test files
├── docker-compose.yml           # MANDATORY
└── README.md
```

**Section 5.4 - RESTful API Specification (ALL MANDATORY)**

All endpoints MUST be implemented:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{user_id}/tasks` | List all tasks (with filtering/sorting/pagination) |
| POST | `/api/{user_id}/tasks` | Create new task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion status |

**Query Parameters (MANDATORY):**
- `?status=all|pending|completed` - Filter by status
- `?sort=created|title|updated|priority|due_date` - Sort tasks
- `?search=keyword` - Search by title or description
- `?page=1&limit=20` - Pagination

**Section 5.5 - JWT Authentication (MANDATORY)**

**Better Auth + JWT Integration:**

1. **Frontend:**
   - Better Auth MUST be configured with JWT plugin
   - JWT tokens MUST be issued on login (signup/signin)
   - API client MUST attach JWT token to EVERY request automatically

2. **Backend:**
   - JWT verification middleware MUST run on EVERY API request
   - Shared secret `BETTER_AUTH_SECRET` MUST be used for verification
   - User ID from JWT MUST match `user_id` in URL path
   - Requests without valid token MUST receive `401 Unauthorized`

**Security Mandates (NON-NEGOTIABLE):**
- ✅ All endpoints require valid JWT token
- ✅ User isolation enforced at database level
- ✅ No hardcoded secrets in code
- ✅ Token expiry enforced (7 days default)

**Section 5.6 - Database Schema (MANDATORY)**

```sql
-- Users table (managed by Better Auth)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL CHECK (LENGTH(title) <= 200),
    description TEXT CHECK (LENGTH(description) <= 1000),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    due_date TIMESTAMP,
    tags TEXT[],
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes (MANDATORY)
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

**Section 5.7 - Advanced Features (ALL MANDATORY)**

**Enhanced Task Management:**
- ✅ Task filtering by status, priority, due date, tags
- ✅ Task sorting by date, title, priority, update time
- ✅ Task search by title or description
- ✅ Task pagination for large lists
- ✅ Multiple view modes (list, grid, kanban)
- ✅ Drag-and-drop reordering
- ✅ Inline editing
- ✅ Undo/redo functionality
- ✅ Export to CSV and JSON
- ✅ Import from CSV and JSON
- ✅ Task statistics dashboard
- ✅ Bulk operations (delete, complete, priority change)
- ✅ Real-time updates with polling
- ✅ Keyboard shortcuts
- ✅ Dark mode toggle

**User Experience:**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states for async operations
- ✅ Error handling with user-friendly messages
- ✅ Toast notifications
- ✅ Optimistic UI updates
- ✅ Touch-friendly mobile interactions

**Section 5.8 - Docker and CI/CD (MANDATORY)**

**Docker Configuration:**
- Backend Dockerfile MUST exist in `/backend`
- Frontend Dockerfile MUST exist in `/frontend`
- docker-compose.yml MUST exist at root

**GitHub Actions CI/CD:**
- Backend pipeline MUST run on `api.phase_2` branch
- Frontend pipeline MUST run on `phase_2` branch
- Pipelines MUST include: linting, testing, building, deployment

**Section 5.9 - Branch Strategy (MANDATORY)**

- **Main Development Branch** (`phase_2`):
  - Contains: /frontend, /backend, /specs, root files
  - Used for full-stack development

- **Backend Deployment Branch** (`api.phase_2`):
  - Contains: ONLY /backend files
  - NO frontend, NO specs
  - Used for backend API deployment

**Section 5.10 - Validation Checklist**

- [ ] Frontend deployed (Vercel recommended)
- [ ] Backend API accessible
- [ ] User signup/signin working
- [ ] JWT authentication implemented
- [ ] All CRUD operations functional
- [ ] All advanced features implemented
- [ ] Data persists in Neon DB
- [ ] Multi-user isolation verified
- [ ] Responsive UI working
- [ ] Docker files created
- [ ] CI/CD pipelines configured

---

### Article VI: Phase III - AI Chatbot (200 Points)

**Section 6.1 - Objective**

Create an AI-powered chatbot interface for managing todos through natural language using MCP architecture.

**Section 6.2 - Technology Stack (MANDATORY)**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Chat UI | OpenAI ChatKit | Conversational interface |
| Backend AI Framework | OpenAI Agents SDK | AI logic and orchestration |
| MCP Server | Official MCP SDK | Task operations as tools |
| Database Models | SQLModel | Conversation + Message models |
| Streaming | Server-Sent Events (SSE) | Real-time response streaming |
| Architecture | Stateless | All state in database |

**Section 6.3 - Architecture: Stateless Chat with MCP**

```
┌─────────────┐     ┌────────────────────────────────────┐     ┌─────────────┐
│             │     │       FastAPI Server               │     │             │
│  ChatKit    │────▶│  POST /api/{user_id}/chat         │     │   Neon DB   │
│  Frontend   │     │                                    │     │             │
│             │     │  ┌───────────────────────────┐    │     │ - tasks     │
│             │     │  │  OpenAI Agents SDK        │    │────▶│ - convos    │
│             │     │  │  (Agent + Runner)         │    │     │ - messages  │
│             │     │  └───────────┬───────────────┘    │     │             │
│             │◀────│              │                     │◀────│             │
│             │     │  ┌───────────▼───────────────┐    │     │             │
│             │     │  │  MCP Server               │    │     │             │
│             │     │  │  (5 Task Operation Tools) │    │     │             │
│             │     │  └───────────────────────────┘    │     │             │
└─────────────┘     └────────────────────────────────────┘     └─────────────┘
```

**Section 6.4 - Database Models (MANDATORY)**

```python
# Existing from Phase II
class Task(SQLModel, table=True):
    user_id: str
    id: int
    title: str
    description: str | None
    completed: bool = False
    created_at: datetime
    updated_at: datetime

# New for Phase III (MANDATORY)
class Conversation(SQLModel, table=True):
    user_id: str
    id: int
    created_at: datetime
    updated_at: datetime

class Message(SQLModel, table=True):
    user_id: str
    id: int
    conversation_id: int
    role: str  # "user" or "assistant"
    content: str
    tool_calls: Optional[str]  # JSON string
    created_at: datetime
```

**Section 6.5 - MCP Tools Specification (ALL 5 MANDATORY)**

The MCP server MUST expose exactly these 5 tools:

**1. add_task (MANDATORY)**
```json
{
  "name": "add_task",
  "description": "Create a new task",
  "parameters": {
    "user_id": {"type": "string", "required": true},
    "title": {"type": "string", "required": true},
    "description": {"type": "string", "required": false}
  },
  "returns": {
    "task_id": "integer",
    "status": "string",
    "title": "string"
  }
}
```

**2. list_tasks (MANDATORY)**
```json
{
  "name": "list_tasks",
  "description": "Retrieve tasks from the list",
  "parameters": {
    "user_id": {"type": "string", "required": true},
    "status": {"type": "string", "enum": ["all", "pending", "completed"]}
  },
  "returns": "array of task objects"
}
```

**3. complete_task (MANDATORY)**
```json
{
  "name": "complete_task",
  "description": "Mark a task as complete",
  "parameters": {
    "user_id": {"type": "string", "required": true},
    "task_id": {"type": "integer", "required": true}
  }
}
```

**4. delete_task (MANDATORY)**
```json
{
  "name": "delete_task",
  "description": "Remove a task from the list",
  "parameters": {
    "user_id": {"type": "string", "required": true},
    "task_id": {"type": "integer", "required": true}
  }
}
```

**5. update_task (MANDATORY)**
```json
{
  "name": "update_task",
  "description": "Modify task title or description",
  "parameters": {
    "user_id": {"type": "string", "required": true},
    "task_id": {"type": "integer", "required": true},
    "title": {"type": "string", "required": false},
    "description": {"type": "string", "required": false}
  }
}
```

**Section 6.6 - Chat API Endpoint (MANDATORY)**

```
POST /api/{user_id}/chat
```

**Request:**
```json
{
  "conversation_id": 123,  // Optional, creates new if not provided
  "message": "Add a task to buy groceries"
}
```

**Response (Streamed via SSE):**
```json
{
  "conversation_id": 123,
  "response": "I've added 'Buy groceries' to your task list!",
  "tool_calls": [
    {"tool": "add_task", "result": {"task_id": 5, "status": "created"}}
  ]
}
```

**Section 6.7 - Stateless Conversation Flow (MANDATORY)**

Every chat request MUST follow this flow:

1. **Receive** user message
2. **Fetch** conversation history from database
3. **Build** message array for agent (history + new message)
4. **Store** user message in database
5. **Run** agent with MCP tools
6. **Agent** invokes appropriate MCP tool(s)
7. **Store** assistant response in database
8. **Return** response to client via SSE
9. **Server** holds NO state (ready for next request)

**Section 6.8 - Natural Language Commands (MANDATORY)**

The agent MUST understand these patterns:

| User Says | Agent Should |
|-----------|-------------|
| "Add a task to buy groceries" | Call `add_task` with title "Buy groceries" |
| "Show me all my tasks" | Call `list_tasks` with status "all" |
| "What's pending?" | Call `list_tasks` with status "pending" |
| "Mark task 3 as complete" | Call `complete_task` with task_id 3 |
| "Delete the meeting task" | Call `list_tasks` first, then `delete_task` |
| "Change task 1 to 'Call mom tonight'" | Call `update_task` with new title |
| "I need to remember to pay bills" | Call `add_task` with title "Pay bills" |
| "What have I completed?" | Call `list_tasks` with status "completed" |

**Section 6.9 - Service Layer (MANDATORY)**

Business logic MUST be extracted into service layer:

```
/backend/services/
├── task_service.py          # Task CRUD operations
└── conversation_service.py  # Conversation management
```

All task operations MUST go through service layer (shared by REST API and MCP tools).

**Section 6.10 - Agent Integration (MANDATORY)**

```
/backend/agents/
├── factory.py      # Model factory for AI provider abstraction
└── todo_agent.py   # TodoAgent with MCP tools
```

**Section 6.11 - Environment Variables (MANDATORY)**

Backend `.env`:
```bash
# Existing
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...

# New for Phase III (MANDATORY)
LLM_PROVIDER=openai  # or gemini
OPENAI_API_KEY=sk-...
OPENAI_DEFAULT_MODEL=gpt-4o-mini
GEMINI_API_KEY=...  # if using Gemini
GEMINI_DEFAULT_MODEL=gemini-2.0-flash
```

Frontend `.env.local`:
```bash
# New for Phase III
NEXT_PUBLIC_CHATKIT_API_URL=/api/chat
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...  # For production
```

**Section 6.12 - Project Structure Updates (MANDATORY)**

```
/backend/src/
├── agents/                   # NEW
│   ├── factory.py
│   └── todo_agent.py
├── mcp/                      # NEW
│   ├── __init__.py
│   ├── config.py
│   ├── server.py
│   └── tools.py
├── services/                 # NEW
│   ├── task_service.py
│   └── conversation_service.py
├── models/
│   ├── task.py              # Existing
│   ├── conversation.py      # NEW
│   └── message.py           # NEW
├── routers/
│   ├── tasks.py             # Existing
│   └── chat.py              # NEW
└── schemas/
    ├── task.py              # Existing
    └── chat.py              # NEW

/frontend/src/
├── components/
│   └── chatkit/             # NEW - ChatKit components
├── app/
│   ├── tasks/               # Existing
│   └── chat/                # NEW - Chat page
└── lib/
    ├── api.ts               # Existing
    └── chat-api.ts          # NEW
```

**Section 6.13 - Dependencies (MANDATORY)**

Backend `requirements.txt`:
```
# Existing
fastapi>=0.104.0
uvicorn>=0.24.0
sqlmodel>=0.0.14
psycopg2-binary>=2.9.9
python-jose>=3.3.0

# New for Phase III (MANDATORY)
openai>=1.0.0
mcp>=1.0.0
```

Frontend `package.json`:
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "@openai/chatkit": ">=0.1.0"
  }
}
```

**Section 6.14 - Validation Checklist**

- [ ] ChatKit UI implemented
- [ ] Chat endpoint created (POST /api/{user_id}/chat)
- [ ] Conversation + Message models created
- [ ] MCP server with all 5 tools implemented
- [ ] Service layer extracted
- [ ] Agent integration complete
- [ ] Streaming responses working (SSE)
- [ ] Conversation persistence working
- [ ] Natural language commands working
- [ ] Error handling comprehensive
- [ ] Authentication integrated
- [ ] User isolation enforced

---

### Article VII: Phase IV - Local Kubernetes (250 Points)

**Section 7.1 - Objective**

Deploy the Todo Chatbot on a local Kubernetes cluster using Docker, Minikube, and Helm Charts.

**Section 7.2 - Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Containerization | Docker Desktop | Build images |
| Docker AI | Gordon (Docker AI Agent) | AI-assisted Docker ops |
| Orchestration | Kubernetes (Minikube) | Container management |
| Package Manager | Helm Charts | K8s deployments |
| AI DevOps | kubectl-ai, kagent | AI-assisted K8s ops |

**Section 7.3 - Containerization Requirements**

**Frontend Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Backend Dockerfile:**
```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Section 7.4 - Helm Chart Structure**

```
helm-charts/
├── todo-app/
│   ├── Chart.yaml
│   ├── values.yaml
│   ├── templates/
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── ingress.yaml
│   │   └── secrets.yaml
│   └── README.md
```

**Section 7.5 - Kubernetes Resources**

**Deployments:**
- `frontend-deployment` - 2 replicas
- `backend-deployment` - 2 replicas

**Services:**
- `frontend-service` - ClusterIP, port 3000
- `backend-service` - ClusterIP, port 8000

**Ingress:**
- Route `/` → frontend
- Route `/api/*` → backend

**ConfigMaps:**
- `frontend-config` - Environment variables
- `backend-config` - API configuration

**Secrets:**
- `database-credentials` - Neon DB connection
- `auth-secrets` - Better Auth secret, OpenAI API key

**Section 7.6 - Validation Checklist**

- [ ] Dockerfiles created
- [ ] Images build successfully
- [ ] Helm charts created
- [ ] Minikube cluster running
- [ ] Pods running (2 frontend, 2 backend)
- [ ] Services accessible
- [ ] Application accessible via Minikube URL
- [ ] kubectl-ai/kagent used
- [ ] Health checks passing

---

### Article VIII: Phase V - Cloud Deployment (300 Points)

**Section 8.1 - Objective**

Implement advanced features and deploy to production Kubernetes with event-driven architecture.

**Section 8.2 - Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Cloud K8s | DigitalOcean DOKS / GKE / AKS | Production orchestration |
| Event Streaming | Kafka (Redpanda Cloud) | Event-driven architecture |
| Distributed Runtime | Dapr | Microservices abstraction |
| CI/CD | GitHub Actions | Automated deployment |
| Monitoring | Prometheus + Grafana | Observability |

**Section 8.3 - Feature Requirements**

**Intermediate Level (MANDATORY):**
- ✅ Priorities & Tags/Categories
- ✅ Search & Filter
- ✅ Sort Tasks

**Advanced Level (MANDATORY):**
- ✅ Recurring Tasks (auto-reschedule)
- ✅ Due Dates & Time Reminders

**Section 8.4 - Event-Driven Architecture**

**Kafka Topics:**

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `task-events` | Chat API (MCP Tools) | Recurring Task Service, Audit | All CRUD operations |
| `reminders` | Chat API | Notification Service | Scheduled reminders |
| `task-updates` | Chat API | WebSocket Service | Real-time sync |

**Section 8.5 - Cloud Deployment Options**

**Recommended: DigitalOcean DOKS**
- Free Credit: $200 for 60 days
- Cost after: ~$20-40/month
- Sign up: https://digitalocean.com

**Alternative: Google Kubernetes Engine (GKE)**
- Free Credit: $300 for 90 days
- Sign up: https://cloud.google.com/free

**Alternative: Azure Kubernetes Service (AKS)**
- Free Credit: $200 for 30 days
- Sign up: https://azure.microsoft.com/free

**Section 8.6 - Kafka Service: Redpanda Cloud**

- Free Serverless tier (no credit card)
- Kafka-compatible
- Sign up: https://redpanda.com/cloud

**Section 8.7 - Validation Checklist**

- [ ] All advanced features implemented
- [ ] Kafka topics created
- [ ] Event-driven services deployed
- [ ] Deployed to DOKS/GKE/AKS
- [ ] HTTPS enabled
- [ ] CI/CD pipeline working
- [ ] Monitoring active
- [ ] Dapr components deployed

---

## 🏛️ PART III: UNIVERSAL STANDARDS

### Article IX: Quality Assurance (NON-NEGOTIABLE)

**Section 9.1 - Code Quality Metrics**

| Metric | Minimum Standard |
|--------|-----------------|
| Type Coverage | 100% (Python type hints, TypeScript) |
| Documentation | All public APIs documented |
| Error Handling | All edge cases handled |
| Security | No hardcoded secrets |
| Performance | API response < 200ms (p95) |

**Section 9.2 - Clean Code Mandates**

- **SOLID Principles** - Single responsibility, Open/closed, etc.
- **DRY** - No code duplication
- **Type Safety** - 100% type hints
- **Error Handling** - Comprehensive try/catch
- **Logging** - Structured logs (JSON in production)

---

### Article X: Security Standards (NON-NEGOTIABLE)

**Section 10.1 - Security Requirements**

1. **Authentication** - JWT tokens, Better Auth
2. **Authorization** - User-scoped data only
3. **Input Validation** - Sanitize ALL user inputs
4. **Secrets Management** - Environment variables only
5. **HTTPS** - Enforce in production
6. **Rate Limiting** - 100 req/min/user

---

### Article XI: Documentation Standards (MANDATORY)

**Section 11.1 - Required Documentation**

Every phase MUST include:

1. **README.md** - Setup, usage, features
2. **CLAUDE.md** (Root + Subfolders) - AI instructions
3. **CONSTITUTION.md** - This document
4. **/specs/** - All specifications
5. **API.md** - API documentation (Phase II+)
6. **DEPLOYMENT.md** - Deployment guide (Phase IV+)

**Section 11.2 - OpenAPI Documentation**

FastAPI MUST automatically generate:
- Swagger UI at `/docs`
- ReDoc at `/redoc`
- All endpoints documented
- Request/response schemas
- Authentication requirements

---

## 🏛️ PART IV: BONUS POINTS

### Article XII: Bonus Opportunities (+600 Points)

**Section 12.1 - Reusable Intelligence (+200 points)**

Create **Claude Code Subagents** and **Skills**:

**Subagents:**
- MCP Tool Builder (95/100 reusability)
- Chat Endpoint Builder (98/100 reusability)
- Spec-Writer Agent
- DevOps Agent

**Skills:**
- Spec-Driven Workflow (100/100 reusability)
- Database Migration Builder (95/100 reusability)

**Section 12.2 - Cloud-Native Blueprints (+200 points)**

Create reusable deployment blueprints:
- Kubernetes Deployment Blueprint
- Helm Chart Blueprint
- Dapr Configuration Blueprint
- Kafka Integration Blueprint
- CI/CD Pipeline Blueprint

**Section 12.3 - Multi-language Support (+100 points)**

Add Urdu language support:
- Urdu prompts and responses
- RTL text support
- Urdu date/time formatting

**Section 12.4 - Voice Commands (+100 points)**

Add voice input:
- Web Speech API
- Voice-to-text conversion
- Natural language processing

---

## 🏛️ PART V: GOVERNANCE & TIMELINE

### Article XIII: Enforcement (NON-NEGOTIABLE)

**Section 13.1 - Violations**

These are VIOLATIONS:

1. ❌ Writing code before specifications
2. ❌ Manual coding without Claude Code
3. ❌ Hardcoded secrets in code
4. ❌ Missing documentation
5. ❌ Skipping mandatory features
6. ❌ Not using MCP servers for git operations

**Section 13.2 - Constitutional Compliance**

All phases MUST comply with:
- Article I: Specification Supremacy
- Article II: Claude Code Governance
- Article III: Core Principles
- Phase-specific mandatory requirements

---

### Article XIV: Timeline & Milestones

**Section 14.1 - Submission Schedule**

| Milestone | Date | Phase | Points | Status |
|-----------|------|-------|--------|--------|
| Phase I | Dec 7, 2025 | Console App | 100 | Complete ✅ |
| Phase II | Dec 14, 2025 | Web App | 150 | Complete ✅ |
| Phase III | Dec 21, 2025 | AI Chatbot | 200 | In Progress 🔄 |
| Phase IV | Jan 4, 2026 | Local K8s | 250 | Pending ⏳ |
| Phase V | Jan 18, 2026 | Cloud Deploy | 300 | Pending ⏳ |

**Total:** 1,000 points (+ 600 bonus)

**Section 14.2 - Live Presentations**

- **When:** Sundays at 8:00 PM (Dec 7, 14, 21, Jan 4, 18)
- **Where:** Zoom (Meeting ID: 849 7684 7088, Passcode: 305850)
- **Who:** Top submissions invited via WhatsApp

---

## 📚 APPENDIX: RESOURCES

### Official Documentation

| Resource | Link |
|----------|------|
| Claude Code | https://claude.com/product/claude-code |
| Spec-Kit Plus | https://github.com/panaversity/spec-kit-plus |
| OpenAI ChatKit | https://platform.openai.com/docs/guides/chatkit |
| MCP SDK | https://github.com/modelcontextprotocol/python-sdk |
| FastAPI | https://fastapi.tiangolo.com |
| Next.js | https://nextjs.org/docs |
| Better Auth | https://www.better-auth.com/docs |
| Neon | https://neon.tech/docs |
| Dapr | https://docs.dapr.io |
| Redpanda | https://docs.redpanda.com |

### Cloud Services

| Service | Free Tier | Link |
|---------|-----------|------|
| Neon DB | Free tier | https://neon.tech |
| Vercel | Free hosting | https://vercel.com |
| DigitalOcean | $200 credit (60 days) | https://digitalocean.com |
| Redpanda Cloud | Free serverless | https://redpanda.com/cloud |

---

## 📝 FINAL DECLARATION

**This Merged Constitution (Version 4.0) combines:**
- ✅ Technical depth of Version 3.0.0 (Phase II & III details)
- ✅ Comprehensive scope of 5-Phase Constitution
- ✅ Best practices from both documents
- ✅ All mandatory requirements clearly marked
- ✅ Complete governance framework

**Effective Date:** December 20, 2025
**Version:** 4.0 (Merged)
**Status:** Active & Enforced

---

**The future of software development is AI-native and spec-driven.**
**Engineers are architects. AI agents are builders.**
**Specifications are the constitution.**

**Master the architecture. Command the intelligence.**

🚀 **Build the Future. One Spec at a Time.** 🚀

---

*Constitution Version 4.0 - Merged Edition*
*Combining technical precision with comprehensive scope*
*Panaversity Hackathon II - The Evolution of Todo*
*December 2025 - January 2026*