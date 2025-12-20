# Phase III Implementation Tasks

> **Project:** Evolution of Todo - Phase III
> **Methodology:** Spec-Driven Development
> **Status:** Ready for Implementation

---

## Task Organization

Tasks are organized by phase and numbered sequentially. Each task includes:
- **ID:** Unique task identifier
- **Description:** What needs to be done
- **Preconditions:** What must be done first
- **Artifacts:** Files to create/modify
- **Validation:** How to verify completion
- **Spec Reference:** Link back to specification

---

## PHASE 1: Database Foundation

### Task T-101: Add Conversation Model

**ID:** T-101
**Description:** Create SQLModel Conversation class for chat persistence
**Preconditions:** Phase II database models working
**Artifacts:**
- `backend/models.py` (update)

**Implementation:**
```python
# Add to backend/models.py
class Conversation(SQLModel, table=True):
    """Conversation model for chat sessions."""
    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

**Validation:**
- Model imports without errors
- Type hints correct
- Indexes defined

**Spec Reference:** spec.md §3.1.1, plan.md Phase 1 Step 1.1

---

### Task T-102: Add Message Model

**ID:** T-102
**Description:** Create SQLModel Message class for chat messages
**Preconditions:** T-101 complete
**Artifacts:**
- `backend/models.py` (update)

**Implementation:**
```python
# Add to backend/models.py
class Message(SQLModel, table=True):
    """Message model for conversation history."""
    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(index=True, foreign_key="conversations.id")
    user_id: str = Field(index=True, foreign_key="users.id")
    role: str = Field(max_length=20)  # "user" or "assistant"
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

**Validation:**
- Model imports without errors
- Foreign keys defined
- Indexes on conversation_id and user_id

**Spec Reference:** spec.md §3.1.1, plan.md Phase 1 Step 1.2

---

### Task T-103: Create Database Migration Script

**ID:** T-103
**Description:** Write migration to create conversations and messages tables
**Preconditions:** T-101, T-102 complete
**Artifacts:**
- `backend/migrations/003_add_chat_tables.py` (create)

**Implementation:**
```python
from sqlmodel import SQLModel, create_engine
from models import Conversation, Message
import os

def upgrade():
    """Add chat tables."""
    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_URL)

    # Create tables
    SQLModel.metadata.create_all(engine, tables=[
        Conversation.__table__,
        Message.__table__
    ])

def downgrade():
    """Remove chat tables."""
    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(DATABASE_URL)

    # Drop tables
    Message.__table__.drop(engine)
    Conversation.__table__.drop(engine)
```

**Validation:**
- Run migration against Neon DB
- Verify tables created with \dt command
- Verify indexes created with \di command

**Spec Reference:** spec.md §3.1.1, plan.md Phase 1 Step 1.3

---

### Task T-104: Verify Database Connection

**ID:** T-104
**Description:** Ensure database.py recognizes new models
**Preconditions:** T-103 complete
**Artifacts:**
- `backend/database.py` (verify)
- `backend/main.py` (verify)

**Validation:**
- App starts without errors
- Check logs for table creation
- Query conversations and messages tables

**Spec Reference:** spec.md §3.1.1, plan.md Phase 1 Step 1.4

---

## PHASE 2: Service Layer Extraction

### Task T-201: Create Service Layer Package

**ID:** T-201
**Description:** Set up services package structure
**Preconditions:** Phase 1 complete
**Artifacts:**
- `backend/services/__init__.py` (create)

**Implementation:**
```python
# backend/services/__init__.py
"""Business logic layer for reusable operations."""

from .task_service import (
    create_task,
    list_tasks,
    get_task,
    update_task,
    delete_task,
    toggle_complete,
)

__all__ = [
    "create_task",
    "list_tasks",
    "get_task",
    "update_task",
    "delete_task",
    "toggle_complete",
]
```

**Validation:**
- Package imports correctly
- `from services import create_task` works

**Spec Reference:** spec.md §3.1.2, plan.md Phase 2 Step 2.1

---

### Task T-202: Implement create_task Service

**ID:** T-202
**Description:** Extract task creation logic to service layer
**Preconditions:** T-201 complete
**Artifacts:**
- `backend/services/task_service.py` (create)

