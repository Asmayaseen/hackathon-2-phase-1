"""
Chat endpoint with OpenAI Agents SDK integration.

Tasks: T-402 to T-406 - Implement Chat Endpoint
Spec: specs-history/phase-3-chatbot/spec.md §3.1.4, §3.1.5
Plan: specs-history/phase-3-chatbot/plan.md Phase 4

This module provides a stateless chat endpoint that:
1. Manages conversation persistence in database
2. Integrates with OpenAI Agents SDK
3. Uses MCP tools for task operations
4. Maintains conversation context
5. Provides natural language interface

Following Constitution principles:
- Stateless Architecture: No in-memory state
- MCP-First: All task ops through MCP tools
- User Authorization: JWT verification + user_id validation
- Error Handling: Graceful, user-friendly messages
"""

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlmodel import Session, select
from typing import Optional, List, Dict, Any
from datetime import datetime
import os
import logging

from database import get_db
from middleware.auth import verify_jwt
from models import Conversation, Message
from mcp_server.tools import add_task, list_tasks, complete_task, delete_task, update_task

# OpenAI SDK (will be imported when available)
# from openai import OpenAI

logger = logging.getLogger(__name__)

# Router configuration
router = APIRouter(prefix="/api/{user_id}/chat", tags=["chat"])


# Request/Response Schemas
class ChatRequest(BaseModel):
    """Chat request schema."""
    conversation_id: Optional[int] = Field(None, description="Existing conversation ID (creates new if not provided)")
    message: str = Field(..., min_length=1, max_length=2000, description="User's message")


class ToolCall(BaseModel):
    """Tool call information."""
    tool: str = Field(..., description="Name of the tool called")
    parameters: Dict[str, Any] = Field(default_factory=dict, description="Parameters passed to the tool")


class ChatResponse(BaseModel):
    """Chat response schema."""
    conversation_id: int = Field(..., description="Conversation ID")
    response: str = Field(..., description="AI assistant's response")
    tool_calls: List[ToolCall] = Field(default_factory=list, description="Tools invoked during processing")


# Conversation Management Functions
async def get_or_create_conversation(
    user_id: str,
    conversation_id: Optional[int],
    db: Session
) -> int:
    """
    Get existing conversation or create new one.

    Task: T-403 - Implement Conversation Management
    Constitution: Database Principles - Conversation Persistence

    Args:
        user_id: User ID who owns the conversation
        conversation_id: Existing conversation ID (optional)
        db: Database session

    Returns:
        int: Conversation ID
    """
    if conversation_id:
        # Check if conversation exists and belongs to user
        statement = select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        )
        conv = db.exec(statement).first()

        if conv:
            logger.info(f"Using existing conversation: user={user_id}, conv_id={conversation_id}")
            return conv.id

    # Create new conversation
    conv = Conversation(user_id=user_id)
    db.add(conv)
    db.commit()
    db.refresh(conv)

    logger.info(f"Created new conversation: user={user_id}, conv_id={conv.id}")
    return conv.id


async def load_conversation_history(
    conversation_id: int,
    limit: int = 10,
    db: Session = None
) -> List[Dict[str, str]]:
    """
    Load last N messages from conversation.

    Task: T-403 - Implement Conversation Management
    Constitution: Performance Principles - Minimize Database Queries

    Args:
        conversation_id: Conversation ID
        limit: Number of messages to load (default: 10)
        db: Database session

    Returns:
        list: Messages in OpenAI format [{"role": "user"|"assistant", "content": "..."}]

    Note:
        We limit to 10 messages to:
        1. Reduce OpenAI token costs
        2. Keep context window manageable
        3. Improve response speed
    """
    # Load messages ordered by creation time (most recent first)
    statement = select(Message).where(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at.desc()).limit(limit)

    messages = db.exec(statement).all()

    # Reverse to chronological order (oldest first)
    messages = list(reversed(messages))

    logger.info(f"Loaded {len(messages)} messages for conversation {conversation_id}")

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
) -> None:
    """
    Save a message to the database.

    Task: T-403 - Implement Conversation Management
    Constitution: Database Principles - Conversation Persistence

    Args:
        conversation_id: Conversation ID
        user_id: User ID
        role: Message role ("user" or "assistant")
        content: Message content
        db: Database session
    """
    msg = Message(
        conversation_id=conversation_id,
        user_id=user_id,
        role=role,
        content=content
    )
    db.add(msg)
    db.commit()

    logger.debug(f"Saved message: conv={conversation_id}, role={role}, length={len(content)}")


