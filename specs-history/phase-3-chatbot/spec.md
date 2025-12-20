# Phase III Specification: AI-Powered Todo Chatbot

> **Phase:** III - AI Chatbot Integration
> **Due Date:** December 21, 2025
> **Points:** 200
> **Methodology:** Spec-Driven Development

---

## 1. Overview

Transform the Phase II full-stack todo application by adding a conversational AI interface powered by OpenAI ChatKit, OpenAI Agents SDK, and Model Context Protocol (MCP) Server.

### Key Objectives

1. Add natural language interface for task management
2. Maintain Phase II functionality (REST API + Dashboard)
3. Implement stateless, scalable architecture
4. Persist conversation history to database
5. Use MCP tools for AI-task interactions

---

## 2. User Stories

### US-1: Natural Language Task Creation
**As a** user
**I want to** create tasks by typing natural commands
**So that** I can quickly add todos without forms

**Acceptance Criteria:**
- User can type "add buy milk" and task is created
- Bot confirms task creation with explicit message
- Task appears in both chat and dashboard
- Variations like "create", "remember", "new task" work

### US-2: Conversational Task Viewing
**As a** user
**I want to** ask to see my tasks in natural language
**So that** I can quickly review my todo list

**Acceptance Criteria:**
- "Show my tasks" displays all tasks
- "What's pending?" shows incomplete tasks
- "What have I completed?" shows done tasks
- Tasks are formatted in readable way

### US-3: Task Completion via Chat
**As a** user
**I want to** mark tasks complete through conversation
**So that** I don't have to switch to dashboard

**Acceptance Criteria:**
- "Mark task 3 as done" completes the task
- "Complete the meeting task" finds and completes it
- Bot confirms what was marked complete
- Dashboard reflects the change immediately

### US-4: Task Deletion via Chat
**As a** user
**I want to** delete tasks by chatting
**So that** I can clean up my list naturally

**Acceptance Criteria:**
- "Delete task 5" removes the task
- "Remove the groceries task" works
- Bot confirms deletion
- Task disappears from dashboard

### US-5: Task Updates via Chat
**As a** user
**I want to** modify tasks through conversation
**So that** I can update details without forms

**Acceptance Criteria:**
- "Change task 1 to 'Call mom tonight'" updates title
- "Update description of task 2" works
- Bot confirms the change
- Dashboard shows updated task

### US-6: Conversation Persistence
**As a** user
**I want to** continue conversations across sessions
**So that** I don't lose context

**Acceptance Criteria:**
- Server restart doesn't lose chat history
- Refreshing page loads previous messages
- Conversations tied to user account
- Messages display in chronological order

---

## 3. Functional Requirements

### 3.1 Backend Requirements

#### 3.1.1 Database Schema Extensions

**New Tables:**

1. **conversations**
   - `id` (integer, PK, auto-increment)
   - `user_id` (string, FK to users.id, indexed)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

2. **messages**
   - `id` (integer, PK, auto-increment)
   - `conversation_id` (integer, FK to conversations.id, indexed)
   - `user_id` (string, FK to users.id, indexed)
   - `role` (string: "user" or "assistant")
   - `content` (text)
   - `created_at` (timestamp)

**Indexes:**
- `messages.conversation_id` (for fast history retrieval)
- `conversations.user_id` (for user filtering)
- `messages.created_at` (for chronological ordering)

#### 3.1.2 Service Layer

Create `backend/services/task_service.py` with:

- `async create_task(user_id, title, description=None)` → Task
- `async list_tasks(user_id, status='all')` → List[Task]
- `async get_task(user_id, task_id)` → Task
- `async update_task(user_id, task_id, **updates)` → Task
- `async delete_task(user_id, task_id)` → bool
- `async toggle_complete(user_id, task_id)` → Task

**Purpose:** Reusable logic for both REST API and MCP tools

#### 3.1.3 MCP Server

Location: `backend/mcp_server/`

**Files:**
- `__init__.py` - Package initialization
- `server.py` - MCP server setup with Official MCP SDK
- `tools.py` - MCP tool implementations
- `config.py` - MCP configuration

**Required Tools:**

1. **add_task**
   - Parameters: `user_id` (string), `title` (string), `description` (string, optional)
   - Returns: `{"task_id": int, "status": "created", "title": string}`
   - Validation: title 1-200 chars, description max 1000 chars

2. **list_tasks**
   - Parameters: `user_id` (string), `status` (string, optional: "all"/"pending"/"completed")
   - Returns: Array of task objects
   - Filtering: By user_id and status