**Implementation:**
```python
from sqlmodel import Session, select
from models import Task
from datetime import datetime

async def create_task(
    user_id: str,
    title: str,
    description: str = None,
    db: Session = None
) -> Task:
    """
    Create a new task for the user.

    Args:
        user_id: User ID who owns the task
        title: Task title (1-200 chars)
        description: Optional task description
        db: Database session

    Returns:
        Created Task object

    Raises:
        ValueError: If title is invalid
    """
    # Validation
    if not title or len(title) > 200:
        raise ValueError("Title must be 1-200 characters")

    # Create task
    task = Task(
        user_id=user_id,
        title=title,
        description=description,
        completed=False
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
```

**Validation:**
- Function can be imported
- Call function with test data
- Task created in database

**Spec Reference:** spec.md §3.1.2, plan.md Phase 2 Step 2.2

---

### Task T-203: Implement list_tasks Service

**ID:** T-203
**Description:** Extract task listing logic to service layer
**Preconditions:** T-202 complete
**Artifacts:**
- `backend/services/task_service.py` (update)

**Implementation:**
```python
from typing import List

async def list_tasks(
    user_id: str,
    status: str = "all",
    db: Session = None
) -> List[Task]:
    """
    List tasks for user with optional status filter.

    Args:
        user_id: User ID
        status: "all", "pending", or "completed"
        db: Database session

    Returns:
        List of Task objects
    """
    statement = select(Task).where(Task.user_id == user_id)

    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)

    statement = statement.order_by(Task.created_at.desc())

    result = db.exec(statement)
    return result.all()
```

**Validation:**
- Function returns list of tasks
- Filtering works correctly
- Order is by created_at descending

**Spec Reference:** spec.md §3.1.2, plan.md Phase 2 Step 2.2

---

### Task T-204: Implement Remaining Task Services

**ID:** T-204
**Description:** Implement get, update, delete, toggle_complete functions
**Preconditions:** T-203 complete
**Artifacts:**
- `backend/services/task_service.py` (update)

**Implementation:** Add these functions:
- `get_task(user_id, task_id, db)` → Task
- `update_task(user_id, task_id, updates, db)` → Task
- `delete_task(user_id, task_id, db)` → bool
- `toggle_complete(user_id, task_id, db)` → Task

**Validation:**
- All functions work independently
- User isolation enforced
- 404 for non-existent tasks

**Spec Reference:** spec.md §3.1.2, plan.md Phase 2 Step 2.2

---

### Task T-205: Refactor Routes to Use Service Layer

**ID:** T-205
**Description:** Update routes/tasks.py to call service functions
**Preconditions:** T-204 complete
**Artifacts:**
- `backend/routes/tasks.py` (update)

**Implementation:**
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
        raise HTTPException(403, "Unauthorized")

    # Call service layer
    task = await create_task(user_id, task_data.title, task_data.description, db)
    return task
```

**Validation:**
- Phase II REST API still works
- Test all endpoints (GET, POST, PUT, DELETE, PATCH)
- No regressions

**Spec Reference:** spec.md §3.1.2, plan.md Phase 2 Step 2.3

---

## PHASE 3: MCP Server Implementation

### Task T-301: Create MCP Server Package

**ID:** T-301
**Description:** Set up MCP server structure
**Preconditions:** Phase 2 complete
**Artifacts:**
- `backend/mcp_server/__init__.py` (create)
- `backend/mcp_server/config.py` (create)

**Implementation:**
```python
# backend/mcp_server/__init__.py
"""MCP server for AI-task interactions."""

from .server import app as mcp_app
from .tools import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)

__all__ = ["mcp_app", "add_task", "list_tasks", "complete_task", "delete_task", "update_task"]
```

**Validation:**
- Package structure created
- Imports work

**Spec Reference:** spec.md §3.1.3, plan.md Phase 3 Step 3.1

---

### Task T-302: Initialize MCP Server

**ID:** T-302
**Description:** Set up MCP server with Official SDK
**Preconditions:** T-301 complete
**Artifacts:**
- `backend/mcp_server/server.py` (create)

**Implementation:**
```python
from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("todo-mcp-server")

# Server configuration
@app.on_startup
async def startup():
    """Initialize MCP server."""
    print("MCP Server started")

# Tool registration happens in tools.py
```

**Validation:**
- Server initializes without errors
- Can be started independently

**Spec Reference:** spec.md §3.1.3, plan.md Phase 3 Step 3.2

---

### Task T-303: Implement add_task MCP Tool

**ID:** T-303
**Description:** Create MCP tool for task creation
**Preconditions:** T-302 complete
**Artifacts:**
- `backend/mcp_server/tools.py` (create)

**Implementation:**
```python
from mcp.server import tool
from services.task_service import create_task
from database import get_db

