# Phase III Implementation Plan: AI-Powered Todo Chatbot

> **Created:** December 2025
> **For:** Phase III - AI Chatbot Integration
> **Approach:** Evolutionary (Add to Phase II, don't replace)

---

## Overview

This plan outlines the step-by-step implementation of the AI-powered chatbot feature while maintaining full Phase II functionality. The implementation follows a bottom-up approach: Database → Service Layer → MCP Server → Chat Endpoint → Frontend.

---

## Prerequisites

- [x] Phase II completed and functional
- [x] Constitution and Specification reviewed
- [x] OpenAI API key obtained
- [ ] Dependencies identified
- [ ] Current codebase understood

---

## Implementation Phases

### Phase 1: Database Foundation (Day 1)
**Goal:** Add conversation and message persistence
**Complexity:** Simple
**Files:**
- `backend/models.py` (update)
- `backend/migrations/003_add_chat_tables.py` (create)
- `backend/database.py` (verify)

### Phase 2: Service Layer Extraction (Day 1-2)
**Goal:** Create reusable task business logic
**Complexity:** Medium
**Files:**
- `backend/services/__init__.py` (create)
- `backend/services/task_service.py` (create)
- `backend/routes/tasks.py` (update - use service)

### Phase 3: MCP Server Implementation (Day 2-3)
**Goal:** Build MCP tools for AI-task interaction
**Complexity:** Medium
**Files:**
- `backend/mcp_server/__init__.py` (create)
- `backend/mcp_server/server.py` (create)
- `backend/mcp_server/tools.py` (create)
- `backend/mcp_server/config.py` (create)

### Phase 4: Chat Endpoint with OpenAI Agents SDK (Day 3-4)
**Goal:** Stateless chat endpoint with AI integration
**Complexity:** Complex
**Files:**
- `backend/routes/chat.py` (create)
- `backend/main.py` (update - register route)
- `backend/requirements.txt` (update - add OpenAI SDK)

### Phase 5: Frontend ChatKit Integration (Day 4-5)
**Goal:** Conversational UI with OpenAI ChatKit
**Complexity:** Medium
**Files:**
- `frontend/app/chat/page.tsx` (create)
- `frontend/components/ChatInterface.tsx` (create)
- `frontend/lib/chat-api.ts` (create)
- `frontend/app/layout.tsx` (update - add nav link)
- `frontend/package.json` (update - add ChatKit)

### Phase 6: Testing and Integration (Day 5-6)
**Goal:** Verify all components work together
**Complexity:** Medium
**Files:**
- `backend/tests/test_mcp_tools.py` (create)
- `backend/tests/test_chat_endpoint.py` (create)
- Manual testing script

### Phase 7: Documentation and Deployment (Day 6-7)
**Goal:** Update docs and deploy
**Complexity:** Simple
**Files:**
- `README.md` (update)
- `backend/CLAUDE.md` (update)
- `frontend/CLAUDE.md` (update)
- Deployment guides

---

## Detailed Implementation Steps

### PHASE 1: Database Foundation

#### Step 1.1: Add Conversation Model
**What:** Create Conversation model in models.py
**Where:** `backend/models.py`
**How:**
```python
class Conversation(SQLModel, table=True):
    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```
**Validation:** Model imports and compiles without errors

#### Step 1.2: Add Message Model
**What:** Create Message model in models.py
**Where:** `backend/models.py`
**How:**
```python
class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(index=True, foreign_key="conversations.id")
    user_id: str = Field(index=True, foreign_key="users.id")
    role: str = Field(max_length=20)  # "user" or "assistant"
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
```
**Validation:** Model imports and compiles without errors

#### Step 1.3: Create Database Migration
**What:** Migration script to create new tables
**Where:** `backend/migrations/003_add_chat_tables.py`
**How:**
- Check if tables exist
- Create conversations table with indexes
- Create messages table with indexes
- Make idempotent (safe to run multiple times)
**Validation:** Run migration, verify tables created in Neon DB

#### Step 1.4: Verify Database Connection
**What:** Ensure database.py handles new models
**Where:** `backend/database.py`
**How:** Check create_db_and_tables includes new models
**Validation:** App starts without errors, tables exist

---

### PHASE 2: Service Layer Extraction

#### Step 2.1: Create Service Layer Structure
**What:** Create services package
**Where:** `backend/services/__init__.py`
**How:**
```python
from .task_service import (
    create_task,
    list_tasks,
    get_task,
    update_task,
    delete_task,
    toggle_complete,
)
```
**Validation:** Package imports correctly

#### Step 2.2: Extract Task CRUD Functions
**What:** Move business logic from routes to service
**Where:** `backend/services/task_service.py`
**How:**
```python
async def create_task(
    user_id: str,
    title: str,
    description: str = None,
    db: Session = Depends(get_db)
) -> Task:
    """Create a new task for the user."""
    task = Task(
        user_id=user_id,
        title=title,
        description=description
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

async def list_tasks(user_id: str, status: str = "all", db: Session = Depends(get_db)) -> List[Task]:
    """List tasks with optional status filter."""
    query = db.query(Task).filter(Task.user_id == user_id)
    if status == "pending":
        query = query.filter(Task.completed == False)
    elif status == "completed":
        query = query.filter(Task.completed == True)
    return query.order_by(Task.created_at.desc()).all()

# ... other functions
```
**Validation:** Functions work independently

#### Step 2.3: Update Routes to Use Service
**What:** Refactor routes/tasks.py to call service layer
**Where:** `backend/routes/tasks.py`
**How:**
```python
from services.task_service import create_task, list_tasks, ...

@router.post("/api/{user_id}/tasks")
async def create_task_endpoint(
    user_id: str,
    task_data: TaskCreate,
    token: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    # Verify user
    if token["user_id"] != user_id:
        raise HTTPException(403)

    # Call service layer
    task = await create_task(user_id, task_data.title, task_data.description, db)
    return task
```
**Validation:** Phase II endpoints still work, no regressions

---

### PHASE 3: MCP Server Implementation

#### Step 3.1: Create MCP Server Structure
**What:** Set up MCP server package
**Where:** `backend/mcp_server/__init__.py`
**How:**
```python
from .server import app as mcp_app
from .tools import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)
```
**Validation:** Package structure created

#### Step 3.2: Implement MCP Server Setup
**What:** Initialize MCP server with Official SDK
**Where:** `backend/mcp_server/server.py`
**How:**
```python
from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("todo-mcp-server")

# Register tools (imported from tools.py)
app.register_tool(add_task)
app.register_tool(list_tasks)
app.register_tool(complete_task)
app.register_tool(delete_task)
app.register_tool(update_task)
```
**Validation:** Server initializes without errors

#### Step 3.3: Implement add_task Tool
**What:** MCP tool for creating tasks
**Where:** `backend/mcp_server/tools.py`
**How:**
```python
from mcp.server import tool
from services.task_service import create_task

@tool
async def add_task(user_id: str, title: str, description: str = None):
    """
    Create a new task for the user.

    Args:
        user_id: User ID who owns the task
        title: Task title (1-200 chars)
        description: Optional task description

    Returns:
        dict: {"task_id": int, "status": "created", "title": str}
    """
    # Validation
    if not title or len(title) > 200:
        return {"error": "Invalid title length"}

    # Call service layer
    task = await create_task(user_id, title, description)

    return {
        "task_id": task.id,
        "status": "created",
        "title": task.title
    }
```
**Validation:** Tool can be called independently, returns correct format

#### Step 3.4: Implement Remaining MCP Tools
**What:** Implement list, complete, delete, update tools
**Where:** `backend/mcp_server/tools.py`
**How:** Follow same pattern as add_task:
- Use @tool decorator
- Call service layer functions
- Return structured responses
- Handle errors gracefully
- Verify user_id ownership
**Validation:** All 5 tools work independently

---

### PHASE 4: Chat Endpoint with OpenAI Agents SDK

#### Step 4.1: Add Dependencies
**What:** Install OpenAI SDK and MCP SDK
**Where:** `backend/requirements.txt`
**How:**
```txt
openai>=1.0.0
mcp>=0.1.0
```
**Validation:** `pip install -r requirements.txt` succeeds

#### Step 4.2: Create Chat Route Structure
**What:** Set up chat endpoint file
**Where:** `backend/routes/chat.py`
**How:**
```python
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session
import openai
from database import get_db
from middleware.auth import verify_jwt

router = APIRouter(prefix="/api/{user_id}/chat", tags=["chat"])

class ChatRequest(BaseModel):
    conversation_id: int | None = None
    message: str

class ChatResponse(BaseModel):
    conversation_id: int
    response: str
    tool_calls: list = []
```
**Validation:** Router imports correctly

#### Step 4.3: Implement Conversation Management
**What:** Functions to manage conversations in DB
**Where:** `backend/routes/chat.py`
**How:**
```python
async def get_or_create_conversation(
    user_id: str,
    conversation_id: int | None,
    db: Session
) -> int:
    """Get existing or create new conversation."""
    if conversation_id:
        conv = db.query(Conversation).filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        ).first()
        if conv:
            return conv.id

    # Create new conversation
    conv = Conversation(user_id=user_id)
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv.id

async def load_conversation_history(
    conversation_id: int,
    limit: int = 10,
    db: Session = None
) -> list:
    """Load last N messages from conversation."""
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at.desc()).limit(limit).all()

    # Reverse to chronological order
    messages = list(reversed(messages))

    # Convert to OpenAI format
    return [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]

async def save_message(
    conversation_id: int,
    user_id: str,
    role: str,
    content: str,
    db: Session
):
    """Save a message to the database."""
    msg = Message(
        conversation_id=conversation_id,
        user_id=user_id,
        role=role,
        content=content
    )
    db.add(msg)
    db.commit()
```
**Validation:** Functions can load/save messages

#### Step 4.4: Integrate OpenAI Agents SDK
**What:** Chat endpoint with AI agent
**Where:** `backend/routes/chat.py`
**How:**
```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("")
async def chat(
    user_id: str,
    request: ChatRequest,
    token: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    # Verify user
    if token["user_id"] != user_id:
        raise HTTPException(403, "Unauthorized")

    # Get or create conversation
    conv_id = await get_or_create_conversation(user_id, request.conversation_id, db)

    # Load history
    history = await load_conversation_history(conv_id, db=db)

    # Save user message
    await save_message(conv_id, user_id, "user", request.message, db)

    # Build messages for agent
    messages = history + [{"role": "user", "content": request.message}]

    # Call OpenAI with MCP tools
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=[
            # MCP tools registered here
        ]
    )

    # Parse response
    assistant_message = response.choices[0].message.content

    # Save assistant response
    await save_message(conv_id, user_id, "assistant", assistant_message, db)

    return ChatResponse(
        conversation_id=conv_id,
        response=assistant_message,
        tool_calls=[]
    )
```
**Validation:** Endpoint responds with AI-generated messages

#### Step 4.5: Register Chat Router
**What:** Add chat route to main app
**Where:** `backend/main.py`
**How:**
```python
from routes import tasks, chat

app.include_router(tasks.router)
app.include_router(chat.router)  # ADD THIS
```
**Validation:** Chat endpoint accessible at /api/{user_id}/chat

---

### PHASE 5: Frontend ChatKit Integration

#### Step 5.1: Install ChatKit
**What:** Add OpenAI ChatKit dependency
**Where:** `frontend/package.json`
**How:**
```bash
npm install @openai/chatkit
```
**Validation:** Package installs successfully

#### Step 5.2: Create Chat API Client
**What:** API client for chat operations
**Where:** `frontend/lib/chat-api.ts`
**How:**
```typescript
export async function sendMessage(
  userId: string,
  conversationId: number | null,
  message: string
) {
  const token = getAuthToken();  // From auth context

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${userId}/chat`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}
```
**Validation:** Function can call chat API

#### Step 5.3: Create Chat Page
**What:** Chat interface with ChatKit
**Where:** `frontend/app/chat/page.tsx`
**How:**
```typescript
'use client';