3. **complete_task**
   - Parameters: `user_id` (string), `task_id` (integer)
   - Returns: `{"task_id": int, "status": "completed", "title": string}`
   - Validation: Task exists and belongs to user

4. **delete_task**
   - Parameters: `user_id` (string), `task_id` (integer)
   - Returns: `{"task_id": int, "status": "deleted", "title": string}`
   - Validation: Task exists and belongs to user

5. **update_task**
   - Parameters: `user_id` (string), `task_id` (integer), `title` (string, optional), `description` (string, optional)
   - Returns: `{"task_id": int, "status": "updated", "title": string}`
   - Validation: At least one field to update

**Security:** All tools must verify user_id ownership

#### 3.1.4 Chat Endpoint

**Endpoint:** `POST /api/{user_id}/chat`

**Request:**
```json
{
  "conversation_id": 123,  // optional
  "message": "Add buy groceries"
}
```

**Response:**
```json
{
  "conversation_id": 123,
  "response": "I've added 'Buy groceries' to your list!",
  "tool_calls": [
    {
      "tool": "add_task",
      "parameters": {"title": "Buy groceries"}
    }
  ]
}
```

**Flow:**
1. Verify JWT token
2. Get or create conversation
3. Load last 10 messages from DB
4. Append user message
5. Save user message to DB
6. Call OpenAI Agents SDK with MCP tools
7. Save assistant response to DB
8. Return response

**Stateless Requirement:** No in-memory state; all data from DB

#### 3.1.5 OpenAI Agents SDK Integration

- Initialize OpenAI client with API key
- Configure agent with MCP tools
- Build message array from history
- Handle agent responses and tool calls
- Parse and return structured response

### 3.2 Frontend Requirements

#### 3.2.1 Chat Page

**Location:** `frontend/app/chat/page.tsx`

**Features:**
- Protected route (requires auth)
- OpenAI ChatKit integration
- Message history display
- Real-time responses
- Loading states
- Error handling

**UI Components:**
- Chat message list (scrollable)
- Input field with send button
- User/assistant message bubbles
- Typing indicator
- Error messages

#### 3.2.2 ChatKit Configuration