@tool
async def add_task(user_id: str, title: str, description: str = None) -> dict:
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
        return {"error": "Title must be 1-200 characters"}

    # Get database session
    db = next(get_db())

    try:
        # Call service layer
        task = await create_task(user_id, title, description, db)

        return {
            "task_id": task.id,
            "status": "created",
            "title": task.title
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
```

**Validation:**
- Tool can be called with test data
- Returns correct format
- Task created in database

**Spec Reference:** spec.md §3.1.3 Tool: add_task, plan.md Phase 3 Step 3.3

---

### Task T-304: Implement list_tasks MCP Tool

**ID:** T-304
**Description:** Create MCP tool for listing tasks
**Preconditions:** T-303 complete
**Artifacts:**
- `backend/mcp_server/tools.py` (update)

**Implementation:**
```python
@tool
async def list_tasks(user_id: str, status: str = "all") -> list:
    """
    Retrieve tasks for the user.

    Args:
        user_id: User ID
        status: "all", "pending", or "completed"

    Returns:
        list: Array of task objects
    """
    db = next(get_db())

    try:
        tasks = await list_tasks(user_id, status, db)
        return [
            {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "completed": task.completed,
                "created_at": task.created_at.isoformat()
            }
            for task in tasks
        ]
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
```

**Validation:**
- Tool returns list of tasks
- Filtering works
- User isolation enforced

**Spec Reference:** spec.md §3.1.3 Tool: list_tasks, plan.md Phase 3 Step 3.4

---

### Task T-305: Implement complete_task MCP Tool

**ID:** T-305
**Description:** Create MCP tool for marking tasks complete
**Preconditions:** T-304 complete
**Artifacts:**
- `backend/mcp_server/tools.py` (update)

**Implementation:**
```python
@tool
async def complete_task(user_id: str, task_id: int) -> dict:
    """
    Mark a task as complete.

    Args:
        user_id: User ID
        task_id: Task ID to complete

    Returns:
        dict: {"task_id": int, "status": "completed", "title": str}
    """
    db = next(get_db())

    try:
        task = await toggle_complete(user_id, task_id, db)
        if not task:
            return {"error": "Task not found"}

        return {
            "task_id": task.id,
            "status": "completed" if task.completed else "pending",
            "title": task.title
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
```

**Validation:**
- Tool toggles completion status
- Returns correct response
- User authorization enforced

**Spec Reference:** spec.md §3.1.3 Tool: complete_task, plan.md Phase 3 Step 3.4

---

### Task T-306: Implement delete_task MCP Tool

**ID:** T-306
**Description:** Create MCP tool for deleting tasks
**Preconditions:** T-305 complete
**Artifacts:**
- `backend/mcp_server/tools.py` (update)

**Implementation:**
```python
@tool
async def delete_task(user_id: str, task_id: int) -> dict:
    """
    Delete a task.

    Args:
        user_id: User ID
        task_id: Task ID to delete

    Returns:
        dict: {"task_id": int, "status": "deleted", "title": str}
    """
    db = next(get_db())

    try:
        # Get task first to return title
        task = await get_task(user_id, task_id, db)
        if not task:
            return {"error": "Task not found"}

        title = task.title
        success = await delete_task(user_id, task_id, db)

        if success:
            return {
                "task_id": task_id,
                "status": "deleted",
                "title": title
            }
        else:
            return {"error": "Failed to delete task"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
```

**Validation:**
- Tool deletes task
- Returns confirmation
- User authorization enforced

**Spec Reference:** spec.md §3.1.3 Tool: delete_task, plan.md Phase 3 Step 3.4

---

### Task T-307: Implement update_task MCP Tool

**ID:** T-307
**Description:** Create MCP tool for updating tasks
**Preconditions:** T-306 complete
**Artifacts:**
- `backend/mcp_server/tools.py` (update)

**Implementation:**
```python
@tool
async def update_task(
    user_id: str,
    task_id: int,
    title: str = None,
    description: str = None
) -> dict:
    """
    Update task title or description.

    Args:
        user_id: User ID
        task_id: Task ID to update
        title: New title (optional)
        description: New description (optional)

    Returns:
        dict: {"task_id": int, "status": "updated", "title": str}
    """
    if not title and description is None:
        return {"error": "Must provide title or description to update"}

    db = next(get_db())

    try:
        updates = {}
        if title:
            updates["title"] = title
        if description is not None:
            updates["description"] = description

        task = await update_task(user_id, task_id, updates, db)
        if not task:
            return {"error": "Task not found"}

        return {
            "task_id": task.id,
            "status": "updated",
            "title": task.title
        }
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()
```

**Validation:**
- Tool updates task fields
- Partial updates work
- User authorization enforced

**Spec Reference:** spec.md §3.1.3 Tool: update_task, plan.md Phase 3 Step 3.4

---

### Task T-308: Register Tools with MCP Server

**ID:** T-308
**Description:** Register all tools with MCP server
**Preconditions:** T-307 complete
**Artifacts:**
- `backend/mcp_server/server.py` (update)

**Implementation:**
```python
from .tools import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)

# Register tools
app.register_tool(add_task)
app.register_tool(list_tasks)
app.register_tool(complete_task)
app.register_tool(delete_task)
app.register_tool(update_task)
```

**Validation:**
- All 5 tools registered
- MCP server lists tools
- Tools can be invoked

**Spec Reference:** spec.md §3.1.3, plan.md Phase 3 Step 3.4

---

## PHASE 4: Chat Endpoint with OpenAI Agents SDK

### Task T-401: Add OpenAI Dependencies

**ID:** T-401
**Description:** Install OpenAI SDK and MCP SDK
**Preconditions:** Phase 3 complete
**Artifacts:**
- `backend/requirements.txt` (update)

**Implementation:**
```txt
# Add to requirements.txt
openai>=1.0.0
mcp>=0.1.0
```

**Validation:**
- `pip install -r requirements.txt` succeeds
- Packages importable in Python

**Spec Reference:** spec.md §3.1.5, plan.md Phase 4 Step 4.1

---

### Task T-402: Create Chat Route Structure

**ID:** T-402
**Description:** Set up chat endpoint file and schemas
**Preconditions:** T-401 complete
**Artifacts:**
- `backend/routes/chat.py` (create)

**Implementation:**
```python
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session
from database import get_db
from middleware.auth import verify_jwt
from models import Conversation, Message

router = APIRouter(prefix="/api/{user_id}/chat", tags=["chat"])

class ChatRequest(BaseModel):
    conversation_id: int | None = None
    message: str

class ChatResponse(BaseModel):
    conversation_id: int
    response: str
    tool_calls: list = []
```

**Validation:**
- Router imports correctly
- Schemas validate

**Spec Reference:** spec.md §3.1.4, plan.md Phase 4 Step 4.2

---

### Task T-403: Implement Conversation Management

**ID:** T-403
**Description:** Functions to manage conversations in database
**Preconditions:** T-402 complete
**Artifacts:**
- `backend/routes/chat.py` (update)

**Implementation:** Add these functions:
- `get_or_create_conversation(user_id, conversation_id, db)` → int
- `load_conversation_history(conversation_id, limit, db)` → list
- `save_message(conversation_id, user_id, role, content, db)` → None

**Validation:**
- Functions create/load conversations
- Messages save correctly
- History loads in chronological order

**Spec Reference:** spec.md §3.1.4, plan.md Phase 4 Step 4.3

---

### Task T-404: Integrate OpenAI Agents SDK

**ID:** T-404
**Description:** Chat endpoint with AI agent and MCP tools
**Preconditions:** T-403 complete
**Artifacts:**
- `backend/routes/chat.py` (update)

**Implementation:**
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
            # Tool definitions from MCP
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

**Validation:**
- Endpoint responds with AI messages
- Conversation persists
- MCP tools called correctly

**Spec Reference:** spec.md §3.1.4, §3.1.5, plan.md Phase 4 Step 4.4

---

### Task T-405: Add Error Handling to Chat Endpoint

**ID:** T-405
**Description:** Comprehensive error handling for chat
**Preconditions:** T-404 complete
**Artifacts:**
- `backend/routes/chat.py` (update)

**Implementation:**
- Handle OpenAI API errors
- Handle database errors
- Handle MCP tool errors
- Return user-friendly messages

**Validation:**
- Errors don't crash server
- User sees friendly messages
- Errors logged for debugging

**Spec Reference:** spec.md §3.1.4, CONSTITUTION §3 Graceful Error Handling

---

### Task T-406: Register Chat Router

**ID:** T-406
**Description:** Add chat route to main FastAPI app
**Preconditions:** T-405 complete
**Artifacts:**
- `backend/main.py` (update)

**Implementation:**
```python
from routes import tasks, chat

app.include_router(tasks.router)
app.include_router(chat.router)
```

**Validation:**
- Chat endpoint accessible
- curl test works
- Postman test works

**Spec Reference:** spec.md §3.1.4, plan.md Phase 4 Step 4.5

---

## PHASE 5: Frontend ChatKit Integration

### Task T-501: Install ChatKit Dependency

**ID:** T-501
**Description:** Add OpenAI ChatKit to package.json
**Preconditions:** Phase 4 complete
**Artifacts:**
- `frontend/package.json` (update)

**Implementation:**
```bash
npm install @openai/chatkit
```

**Validation:**
- Package installs successfully
- No dependency conflicts

**Spec Reference:** spec.md §3.2.2, plan.md Phase 5 Step 5.1

---

### Task T-502: Create Chat API Client

**ID:** T-502
**Description:** API client functions for chat
**Preconditions:** T-501 complete
**Artifacts:**
- `frontend/lib/chat-api.ts` (create)

**Implementation:**
```typescript
export async function sendMessage(
  userId: string,
  conversationId: number | null,
  message: string
): Promise<ChatResponse> {
  const token = getAuthToken();

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

export interface ChatResponse {
  conversation_id: number;
  response: string;
  tool_calls: any[];
}
```

**Validation:**
- Function calls chat endpoint
- Authentication works
- TypeScript types correct

**Spec Reference:** spec.md §3.2.3, plan.md Phase 5 Step 5.2

---

### Task T-503: Create ChatInterface Component

**ID:** T-503
**Description:** Reusable ChatKit wrapper component
**Preconditions:** T-502 complete
**Artifacts:**
- `frontend/components/ChatInterface.tsx` (create)

**Implementation:**
```typescript
'use client';

import { ChatKit } from '@openai/chatkit';
import { useState } from 'react';

interface ChatInterfaceProps {
  userId: string;
  onSendMessage: (message: string) => Promise<string>;
}

export function ChatInterface({ userId, onSendMessage }: ChatInterfaceProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ChatKit
        apiKey={process.env.NEXT_PUBLIC_OPENAI_DOMAIN_KEY}
        onSendMessage={onSendMessage}
        className="h-[600px]"
      />
    </div>
  );
}
```

**Validation:**
- Component renders
- Props typing correct
- ChatKit displays

**Spec Reference:** spec.md §3.2.1, plan.md Phase 5 Step 5.3

---

### Task T-504: Create Chat Page

**ID:** T-504
**Description:** Main chat page with ChatKit integration
**Preconditions:** T-503 complete
**Artifacts:**
- `frontend/app/chat/page.tsx` (create)

**Implementation:**
```typescript
'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { sendMessage } from '@/lib/chat-api';
import { useAuth } from '@/lib/auth';  // Your auth hook

export default function ChatPage() {
  const { user } = useAuth();
  const [conversationId, setConversationId] = useState<number | null>(null);

  const handleSendMessage = async (message: string) => {
    if (!user?.id) throw new Error('Not authenticated');

    const response = await sendMessage(user.id, conversationId, message);

    // Update conversation ID if new
    if (!conversationId) {
      setConversationId(response.conversation_id);
    }

    return response.response;
  };

  if (!user) {
    return <div>Please log in to use the chat assistant.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Todo Chat Assistant</h1>
      <ChatInterface userId={user.id} onSendMessage={handleSendMessage} />
    </div>
  );
}
```

**Validation:**
- Page renders
- Auth protection works
- Messages send and receive

**Spec Reference:** spec.md §3.2.1, plan.md Phase 5 Step 5.3

---

### Task T-505: Update Navigation

**ID:** T-505
**Description:** Add chat link to main navigation
**Preconditions:** T-504 complete
**Artifacts:**
- `frontend/app/layout.tsx` (update)

**Implementation:**
```typescript
<nav className="flex gap-4">
  <Link href="/dashboard" className="hover:underline">
    Tasks
  </Link>
  <Link href="/chat" className="hover:underline">
    Chat Assistant
  </Link>
  <button onClick={handleLogout}>Logout</button>
</nav>
```

**Validation:**
- Chat link visible
- Routes correctly
- Mobile responsive

**Spec Reference:** spec.md §3.2.4, plan.md Phase 5 Step 5.4

---

## PHASE 6: Testing and Integration

### Task T-601: Unit Test MCP Tools

**ID:** T-601
**Description:** Write unit tests for all 5 MCP tools
**Preconditions:** Phase 5 complete
**Artifacts:**
- `backend/tests/test_mcp_tools.py` (create)

**Validation:**
- All tool tests pass
- Coverage > 80%

**Spec Reference:** spec.md §6.1, plan.md Phase 6 Step 6.1

---

### Task T-602: Integration Test Chat Endpoint

**ID:** T-602
**Description:** Test chat endpoint with mock OpenAI
**Preconditions:** T-601 complete
**Artifacts:**
- `backend/tests/test_chat_endpoint.py` (create)

**Validation:**
- Endpoint tests pass
- Conversation persistence verified

**Spec Reference:** spec.md §6.2, plan.md Phase 6 Step 6.2

---

### Task T-603: Manual End-to-End Testing

**ID:** T-603
**Description:** Test complete user flows
**Preconditions:** T-602 complete

**Test Cases:**
1. Create task via chat → appears in dashboard
2. Create task via dashboard → manageable via chat
3. Mark complete via chat → updates dashboard
4. Delete via chat → removes from dashboard
5. Conversation persists after page refresh

**Validation:** All test cases pass

**Spec Reference:** spec.md §6.4, plan.md Phase 6 Step 6.3

---

## PHASE 7: Documentation and Deployment

### Task T-701: Update README.md

**ID:** T-701
**Description:** Add Phase III documentation to README
**Preconditions:** Phase 6 complete
**Artifacts:**
- `README.md` (update)

**Content to Add:**
- Phase III overview
- Chat endpoint documentation
- Natural language command examples
- ChatKit setup instructions
- Environment variables

**Validation:** README is comprehensive and accurate

**Spec Reference:** spec.md §9, plan.md Phase 7 Step 7.1

---

### Task T-702: Update Backend CLAUDE.md

**ID:** T-702
**Description:** Add MCP and chat guidelines
**Preconditions:** T-701 complete
**Artifacts:**
- `backend/CLAUDE.md` (update)

**Content to Add:**
- MCP server structure
- Chat endpoint patterns
- Service layer usage
- OpenAI SDK integration

**Validation:** Guidelines are clear

**Spec Reference:** spec.md §9, plan.md Phase 7 Step 7.2

---

### Task T-703: Update Frontend CLAUDE.md

**ID:** T-703
**Description:** Add ChatKit integration guidelines
**Preconditions:** T-702 complete
**Artifacts:**
- `frontend/CLAUDE.md` (update)

**Content to Add:**
- ChatKit setup
- Chat API client patterns
- Chat page structure

**Validation:** Guidelines are clear

**Spec Reference:** spec.md §9, plan.md Phase 7 Step 7.3

---

### Task T-704: Deploy Backend with Environment Variables

**ID:** T-704
**Description:** Deploy backend to Railway/Render
**Preconditions:** T-703 complete

**Steps:**
1. Set OPENAI_API_KEY environment variable
2. Run database migrations
3. Verify health endpoint
4. Test chat endpoint

**Validation:** Backend accessible and functional

**Spec Reference:** spec.md §8.1, plan.md Phase 7 Step 7.4

---

### Task T-705: Deploy Frontend with ChatKit Configuration

**ID:** T-705
**Description:** Deploy frontend to Vercel
**Preconditions:** T-704 complete

**Steps:**
1. Deploy to Vercel
2. Add production URL to OpenAI domain allowlist
3. Get ChatKit domain key
4. Set NEXT_PUBLIC_OPENAI_DOMAIN_KEY
5. Verify ChatKit works

**Validation:** Frontend accessible, ChatKit functional

**Spec Reference:** spec.md §8.2, plan.md Phase 7 Step 7.5

---

### Task T-706: Create Demo Video

**ID:** T-706
**Description:** Record 90-second demonstration
**Preconditions:** T-705 complete

**Script:**
- 0-15s: Introduction
- 15-45s: Natural language commands demo
- 45-70s: Integration with dashboard demo
- 70-90s: Spec-driven development overview

**Validation:** Video under 90 seconds, shows all features

**Spec Reference:** spec.md §9.3, plan.md Phase 7 Step 7.6

---

## Summary

**Total Tasks:** 40 (across 7 phases)
**Estimated Duration:** 7 days
**Complexity Breakdown:**
- Simple: 10 tasks
- Medium: 20 tasks
- Complex: 10 tasks

**Critical Path:**
Database → Service Layer → MCP Server → Chat Endpoint → ChatKit → Testing → Deployment

**Dependencies:**
- Each phase depends on previous phase completion
- Some tasks within phases can be done in parallel
- Testing depends on all implementation complete
- Deployment depends on testing passing

---

**Tasks Ready for Implementation via Claude Code**
**Next Step:** Start with Phase 1, Task T-101