import { ChatKit } from '@openai/chatkit';
import { useState } from 'react';
import { sendMessage } from '@/lib/chat-api';

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<number | null>(null);

  const handleSendMessage = async (message: string) => {
    const userId = getUserId();  // From auth context
    const response = await sendMessage(userId, conversationId, message);

    if (!conversationId) {
      setConversationId(response.conversation_id);
    }

    return response.response;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with Todo Assistant</h1>
      <ChatKit
        apiKey={process.env.NEXT_PUBLIC_OPENAI_DOMAIN_KEY}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
```
**Validation:** Chat UI renders and can send messages

#### Step 5.4: Update Navigation
**What:** Add chat link to navbar
**Where:** `frontend/app/layout.tsx`
**How:**
```typescript
<nav>
  <Link href="/dashboard">Tasks</Link>
  <Link href="/chat">Chat Assistant</Link>  {/* ADD THIS */}
  <button onClick={logout}>Logout</button>
</nav>
```
**Validation:** Navigation shows chat link, routes correctly

---

### PHASE 6: Testing and Integration

#### Step 6.1: Test MCP Tools Independently
**What:** Unit tests for each MCP tool
**Where:** `backend/tests/test_mcp_tools.py`
**How:**
```python
import pytest
from mcp_server.tools import add_task, list_tasks

@pytest.mark.asyncio
async def test_add_task():
    result = await add_task("user123", "Test task")
    assert result["status"] == "created"
    assert "task_id" in result
```
**Validation:** All tool tests pass

#### Step 6.2: Test Chat Endpoint
**What:** Integration test for chat flow
**Where:** `backend/tests/test_chat_endpoint.py`
**How:**
```python
def test_chat_create_task():
    response = client.post(
        "/api/user123/chat",
        json={"message": "add buy milk"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert "conversation_id" in response.json()
```
**Validation:** Chat endpoint tests pass

#### Step 6.3: Manual End-to-End Testing
**What:** Test complete user journey
**How:**
1. Open frontend at /chat
2. Type "add buy groceries"
3. Verify task created
4. Go to /dashboard
5. Verify task appears in list
6. Mark complete via dashboard
7. Ask chat "show my tasks"
8. Verify completion reflected
**Validation:** All flows work correctly

---

### PHASE 7: Documentation and Deployment

#### Step 7.1: Update README
**What:** Add Phase III documentation
**Where:** `README.md`
**How:**
- Add Phase III overview section
- Document chat endpoint
- Add natural language command examples
- Update technology stack
- Add ChatKit setup instructions
**Validation:** README is comprehensive

#### Step 7.2: Update Backend CLAUDE.md
**What:** Add MCP and chat endpoint guidelines
**Where:** `backend/CLAUDE.md`
**How:**
- Document MCP server structure
- Explain chat endpoint flow
- Add service layer patterns
- Include OpenAI SDK usage
**Validation:** Guidelines are clear

#### Step 7.3: Update Frontend CLAUDE.md
**What:** Add ChatKit integration guide
**Where:** `frontend/CLAUDE.md`
**How:**
- Document ChatKit setup
- Explain chat API client
- Add chat page structure
**Validation:** Guidelines are clear

#### Step 7.4: Deploy Backend
**What:** Deploy with new environment variables
**How:**
- Deploy to Railway/Render
- Set OPENAI_API_KEY
- Run database migrations
- Verify health endpoint
**Validation:** Backend accessible, chat endpoint works

#### Step 7.5: Deploy Frontend
**What:** Deploy with ChatKit configuration
**How:**
- Deploy to Vercel
- Set NEXT_PUBLIC_OPENAI_DOMAIN_KEY
- Add production URL to OpenAI allowlist
- Get domain key
**Validation:** Frontend accessible, ChatKit works

#### Step 7.6: Create Demo Video
**What:** 90-second demonstration
**How:**
- 0-15s: Introduction
- 15-45s: Natural language commands
- 45-70s: Integration with dashboard
- 70-90s: Spec overview
**Validation:** Video under 90 seconds, shows all features

---

## Quality Checklist

- [ ] Type hints added to all new functions
- [ ] Docstrings written for all modules
- [ ] Error handling comprehensive
- [ ] Edge cases handled
- [ ] Code follows PEP 8 (backend)
- [ ] Code follows Next.js conventions (frontend)
- [ ] No hardcoded values (use env vars)
- [ ] Security: user_id verified everywhere
- [ ] Performance: database queries optimized
- [ ] Phase II still works (no regressions)

---

## Risks & Mitigations

**Risk 1:** OpenAI API rate limits or errors
- **Mitigation:** Implement retry logic, show user-friendly errors

**Risk 2:** ChatKit domain configuration issues
- **Mitigation:** Deploy frontend first, document steps clearly

**Risk 3:** Conversation state complexity
- **Mitigation:** Follow stateless pattern strictly, test server restarts

**Risk 4:** MCP tool authorization gaps
- **Mitigation:** Verify user_id in every tool, unit test security

**Risk 5:** Phase II regression
- **Mitigation:** Don't modify existing routes, test after integration

---

## Success Criteria

- [x] Specification complete and approved
- [ ] All implementation steps completed
- [ ] All tests passing
- [ ] Code reviewed against constitution
- [ ] Documentation updated
- [ ] Deployed and accessible
- [ ] Demo video created
- [ ] Phase II still functional

---

**Plan Complete**
**Next:** Break into detailed tasks
**Then:** Implement via Claude Code
