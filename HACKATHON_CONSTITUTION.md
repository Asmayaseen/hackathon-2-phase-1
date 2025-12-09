# THE EVOLUTION OF TODO - CONSTITUTIONAL FRAMEWORK
## Complete 5-Phase Hackathon Constitution

> **Document Version:** 1.0
> **Project:** The Evolution of Todo - Mastering Spec-Driven Development & Cloud Native AI
> **Hackathon:** Panaversity Hackathon II
> **Total Points:** 1,000 (+ 600 Bonus)
> **Timeline:** December 1, 2025 - January 18, 2026

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

## 🏛️ PART I: FOUNDATIONAL ARTICLES

### Article I: Specification Supremacy

**Section 1.1 - Spec-First Mandate**

All code SHALL be generated from specifications. Manual coding is PROHIBITED except for:
- Emergency bug fixes with post-facto spec updates
- Configuration files (with spec documentation)
- Infrastructure-as-code templates (with spec justification)

**Section 1.2 - Specification Structure**

```
/specs/
├── overview.md           # Project vision & status
├── architecture.md       # System architecture
├── features/            # Feature specifications
│   ├── [feature-name].md
├── api/                 # API specifications
│   ├── rest-endpoints.md
│   ├── mcp-tools.md
├── database/            # Database specifications
│   └── schema.md
└── ui/                  # UI specifications
    ├── components.md
    └── pages.md
```

**Section 1.3 - Spec Template Requirements**

Every specification MUST contain:
- **User Stories** - As a [role], I want [goal] so that [benefit]
- **Acceptance Criteria** - Testable, measurable outcomes
- **Technical Requirements** - Stack, dependencies, constraints
- **Data Models** - Schema, types, relationships
- **API Contracts** - Endpoints, request/response formats
- **UI/UX Behavior** - Interaction patterns, states
- **Error Handling** - Edge cases, failure modes
- **Security Considerations** - Auth, validation, sanitization

**Section 1.4 - Spec Evolution**

Specifications are **living documents**:
- Version controlled alongside code
- Updated BEFORE implementation changes
- Reviewed and approved by AI agents or human architect
- Historical versions preserved in `/specs/history/`

---

### Article II: Claude Code Governance

**Section 2.1 - AI-Driven Development Protocol**

1. **Read Specification** - `@specs/features/[feature].md`
2. **Understand Context** - `@CLAUDE.md` at root and subfolder levels
3. **Generate Implementation** - Code MUST match spec exactly
4. **Validate Against Spec** - All acceptance criteria met
5. **Document Deviations** - If any, update spec immediately

**Section 2.2 - CLAUDE.md Hierarchy**

```
/CLAUDE.md                  # Root: Project overview, navigation
/frontend/CLAUDE.md         # Frontend: Next.js patterns
/backend/CLAUDE.md          # Backend: FastAPI patterns
/.spec-kit/config.yaml      # Spec-Kit configuration
```

**Section 2.3 - Prompt Engineering Standards**

When invoking Claude Code:
- Reference specific specs: `@specs/features/task-crud.md implement create task`
- Provide context: `@specs/architecture.md` for cross-cutting changes
- Request validation: `Verify implementation against acceptance criteria`
- Iterate on specs, NOT code: `Update spec with [new requirement]`

---

### Article III: Architectural Principles

**Section 3.1 - Evolution Stages**

| Phase | Architecture | Complexity | Points |
|-------|-------------|-----------|--------|
| I | Monolithic (In-Memory) | Simple | 100 |
| II | Layered (Web App) | Moderate | 150 |
| III | AI-Augmented (Chatbot) | Complex | 200 |
| IV | Microservices (Local K8s) | Advanced | 250 |
| V | Distributed (Cloud) | Expert | 300 |

**Section 3.2 - Separation of Concerns**

Each phase MUST maintain clear boundaries:

**Phase I:**
```
src/
├── models.py          # Data models (Todo dataclass)
├── todo_manager.py    # Business logic (CRUD)
├── ui.py              # Console interface
└── main.py            # Entry point
```

**Phase II:**
```
frontend/              # Next.js (UI layer)
backend/               # FastAPI (Business logic)
└── models.py          # SQLModel (Data layer)
```