**Environment Variables:**
```env
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Domain Allowlist:** Production URL must be added to OpenAI settings

#### 3.2.3 API Client

**Location:** `frontend/lib/chat-api.ts`

**Functions:**
- `sendMessage(userId, conversationId, message)` → ChatResponse
- `getConversations(userId)` → Conversation[]
- `getConversationHistory(conversationId)` → Message[]

**Authentication:** Include JWT token in all requests

#### 3.2.4 Navigation

- Add "Chat Assistant" link to main nav
- Update layout to include chat route
- Maintain "Tasks" link for dashboard
- Responsive mobile menu

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Chat response time: < 3 seconds (including OpenAI API call)
- Message history load: < 500ms
- Database queries: Indexed for fast retrieval
- Conversation history limit: 10 messages per request

### 4.2 Scalability

- Stateless server architecture
- No session storage in memory
- Horizontal scaling ready
- Database connection pooling

### 4.3 Security

- JWT authentication on all endpoints
- User isolation enforced in MCP tools
- API keys in backend only (never frontend)
- Input validation on all parameters
- SQL injection prevention (SQLModel handles this)

### 4.4 Reliability

- Server restart doesn't lose conversations
- Conversation persistence to database
- Error handling with user-friendly messages
- Graceful degradation if OpenAI API fails

### 4.5 Usability

- Natural language understanding
- Multiple phrasing support
- Explicit action confirmations
- Helpful error messages
- Context-aware responses

---

## 5. Technical Constraints

### 5.1 Technology Stack

- **Frontend:** Next.js 16+ (App Router), TypeScript, OpenAI ChatKit
- **Backend:** FastAPI, SQLModel
- **Database:** Neon Serverless PostgreSQL
- **AI:** OpenAI Agents SDK
- **MCP:** Official MCP Python SDK
- **Auth:** Better Auth JWT

### 5.2 Architecture Constraints

- **Stateless server** - No in-memory state
- **MCP-first** - All AI-task interactions via MCP tools
- **Evolutionary** - Phase II remains functional
- **Service layer** - Shared business logic

### 5.3 Environment Variables

**Backend:**
```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
OPENAI_API_KEY=sk-proj-...
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...
BETTER_AUTH_SECRET=...
DATABASE_URL=postgresql://...
```

---

## 6. Testing Requirements

### 6.1 MCP Tools Testing

- Unit test each tool independently
- Mock database calls
- Test user authorization
- Test error handling
- Test parameter validation

### 6.2 Chat Endpoint Testing

- Integration test with OpenAI SDK (mocked)
- Test conversation creation
- Test message persistence
- Test authentication
- Test user isolation

### 6.3 Frontend Testing

- Manual testing in browser
- Test ChatKit integration
- Test API client calls
- Test error states
- Test loading states

### 6.4 End-to-End Testing

- Create task via chat → appears in dashboard
- Create task via dashboard → manageable via chat
- Mark complete via chat → updates dashboard
- Delete via chat → removes from dashboard

---

## 7. Integration Points

### 7.1 Phase II Dependencies

**Uses from Phase II:**
- Task model (no changes)
- User authentication (Better Auth JWT)
- Database connection
- CORS configuration

**Reuses from Phase II:**
- Task CRUD logic (via service layer)
- Database models
- JWT verification middleware

### 7.2 New External Services

**OpenAI:**
- Agents SDK for AI logic
- ChatKit for frontend UI
- API key required

**MCP:**
- Official Python SDK
- Tool registration
- Server setup

---

## 8. Deployment Requirements

### 8.1 Backend Deployment

- Deploy to Railway/Render
- Set environment variables
- Ensure DATABASE_URL accessible
- Verify OpenAI API key

### 8.2 Frontend Deployment

- Deploy to Vercel
- Set NEXT_PUBLIC_* environment variables
- Add production domain to OpenAI allowlist
- Get ChatKit domain key

### 8.3 Database Migrations

- Run migration to add conversations table
- Run migration to add messages table
- Verify indexes created
- No changes to existing Phase II tables

---

## 9. Success Metrics

### 9.1 Functional Success

- [ ] All 5 MCP tools working
- [ ] Chat endpoint responds correctly
- [ ] Conversation history persists
- [ ] ChatKit UI functional
- [ ] Natural language commands understood
- [ ] Tasks sync between chat and dashboard

### 9.2 Quality Success

- [ ] Code follows constitution principles
- [ ] All specs documented
- [ ] CLAUDE.md files updated
- [ ] README reflects Phase III
- [ ] No regressions in Phase II

### 9.3 Deployment Success

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with ChatKit working
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Demo video < 90 seconds

---

## 10. Out of Scope

**Not in Phase III:**
- Voice input (Bonus feature)
- Urdu language support (Bonus feature)
- Task reminders
- Recurring tasks
- Advanced features (Phase V)
- Real-time sync across clients (Phase V with Kafka)

---

## 11. Risks and Mitigations

### Risk 1: OpenAI API Rate Limits
**Mitigation:** Implement retry logic, show user-friendly error

### Risk 2: ChatKit Domain Configuration
**Mitigation:** Clear documentation, deploy frontend first

### Risk 3: Conversation State Complexity
**Mitigation:** Follow stateless pattern strictly, test server restarts

### Risk 4: MCP Tool Errors
**Mitigation:** Comprehensive error handling, return friendly messages

### Risk 5: Phase II Regression
**Mitigation:** Don't modify existing routes, test Phase II after integration

---

## 12. Acceptance Checklist

**Before considering Phase III complete:**

**Backend:**
- [ ] Conversation and Message models created
- [ ] Service layer extracts task logic
- [ ] All 5 MCP tools implemented
- [ ] Chat endpoint working with OpenAI Agents SDK
- [ ] Stateless architecture verified (restart test)
- [ ] JWT authentication integrated
- [ ] User isolation enforced in all MCP tools

**Frontend:**
- [ ] /chat page created with ChatKit
- [ ] Natural language commands work
- [ ] Bot confirms actions
- [ ] Navigation includes chat link
- [ ] API client handles chat requests
- [ ] Error states displayed properly

**Integration:**
- [ ] Tasks from chat appear in dashboard
- [ ] Tasks from dashboard manageable via chat
- [ ] Same auth for both interfaces
- [ ] Conversation history loads correctly
- [ ] Server restart doesn't lose data

**Documentation:**
- [ ] CONSTITUTION-PHASE3.md complete
- [ ] specs-history/phase-3-chatbot/ complete
- [ ] README updated for Phase III
- [ ] Backend CLAUDE.md updated
- [ ] Frontend CLAUDE.md updated
- [ ] API documentation includes chat endpoint

**Deployment:**
- [ ] Backend deployed with env vars
- [ ] Frontend deployed to Vercel
- [ ] OpenAI domain allowlist configured
- [ ] Database migrations applied
- [ ] Demo video recorded (< 90 seconds)
- [ ] Submission form filled

---

**Specification Complete**
**Next:** Create Implementation Plan
**Then:** Break into Tasks
**Finally:** Implement via Claude Code
