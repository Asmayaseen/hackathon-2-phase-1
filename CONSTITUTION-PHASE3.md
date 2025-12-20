# Phase III Constitution - AI-Powered Todo Chatbot

> **Version:** 3.0
> **Phase:** III - AI Chatbot Integration
> **Created:** December 2025
> **Methodology:** Spec-Driven Development with Claude Code

---

## 🎯 Mission Statement

Transform the Phase II full-stack todo application into an intelligent conversational interface that allows users to manage their tasks through natural language, powered by OpenAI Agents SDK and Model Context Protocol (MCP).

**Core Principle:** "From clicks to conversations - making todo management as natural as talking to a friend."

---

## 🏗️ Architectural Principles

### 1. Stateless Architecture

**Rule:** Server MUST NOT store conversation state in memory
**Why:** Scalability, resilience, horizontal scaling capability
**Implementation:** Every request loads full context from database
**Exception:** None - this is non-negotiable

```python
# ✅ CORRECT - Stateless
@app.post("/api/{user_id}/chat")
async def chat(user_id: str, request: ChatRequest):
    # Load history from DB every time
    history = load_conversation_history(request.conversation_id)
    # Process with fresh context
    response = await agent.run(history + [request.message])
    # Save to DB
    save_messages(conversation_id, user_message, assistant_response)
    return response

# ❌ WRONG - Stateful
conversation_cache = {}  # DON'T DO THIS!
```

### 2. MCP-First Tool Design

**Rule:** All task operations MUST go through MCP tools
**Why:** Standardized interface, AI-friendly, testable
**Implementation:** 5 core MCP tools (add, list, complete, delete, update)
**Exception:** Health checks and auth endpoints

```python
# ✅ CORRECT - MCP Tool
@mcp.tool()
async def add_task(user_id: str, title: str, description: str = None):
    """AI agent calls this to create tasks"""
    return await task_service.create_task(user_id, title, description)

# ❌ WRONG - Direct database access from agent
async def handle_add_task(user_id, title):
    db.execute("INSERT INTO tasks...")  # DON'T DO THIS!
```

### 3. Evolutionary Not Revolutionary

**Rule:** Phase II code MUST remain functional
**Why:** Users should have choice of UI vs Chat
**Implementation:** Add, don't replace
**Exception:** Bug fixes in Phase II code

```
Phase II (Keep)              Phase III (Add)
---------------              ----------------
/dashboard → Task List       /chat → Chatbot
/api/tasks → REST API        /api/chat → Chat Endpoint
                            /mcp_server/ → Tools
```

### 4. Service Layer Pattern

**Rule:** Business logic MUST be in service layer
**Why:** Reusability across REST API and MCP tools
**Implementation:** Create backend/services/task_service.py
**Exception:** Simple utility functions

```python
# ✅ CORRECT - Service Layer
# backend/services/task_service.py
async def create_task(user_id: str, title: str, description: str = None):
    """Shared business logic"""
    # Validation, database operations, etc.
    pass

# backend/routes/tasks.py (REST API)
from services.task_service import create_task

# backend/mcp_server/tools.py (MCP Tools)
from services.task_service import create_task  # REUSE!
```

---

## 🔐 Security Principles

### 1. Zero Trust - User Isolation

**Rule:** Every operation MUST verify user_id
**Implementation:** JWT token verification + user_id validation
**Exception:** None

```python
# ✅ CORRECT - User verification
@app.post("/api/{user_id}/chat")
async def chat(user_id: str, token: str = Depends(verify_jwt)):
    if token.user_id != user_id:
        raise HTTPException(403, "Unauthorized")
    # Process request
```

### 2. MCP Tool Authorization

**Rule:** All MCP tools MUST validate user_id parameter
**Why:** AI could be manipulated to access other users' data
**Implementation:** Each tool checks user ownership

```python
# ✅ CORRECT - MCP tool with validation
@mcp.tool()
async def delete_task(user_id: str, task_id: int):
    task = await db.get_task(task_id)
    if task.user_id != user_id:
        return {"error": "Task not found"}  # Don't reveal existence
    await db.delete(task)
```

### 3. Secure API Keys

**Rule:** OpenAI API key MUST be in backend only
**Why:** Frontend exposure = billing theft
**Implementation:** Environment variables, never in git

```env
# backend/.env
OPENAI_API_KEY=sk-proj-...  # Server-side only

# frontend/.env.local
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...  # ChatKit domain key only
```

---

## 🤖 AI Agent Principles

### 1. Natural Language Understanding

**Rule:** Support multiple phrasings for same intent
**Implementation:** Agent should understand variations

```
Intent: Add Task
Phrases:
  - "Add buy milk"
  - "Create a task for buying milk"
  - "Remember to buy milk"
  - "I need to buy milk"
  - "Put 'buy milk' on my list"
```

### 2. Explicit Confirmations