**Phase III-V:**
```
frontend/              # ChatKit UI
backend/
├── api/               # REST endpoints
├── agents/            # OpenAI Agents SDK
├── mcp/               # MCP server & tools
└── models/            # Database models
```

**Section 3.3 - Clean Code Mandates**

- **SOLID Principles** - Single responsibility, Open/closed, etc.
- **DRY (Don't Repeat Yourself)** - No code duplication
- **Type Safety** - 100% type hints in Python, TypeScript in frontend
- **Error Handling** - Comprehensive try/catch, validation
- **Logging** - Structured logs (JSON format in production)

---

### Article IV: Feature Progression

**Section 4.1 - Basic Level Features** (Required: All Phases)

1. **Add Task** - Create new todo items
2. **Delete Task** - Remove tasks from list
3. **Update Task** - Modify existing task details
4. **View Task List** - Display all tasks
5. **Mark as Complete** - Toggle completion status

**Section 4.2 - Intermediate Level Features** (Required: Phase V)

6. **Priorities & Tags** - Assign levels (high/medium/low) or labels (work/home)
7. **Search & Filter** - Search by keyword; filter by status, priority, or date
8. **Sort Tasks** - Reorder by due date, priority, or alphabetically

**Section 4.3 - Advanced Level Features** (Required: Phase V)

9. **Recurring Tasks** - Auto-reschedule repeating tasks (e.g., "weekly meeting")
10. **Due Dates & Time Reminders** - Set deadlines with date/time pickers; browser notifications

**Section 4.4 - Progressive Implementation**

| Phase | Features Required |
|-------|------------------|
| I | Basic (1-5) |
| II | Basic (1-5) + User Auth |
| III | Basic (1-5) + User Auth + AI Chatbot |
| IV | Basic (1-5) + User Auth + AI Chatbot + K8s Deployment |
| V | All Basic + Intermediate + Advanced + Event-Driven |

---

## 🏛️ PART II: PHASE-SPECIFIC GOVERNANCE

### Article V: Phase I - Foundation (100 Points)

**Section 5.1 - Objective**

Build a command-line todo application storing tasks in memory using spec-driven development.

**Section 5.2 - Technology Stack**

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | Python | 3.13+ |
| Package Manager | UV | Latest |
| Development | Claude Code | Latest |
| Methodology | Spec-Kit Plus | v1.0+ |
| Storage | In-Memory | Python list |

**Section 5.3 - Required Deliverables**

✅ **GitHub Repository:**
- `CONSTITUTION.md` - This document
- `/specs/` - All specification files
- `/src/` - Python source code
- `README.md` - Setup instructions
- `CLAUDE.md` - Claude Code instructions
- `.gitignore` - Exclude `.venv/`, `__pycache__/`

✅ **Working Application:**
- Add tasks with title and description
- List all tasks with status indicators (`[✓]` / `[✗]`)
- Update task details
- Delete tasks by ID
- Mark tasks as complete/incomplete

**Section 5.4 - Quality Standards**

- **Code Coverage** - All functions documented
- **Type Hints** - 100% coverage
- **Error Handling** - Validate all inputs
- **User Experience** - Clear prompts, feedback messages

**Section 5.5 - Validation Checklist**

- [ ] All 5 basic features implemented
- [ ] Spec files created for each feature
- [ ] Code generated via Claude Code
- [ ] No manual coding violations
- [ ] README with clear setup instructions
- [ ] Application runs without errors

---

### Article VI: Phase II - Full-Stack Web App (150 Points)

**Section 6.1 - Objective**

Transform the console app into a modern multi-user web application with persistent storage.

**Section 6.2 - Technology Stack**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16+ (App Router) | UI layer |
| Backend | Python FastAPI | Business logic |
| ORM | SQLModel | Data access |
| Database | Neon Serverless PostgreSQL | Persistent storage |
| Authentication | Better Auth | User management |

**Section 6.3 - Monorepo Structure**

```
hackathon-todo/
├── .spec-kit/
│   └── config.yaml
├── specs/
│   ├── overview.md
│   ├── architecture.md
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
├── CLAUDE.md             # Root instructions
├── frontend/
│   ├── CLAUDE.md
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   └── lib/              # API client
├── backend/
│   ├── CLAUDE.md
│   ├── main.py           # FastAPI app
│   ├── models.py         # SQLModel
│   ├── routes/           # API endpoints
│   └── db.py             # Database connection
├── docker-compose.yml
└── README.md
```

**Section 6.4 - REST API Specification**

All endpoints MUST follow this pattern:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/{user_id}/tasks` | List all tasks for user |
| POST | `/api/{user_id}/tasks` | Create new task |
| GET | `/api/{user_id}/tasks/{id}` | Get task details |
| PUT | `/api/{user_id}/tasks/{id}` | Update task |
| DELETE | `/api/{user_id}/tasks/{id}` | Delete task |
| PATCH | `/api/{user_id}/tasks/{id}/complete` | Toggle completion |

**Section 6.5 - Authentication Requirements**

**Better Auth + JWT Integration:**

1. **Frontend** - Better Auth issues JWT tokens on login
2. **API Requests** - Include JWT in `Authorization: Bearer <token>` header
3. **Backend** - Verify JWT signature using shared secret (`BETTER_AUTH_SECRET`)
4. **Data Isolation** - Filter all queries by authenticated user's ID

**Security Mandates:**
- ✅ All endpoints require valid JWT token
- ✅ Requests without token receive `401 Unauthorized`
- ✅ Each user only sees/modifies their own tasks
- ✅ Token expiry enforced (default: 7 days)

**Section 6.6 - Database Schema**

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
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

**Section 6.7 - Validation Checklist**

- [ ] Frontend deployed to Vercel
- [ ] Backend API accessible
- [ ] User signup/signin working (Better Auth)
- [ ] JWT authentication implemented
- [ ] All CRUD operations functional
- [ ] Data persists in Neon DB
- [ ] Multi-user isolation verified
- [ ] Responsive UI (mobile + desktop)

---

### Article VII: Phase III - AI Chatbot (200 Points)

**Section 7.1 - Objective**

Create an AI-powered chatbot interface for managing todos through natural language using MCP architecture.

**Section 7.2 - Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | OpenAI ChatKit | Chat UI |
| Backend | Python FastAPI | API server |
| AI Framework | OpenAI Agents SDK | AI logic |
| MCP Server | Official MCP SDK | Tool interface |
| ORM | SQLModel | Data access |
| Database | Neon PostgreSQL | Persistent storage |
| Auth | Better Auth | User management |

**Section 7.3 - Architecture: Stateless Chat with MCP**

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
│             │     │  │  (Task Operation Tools)   │    │     │             │
│             │     │  └───────────────────────────┘    │     │             │
└─────────────┘     └────────────────────────────────────┘     └─────────────┘
```

**Section 7.4 - Database Models**

```python
# Existing
class Task(SQLModel, table=True):
    user_id: str
    id: int
    title: str
    description: str | None
    completed: bool = False
    created_at: datetime
    updated_at: datetime

# New for Phase III
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
    created_at: datetime
```

**Section 7.5 - MCP Tools Specification**

The MCP server MUST expose these tools:

**1. add_task**
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

**2. list_tasks**
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

**3. complete_task**
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

**4. delete_task**
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

**5. update_task**
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

**Section 7.6 - Chat API Endpoint**

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

**Response:**
```json
{
  "conversation_id": 123,
  "response": "I've added 'Buy groceries' to your task list!",
  "tool_calls": [
    {"tool": "add_task", "result": {"task_id": 5, "status": "created"}}
  ]
}
```

**Section 7.7 - Stateless Conversation Flow**

1. **Receive** user message
2. **Fetch** conversation history from database
3. **Build** message array for agent (history + new message)
4. **Store** user message in database
5. **Run** agent with MCP tools
6. **Agent** invokes appropriate MCP tool(s)
7. **Store** assistant response in database
8. **Return** response to client
9. **Server** holds NO state (ready for next request)

**Section 7.8 - Natural Language Commands**

The agent MUST understand:

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

**Section 7.9 - OpenAI ChatKit Domain Allowlist**

Before deploying:

1. Deploy frontend to get production URL (Vercel/GitHub Pages)
2. Add domain to OpenAI allowlist: https://platform.openai.com/settings/organization/security/domain-allowlist
3. Get domain key from OpenAI
4. Set `NEXT_PUBLIC_OPENAI_DOMAIN_KEY` in frontend

**Section 7.10 - Validation Checklist**

- [ ] ChatKit UI deployed and accessible
- [ ] Chat endpoint accepts messages
- [ ] Conversation state persists to database
- [ ] MCP server with all 5 tools implemented
- [ ] Agent correctly interprets natural language
- [ ] All basic CRUD operations via chat
- [ ] Multi-turn conversations work
- [ ] Server restart doesn't lose history
- [ ] Error handling graceful
- [ ] User authentication integrated

---

### Article VIII: Phase IV - Local Kubernetes (250 Points)

**Section 8.1 - Objective**

Deploy the Todo Chatbot on a local Kubernetes cluster using Docker, Minikube, and Helm Charts.

**Section 8.2 - Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Containerization | Docker Desktop | Build images |
| Docker AI | Gordon (Docker AI Agent) | AI-assisted Docker ops |
| Orchestration | Kubernetes (Minikube) | Container management |
| Package Manager | Helm Charts | K8s deployments |
| AI DevOps | kubectl-ai, kagent | AI-assisted K8s ops |

**Section 8.3 - Containerization Requirements**

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

**Section 8.4 - Helm Chart Structure**

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

**Section 8.5 - Kubernetes Resources**

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
- `database-credentials` - Neon DB connection string
- `auth-secrets` - Better Auth secret, OpenAI API key

**Section 8.6 - AIOps Tools Usage**

**Docker AI (Gordon):**
```bash
# Query capabilities
docker ai "What can you do?"

# Build optimized images
docker ai "Build a minimal Python image for FastAPI"

# Troubleshoot
docker ai "Why is my container failing?"
```

**kubectl-ai:**
```bash
# Deploy
kubectl-ai "deploy the todo frontend with 2 replicas"

# Scale
kubectl-ai "scale the backend to handle more load"

# Debug
kubectl-ai "check why the pods are failing"
```

**kagent:**
```bash
# Analyze
kagent "analyze the cluster health"

# Optimize
kagent "optimize resource allocation"
```

**Section 8.7 - Deployment Steps**

1. **Start Minikube:**
   ```bash
   minikube start --cpus=4 --memory=8192
   ```

2. **Build Docker Images:**
   ```bash
   eval $(minikube docker-env)
   docker build -t todo-frontend:v1 ./frontend
   docker build -t todo-backend:v1 ./backend
   ```

3. **Deploy with Helm:**
   ```bash
   helm install todo-app ./helm-charts/todo-app
   ```

4. **Verify Deployment:**
   ```bash
   kubectl get pods
   kubectl get services
   kubectl logs <pod-name>
   ```

5. **Access Application:**
   ```bash
   minikube service frontend-service --url
   ```

**Section 8.8 - Validation Checklist**

- [ ] Dockerfiles created for frontend and backend
- [ ] Images build successfully
- [ ] Helm charts created with all resources
- [ ] Minikube cluster running
- [ ] Pods running (2 frontend, 2 backend)
- [ ] Services accessible
- [ ] Application works via Minikube URL
- [ ] kubectl-ai/kagent used for deployment
- [ ] Health checks passing
- [ ] Logs accessible

---

### Article IX: Phase V - Advanced Cloud Deployment (300 Points)

**Section 9.1 - Objective**

Implement advanced features and deploy to production-grade Kubernetes with event-driven architecture.

**Section 9.2 - Technology Stack**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Cloud K8s | DigitalOcean DOKS / GKE / AKS | Production orchestration |
| Event Streaming | Kafka (Redpanda Cloud) | Event-driven architecture |
| Distributed Runtime | Dapr | Microservices abstraction |
| CI/CD | GitHub Actions | Automated deployment |
| Monitoring | Prometheus + Grafana | Observability |

**Section 9.3 - Feature Requirements**

**Intermediate Level (Required):**
- ✅ Priorities & Tags/Categories
- ✅ Search & Filter
- ✅ Sort Tasks

**Advanced Level (Required):**
- ✅ Recurring Tasks (auto-reschedule)
- ✅ Due Dates & Time Reminders

**Section 9.4 - Event-Driven Architecture**

**Kafka Topics:**

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `task-events` | Chat API (MCP Tools) | Recurring Task Service, Audit Service | All task CRUD operations |
| `reminders` | Chat API (when due date set) | Notification Service | Scheduled reminder triggers |
| `task-updates` | Chat API | WebSocket Service | Real-time client sync |

**Event Schema - Task Event:**
```json
{
  "event_type": "created | updated | completed | deleted",
  "task_id": 123,
  "task_data": {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "due_at": "2026-01-20T10:00:00Z",
    "recurring": "weekly"
  },
  "user_id": "user123",
  "timestamp": "2026-01-15T14:30:00Z"
}
```

**Event Schema - Reminder Event:**
```json
{
  "task_id": 123,
  "title": "Buy groceries",
  "due_at": "2026-01-20T10:00:00Z",
  "remind_at": "2026-01-20T09:00:00Z",
  "user_id": "user123"
}
```

**Section 9.5 - Microservices Architecture**

```
┌──────────────────────────────────────────────────────────────────┐
│                    KUBERNETES CLUSTER (DOKS/GKE/AKS)             │
│                                                                   │
│  ┌─────────────┐   ┌─────────────┐   ┌────────────────────────┐ │
│  │  Frontend   │   │  Chat API   │   │    KAFKA CLUSTER       │ │
│  │  Service    │──▶│  + MCP      │──▶│  ┌──────────────────┐  │ │
│  └─────────────┘   │  Tools      │   │  │ task-events      │  │ │
│                    └──────┬──────┘   │  │ reminders        │  │ │
│                           │          │  │ task-updates     │  │ │
│                           │          └──┴──────────────────┴──┘ │
│                           ▼                     │        │       │
│                    ┌─────────────┐   ┌─────────▼───┐  ┌─▼─────┐ │
│                    │   Neon DB   │   │ Recurring   │  │ Notif  │ │
│                    │  (External) │   │ Task Svc    │  │  Svc   │ │
│                    └─────────────┘   └─────────────┘  └────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

**Services:**

1. **Frontend Service** - Next.js ChatKit UI
2. **Chat API Service** - FastAPI + OpenAI Agents + MCP
3. **Recurring Task Service** - Consumes `task-events`, creates next occurrence
4. **Notification Service** - Consumes `reminders`, sends push/email
5. **Audit Service** - Consumes `task-events`, maintains history
6. **WebSocket Service** - Consumes `task-updates`, broadcasts to clients

**Section 9.6 - Dapr Integration**

**Dapr Building Blocks Used:**

1. **Pub/Sub** - Kafka abstraction (no kafka-python needed)
2. **State Management** - Conversation state storage
3. **Service Invocation** - Inter-service communication with retries
4. **Bindings** - Cron triggers for scheduled reminders
5. **Secrets Management** - API keys, DB credentials

**Dapr Components:**

```yaml
# kafka-pubsub.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: kafka-pubsub
spec:
  type: pubsub.kafka
  version: v1
  metadata:
    - name: brokers
      value: "your-redpanda-cluster.cloud:9092"
    - name: authType
      value: "password"
    - name: saslUsername
      value: "your-username"
    - name: saslPassword
      secretKeyRef:
        name: kafka-secrets
        key: password

---

# statestore.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: statestore
spec:
  type: state.postgresql
  version: v1
  metadata:
    - name: connectionString
      secretKeyRef:
        name: neon-secrets
        key: connection-string

---

# reminder-cron.yaml
apiVersion: dapr.io/v1alpha1
kind: Component
metadata:
  name: reminder-cron
spec:
  type: bindings.cron
  version: v1
  metadata:
    - name: schedule
      value: "*/5 * * * *"  # Every 5 minutes
```

**Publishing Events via Dapr:**
```python
import httpx

# Publish task event (no Kafka library needed!)
await httpx.post(
    "http://localhost:3500/v1.0/publish/kafka-pubsub/task-events",
    json={"event_type": "created", "task_id": 123, ...}
)
```

**Section 9.7 - Cloud Deployment Options**

**Option 1: DigitalOcean Kubernetes (DOKS)** ⭐ Recommended
- **Free Credit:** $200 for 60 days
- **Sign Up:** https://digitalocean.com
- **Cost:** ~$20-40/month after credit expires
- **Features:** Managed K8s, Load Balancer, Block Storage

**Option 2: Google Kubernetes Engine (GKE)**
- **Free Credit:** $300 for 90 days
- **Sign Up:** https://cloud.google.com/free
- **Cost:** Pay-as-you-go after credit
- **Features:** Auto-scaling, Multi-zone clusters

**Option 3: Azure Kubernetes Service (AKS)**
- **Free Credit:** $200 for 30 days + 12 months free services
- **Sign Up:** https://azure.microsoft.com/free
- **Cost:** Pay-as-you-go after credit
- **Features:** Azure integration, Managed identity

**Section 9.8 - Kafka Service: Redpanda Cloud**

**Why Redpanda:**
- ✅ Free Serverless tier (no credit card)
- ✅ Kafka-compatible (same APIs)
- ✅ No Zookeeper (simpler)
- ✅ Fast setup (< 5 minutes)

**Setup Steps:**
1. Sign up: https://redpanda.com/cloud
2. Create Serverless cluster
3. Create topics: `task-events`, `reminders`, `task-updates`
4. Copy bootstrap server URL and credentials
5. Use standard kafka-python client

**Section 9.9 - CI/CD Pipeline (GitHub Actions)**

```.github/workflows/deploy.yml
name: Deploy to DOKS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker Images
        run: |
          docker build -t registry.digitalocean.com/your-registry/frontend:${{ github.sha }} ./frontend
          docker build -t registry.digitalocean.com/your-registry/backend:${{ github.sha }} ./backend

      - name: Push to Registry
        run: |
          docker push registry.digitalocean.com/your-registry/frontend:${{ github.sha }}
          docker push registry.digitalocean.com/your-registry/backend:${{ github.sha }}

      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install todo-app ./helm-charts/todo-app \
            --set frontend.image.tag=${{ github.sha }} \
            --set backend.image.tag=${{ github.sha }}
```

**Section 9.10 - Database Schema Updates**

```sql
-- Add new columns for advanced features
ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'medium';
ALTER TABLE tasks ADD COLUMN tags TEXT[];
ALTER TABLE tasks ADD COLUMN due_at TIMESTAMP;
ALTER TABLE tasks ADD COLUMN recurring TEXT;  -- 'daily', 'weekly', 'monthly'
ALTER TABLE tasks ADD COLUMN parent_task_id INTEGER REFERENCES tasks(id);

-- Create indexes
CREATE INDEX idx_tasks_due_at ON tasks(due_at);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_tags ON tasks USING GIN(tags);
```

**Section 9.11 - Monitoring & Observability**

**Prometheus + Grafana Stack:**

```yaml
# Install with Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

**Metrics to Track:**
- Request latency (p50, p95, p99)
- Error rates
- Task creation/completion rates
- Kafka lag
- Pod CPU/memory usage
- Database connection pool

**Section 9.12 - Deployment Steps**

**Local (Minikube) First:**
1. Deploy to Minikube with Dapr
2. Install Redpanda locally (Docker)
3. Test all features
4. Verify Dapr pub/sub, state, bindings, secrets

**Cloud Deployment:**
1. Create DOKS/GKE/AKS cluster
2. Configure kubectl context
3. Install Dapr on cluster: `dapr init -k`
4. Deploy Dapr components (Kafka, State, Secrets)
5. Create Docker registry
6. Build and push images
7. Deploy via Helm: `helm install todo-app ./helm-charts/todo-app`
8. Configure Ingress/LoadBalancer
9. Set up GitHub Actions CI/CD
10. Configure monitoring

**Section 9.13 - Validation Checklist**

**Features:**
- [ ] All Basic + Intermediate + Advanced features implemented
- [ ] Priorities (high/medium/low) working
- [ ] Tags/categories functional
- [ ] Search and filter working
- [ ] Sort by due date, priority, title
- [ ] Recurring tasks auto-create
- [ ] Due date reminders trigger

**Architecture:**
- [ ] Kafka topics created (task-events, reminders, task-updates)
- [ ] Events published to Kafka on all operations
- [ ] Recurring Task Service consuming events
- [ ] Notification Service sending reminders
- [ ] Audit Service logging all operations
- [ ] Dapr components deployed (Pub/Sub, State, Bindings, Secrets)

**Deployment:**
- [ ] Deployed to DOKS/GKE/AKS
- [ ] Multiple pods running (HA)
- [ ] Ingress/LoadBalancer configured
- [ ] HTTPS enabled
- [ ] CI/CD pipeline working
- [ ] Monitoring dashboards active
- [ ] Logs accessible

---

## 🏛️ PART III: UNIVERSAL STANDARDS

### Article X: Quality Assurance

**Section 10.1 - Code Quality Metrics**

| Metric | Minimum Standard |
|--------|-----------------|
| Type Coverage | 100% (Python type hints, TypeScript) |
| Documentation | All public APIs documented |
| Error Handling | All edge cases handled |
| Security | No hardcoded secrets, input validation |
| Performance | API response < 200ms (p95) |

**Section 10.2 - Testing Requirements**

Phase II-V MUST include:
- Unit tests for business logic
- Integration tests for API endpoints
- End-to-end tests for critical flows

**Section 10.3 - Security Standards**

1. **Authentication** - JWT tokens, secure session management
2. **Authorization** - User-scoped data access only
3. **Input Validation** - Sanitize all user inputs
4. **Secrets Management** - Environment variables, never in code
5. **HTTPS** - Enforce encrypted connections in production
6. **Rate Limiting** - Prevent abuse (100 req/min/user)

---

### Article XI: Documentation Standards

**Section 11.1 - Required Documentation**

Every phase MUST include:

1. **README.md** - Project overview, setup, usage
2. **CLAUDE.md** - AI assistant instructions
3. **CONSTITUTION.md** - This document
4. **/specs/** - All feature specifications
5. **API.md** - API documentation (Phase II+)
6. **DEPLOYMENT.md** - Deployment guide (Phase IV+)

**Section 11.2 - Spec Template**

```markdown
# Feature: [Feature Name]

## User Stories
- As a [role], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Requirements
- Stack: [technologies]
- Dependencies: [libraries]

## Data Models
```json
{schema}
```

## API Contracts
**Endpoint:** POST /api/endpoint
**Request:**
**Response:**

## UI/UX Behavior
- State 1
- State 2

## Error Handling
- Case 1: [handling]
- Case 2: [handling]

## Security Considerations
- Auth required: Yes/No
- Input validation: [rules]
```

---

### Article XII: Bonus Points

**Section 12.1 - Reusable Intelligence (+200 points)**

Create and use **Claude Code Subagents** and **Agent Skills**:

**Subagents:**
- Spec-Writer Agent
- Python-Developer Agent
- Frontend-Developer Agent
- DevOps Agent
- Code-Reviewer Agent

**Skills:**
- Spec-Validation Skill
- Python-Development Skill
- FastAPI-Development Skill
- Next.js-Development Skill
- Kubernetes-Deployment Skill
- Dapr-Integration Skill

**Section 12.2 - Cloud-Native Blueprints (+200 points)**

Create **reusable deployment blueprints** via Agent Skills:
- Kubernetes Deployment Blueprint
- Helm Chart Blueprint
- Dapr Configuration Blueprint
- Kafka Integration Blueprint
- CI/CD Pipeline Blueprint

**Section 12.3 - Multi-language Support (+100 points)**

Add **Urdu language support** in chatbot:
- Urdu prompts and responses
- Bidirectional text (RTL)
- Urdu date/time formatting

**Section 12.4 - Voice Commands (+200 points)**

Add **voice input** for todo commands:
- Web Speech API integration
- Voice-to-text conversion
- Natural language processing

---

## 🏛️ PART IV: GOVERNANCE & ENFORCEMENT

### Article XIII: Spec-Driven Enforcement

**Section 13.1 - Violations**

The following are VIOLATIONS of this Constitution:

1. ❌ Writing code before specifications
2. ❌ Manual coding without Claude Code generation
3. ❌ Committing code without corresponding spec
4. ❌ Hardcoded secrets in source code
5. ❌ Missing documentation
6. ❌ Skipping phases or features

**Section 13.2 - Review Process**

Before each phase submission:

1. **Spec Review** - All features have specifications
2. **Code Review** - Code matches specifications
3. **Quality Review** - Standards met (types, docs, tests)
4. **Security Review** - No vulnerabilities
5. **Deployment Review** - Application accessible and functional

**Section 13.3 - Self-Certification**

Before submitting each phase, developers MUST self-certify:

> "I certify that this submission was built using spec-driven development with Claude Code, meets all requirements of this Constitution, and adheres to the quality standards outlined herein."

---

### Article XIV: Amendment Process

**Section 14.1 - Immutable Articles**

The following articles are **IMMUTABLE** and cannot be changed:

- Article I: Specification Supremacy
- Article II: Claude Code Governance
- Article III: Architectural Principles

**Section 14.2 - Amendable Articles**

Phase-specific articles (V-IX) may be updated if:
- Hackathon organizers issue clarifications
- Technology requirements change
- Security vulnerabilities discovered

**Section 14.3 - Amendment Procedure**

1. Propose amendment with justification
2. Update `/specs/constitution-amendments.md`
3. Review with Claude Code agents
4. Implement if approved
5. Document in version history

---

## 📅 TIMELINE & MILESTONES

### Submission Schedule

| Milestone | Date | Phase | Points | Deliverables |
|-----------|------|-------|--------|-------------|
| Phase I Due | Dec 7, 2025 | Console App | 100 | GitHub repo, working app |
| Phase II Due | Dec 14, 2025 | Web App | 150 | Vercel deploy, API, DB |
| Phase III Due | Dec 21, 2025 | AI Chatbot | 200 | ChatKit UI, MCP server |
| Phase IV Due | Jan 4, 2026 | Local K8s | 250 | Minikube deploy, Helm |
| Phase V Due | Jan 18, 2026 | Cloud Deploy | 300 | DOKS/GKE/AKS, Kafka, Dapr |

**Total:** 1,000 points (+ 600 bonus)

### Live Presentations

**When:** Sundays at 8:00 PM on Dec 7, 14, 21 and Jan 4, 18
**Where:** Zoom (Meeting ID: 849 7684 7088, Passcode: 305850)
**Who:** Top submissions invited via WhatsApp

---

## 🎯 SUCCESS CRITERIA

### Hackathon Excellence

To excel in this hackathon and potentially join the **Panaversity core team**:

1. ✅ **Complete all 5 phases** on time
2. ✅ **Follow spec-driven development** rigorously
3. ✅ **Achieve high code quality** (clean, documented, tested)
4. ✅ **Implement bonus features** for extra points
5. ✅ **Present clearly** if selected for live demo
6. ✅ **Document thoroughly** for reproducibility

### Potential Outcomes

**Top Performers May:**
- Be invited for **Panaversity core team** interview
- Step into role as **AI Startup Founder**
- Opportunity to **teach at Panaversity, PIAIC, GIAIC**
- Work with founders: **Zia, Rehan, Junaid, Wania**

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
| Kubernetes | https://kubernetes.io/docs |
| Helm | https://helm.sh/docs |

### Cloud Services

| Service | Free Tier | Link |
|---------|-----------|------|
| Neon DB | Free tier available | https://neon.tech |
| Vercel | Free frontend hosting | https://vercel.com |
| DigitalOcean | $200 credit (60 days) | https://digitalocean.com |
| Google Cloud | $300 credit (90 days) | https://cloud.google.com/free |
| Azure | $200 credit (30 days) | https://azure.microsoft.com/free |
| Redpanda Cloud | Free serverless tier | https://redpanda.com/cloud |

---

## 📝 SIGNATURE & ADOPTION

**This Constitution is hereby adopted and shall govern all development activities for "The Evolution of Todo" project across all five phases.**

**Effective Date:** December 1, 2025
**Version:** 1.0
**Status:** Active

**Governed By:**
- Spec-Kit Plus Methodology
- Claude Code AI Assistance
- Panaversity Hackathon II Guidelines

---

**Nine Pillars of AI-Driven Development:**

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

**The future of software development is AI-native and spec-driven.
Engineers are architects. AI agents are builders.
Specifications are the constitution.**

**Master the architecture. Command the intelligence.**

🚀 **Build the Future. One Spec at a Time.** 🚀

---

*Constitution authored with Claude Code*
*Panaversity Hackathon II - The Evolution of Todo*
*December 2025 - January 2026*