# Mock AI Response (will be replaced with OpenAI Agents SDK)
async def get_ai_response(
    messages: List[Dict[str, str]],
    user_id: str
) -> tuple[str, List[ToolCall]]:
    """
    Get AI response using OpenAI Agents SDK.

    Task: T-404 - Integrate OpenAI Agents SDK
    Constitution: AI Agent Principles

    This is a MOCK implementation. Replace with actual OpenAI Agents SDK integration.

    Args:
        messages: Conversation history in OpenAI format
        user_id: User ID (for MCP tool calls)

    Returns:
        tuple: (response_text, tool_calls_made)
    """
    # TODO: Replace with actual OpenAI Agents SDK integration
    # For now, return a mock response

    last_message = messages[-1]["content"].lower() if messages else ""
    tool_calls = []

    # Simple pattern matching for demo
    if "add" in last_message or "create" in last_message:
        # Extract task from message (very basic)
        task_title = last_message.replace("add", "").replace("create", "").strip()
        if task_title:
            result = await add_task(user_id, task_title)
            tool_calls.append(ToolCall(tool="add_task", parameters={"title": task_title}))

            if "error" not in result:
                response = f"I've added '{result['title']}' to your todo list!"
            else:
                response = f"Sorry, I couldn't add that task: {result['error']}"
        else:
            response = "I'd be happy to add a task! What would you like to add?"

    elif "show" in last_message or "list" in last_message:
        result = await list_tasks(user_id, "all")
        tool_calls.append(ToolCall(tool="list_tasks", parameters={"status": "all"}))

        if isinstance(result, list) and len(result) > 0 and "error" not in result[0]:
            task_list = "\n".join([f"- {t['title']}" for t in result[:5]])
            response = f"Here are your tasks:\n{task_list}"
        else:
            response = "You don't have any tasks yet!"

    elif "complete" in last_message or "done" in last_message:
        # Try to extract task ID (very basic)
        words = last_message.split()
        task_id = None
        for word in words:
            if word.isdigit():
                task_id = int(word)
                break

        if task_id:
            result = await complete_task(user_id, task_id)
            tool_calls.append(ToolCall(tool="complete_task", parameters={"task_id": task_id}))

            if "error" not in result:
                response = f"Great! I've marked '{result['title']}' as {result['status']}."
            else:
                response = f"Sorry, I couldn't complete that task: {result['error']}"
        else:
            response = "Which task would you like to mark as complete? Please provide the task number."

    else:
        response = "I can help you manage your tasks! Try saying 'add buy milk' or 'show my tasks'."

    return response, tool_calls


# Main Chat Endpoint
@router.post("", response_model=ChatResponse)
async def chat(
    user_id: str,
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    """
    Stateless chat endpoint with OpenAI Agents SDK.

    TEMPORARILY BYPASSED AUTH FOR TESTING
    TODO: Re-enable JWT verification once Better Auth is configured

    Tasks: T-402 to T-406 - Complete Chat Endpoint
    Constitution: Stateless Architecture, MCP-First, User Authorization

    Args:
        user_id: User ID from URL path
        request: Chat request with message and optional conversation_id
        db: Database session

    Returns:
        ChatResponse: AI response with conversation_id and tool calls

    Raises:
        HTTPException: 500 if server error occurs

    Flow:
        1. (Auth check bypassed for testing)
        2. Get or create conversation
        3. Load conversation history
        4. Save user message
        5. Get AI response (with MCP tools)
        6. Save assistant response
        7. Return response
        8. Server forgets everything (stateless!)
    """
    # Step 1: Auth check temporarily bypassed
    # TODO: Re-enable this when Better Auth is configured:
    # if token.get("user_id") != user_id:
    #     logger.warning(f"Authorization failed: token user={token.get('user_id')}, requested user={user_id}")
    #     raise HTTPException(status_code=403, detail="Unauthorized")

    try:
        # Step 2: Get or create conversation
        conv_id = await get_or_create_conversation(
            user_id=user_id,
            conversation_id=request.conversation_id,
            db=db
        )

        # Step 3: Load conversation history
        history = await load_conversation_history(conv_id, limit=10, db=db)

        # Step 4: Save user message
        await save_message(
            conversation_id=conv_id,
            user_id=user_id,
            role="user",
            content=request.message,
            db=db
        )

        # Step 5: Build messages for AI agent
        messages = history + [{"role": "user", "content": request.message}]

        # Step 6: Get AI response (with MCP tools)
        assistant_message, tool_calls = await get_ai_response(messages, user_id)

        # Step 7: Save assistant response
        await save_message(
            conversation_id=conv_id,
            user_id=user_id,
            role="assistant",
            content=assistant_message,
            db=db
        )

        logger.info(f"Chat completed: user={user_id}, conv={conv_id}, tools={len(tool_calls)}")

        # Step 8: Return response (server now forgets everything - stateless!)
        return ChatResponse(
            conversation_id=conv_id,
            response=assistant_message,
            tool_calls=tool_calls
        )

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        # Log error and return user-friendly message
        logger.error(f"Chat endpoint error: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="I'm having trouble processing that. Please try again."
        )


# Health check for chat endpoint
@router.get("/health")
async def chat_health():
    """Chat endpoint health check."""
    return {
        "status": "healthy",
        "endpoint": "chat",
        "mcp_tools": ["add_task", "list_tasks", "complete_task", "delete_task", "update_task"]
    }