**Rule:** Agent MUST confirm actions explicitly
**Why:** Build user trust, prevent misunderstandings
**Implementation:** Every tool call gets confirmation response

```python
# ✅ CORRECT - Explicit confirmation
response = "I've added 'Buy groceries' to your todo list!"

# ❌ WRONG - Vague response
response = "Done."
```

### 3. Graceful Error Handling

**Rule:** Never expose technical errors to user
**Implementation:** Friendly error messages

```python
# ✅ CORRECT
if task_not_found:
    return "I couldn't find that task. Would you like to see all your tasks?"

# ❌ WRONG
if task_not_found:
    raise Exception("Task ID 123 not found in database")
```

### 4. Context Awareness

**Rule:** Include recent conversation history
**Implementation:** Last 10 messages for context
**Why:** Handle follow-up questions

```
User: "Add buy milk"
Bot: "Added! Anything else?"
User: "Make it urgent"  ← Needs context to know "it" = "buy milk"
```

---

## 💾 Database Principles

### 1. Conversation Persistence

**Rule:** ALL messages MUST be saved to database
**Why:** User expectations, debugging, analytics
**Implementation:** Save before responding

```python
# ✅ CORRECT - Save first, respond later
await save_user_message(conversation_id, user_message)
response = await agent.run(messages)
await save_assistant_message(conversation_id, response)
return response
```

### 2. Message Ordering

**Rule:** Messages MUST have timestamp and ordering
**Implementation:** Use auto-incrementing ID + timestamp

```sql
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,  -- Auto-increment ensures order
    conversation_id INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    role VARCHAR(20),
    content TEXT
);
```

### 3. Soft Deletes for Conversations

**Rule:** Never hard-delete conversation history
**Why:** User may want to restore, debugging
**Implementation:** Add `deleted_at` column

---

## 🎯 Success Criteria

### Definition of Done (Phase III)

**Backend:**
- ✅ 5 MCP tools implemented and tested
- ✅ Chat endpoint returns proper responses
- ✅ Conversation history persists to database
- ✅ Stateless architecture (server restarts don't lose state)
- ✅ JWT authentication integrated

**Frontend:**
- ✅ /chat page renders ChatKit
- ✅ Natural language commands work
- ✅ Bot provides confirmations
- ✅ Navigation between /dashboard and /chat works

**Integration:**
- ✅ Tasks created via chat appear in dashboard
- ✅ Tasks created via dashboard manageable via chat
- ✅ Same authentication for both interfaces

**Quality:**
- ✅ All specs documented
- ✅ CLAUDE.md updated
- ✅ README reflects Phase III
- ✅ Demo video under 90 seconds

---

## ⚠️ Anti-Patterns (What NOT to Do)

### 1. ❌ Duplicate Task Logic

```python
# DON'T create separate task creation logic
# backend/routes/tasks.py
def create_task_rest(...):  # One implementation
    ...

# backend/mcp_server/tools.py
def create_task_mcp(...):  # Another implementation ❌
    ...

# DO: Share via service layer
from services.task_service import create_task  # Reuse! ✅
```

### 2. ❌ Client-Side AI Keys

```javascript
// frontend/lib/openai.ts
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY  // ❌ NEVER!
});
```

### 3. ❌ In-Memory Conversation Storage

```python
# ❌ DON'T DO THIS
conversations = {}  # Lost on restart!

# ✅ DO THIS
async def get_conversation(id):
    return await db.query("SELECT * FROM conversations WHERE id = $1", id)
```

### 4. ❌ Modifying Phase II Code

```python
# backend/routes/tasks.py

# ❌ DON'T CHANGE THIS
@router.post("/api/{user_id}/tasks")
async def create_task(...):  # Keep as-is!
    ...

# ✅ ADD NEW ROUTE
@router.post("/api/{user_id}/chat")  # New endpoint
async def chat(...):
    ...
```

---

## 🎬 Deployment Principles

### 1. Staged Rollout

```
1. Deploy Phase III backend (chat endpoint)
2. Test MCP tools independently
3. Deploy Phase III frontend (/chat page)
4. Test integration
5. Phase II remains available throughout
```

### 2. Rollback Strategy

```
- Phase III fails? Phase II still works
- Remove /chat route from frontend
- Disable chat endpoint
- Users continue with dashboard
```

---

## 📚 Key References

- **OpenAI Agents SDK:** Platform documentation
- **Official MCP SDK:** github.com/modelcontextprotocol/python-sdk
- **ChatKit:** platform.openai.com/docs/guides/chatkit
- **FastAPI:** fastapi.tiangolo.com
- **SQLModel:** sqlmodel.tiangolo.com

---

**Remember:**
- Specification before implementation
- Stateless architecture is non-negotiable
- MCP tools are the single source of truth for task operations
- Phase II must continue to work
- Security: verify user_id at every step

---

**Constitution Version:** 3.0
**Effective Date:** December 2025
**Next Review:** After Phase III completion

🚀 **Let's Build This!**
