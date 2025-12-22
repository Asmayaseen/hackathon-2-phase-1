"""Database models."""

from sqlmodel import SQLModel, Field, Column
from sqlalchemy import ARRAY, String
from datetime import datetime
from typing import Optional, Literal, List

# Type for task priority
TaskPriority = Literal['low', 'medium', 'high']


class Task(SQLModel, table=True):
    """Task model with priority, due date, and tags support."""

    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Removed foreign key for now (Better Auth manages users separately)
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, index=True)
    priority: str = Field(default='medium', index=True)  # 'low', 'medium', 'high'
    due_date: Optional[datetime] = Field(default=None, index=True)
    tags: Optional[List[str]] = Field(default_factory=lambda: [], sa_column=Column(ARRAY(String)))  # Tags as PostgreSQL array
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Conversation(SQLModel, table=True):
    """Conversation model for chat sessions (Phase III)."""

    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)  # Removed foreign key for now (Better Auth manages users separately)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Message(SQLModel, table=True):
    """Message model for conversation history (Phase III)."""

    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(index=True, foreign_key="conversations.id")
    user_id: str = Field(index=True)  # Removed foreign key for now (Better Auth manages users separately)
    role: str = Field(max_length=20)  # "user" or "assistant"
    content: str
    tool_calls: Optional[str] = Field(default=None)  # JSON string of tool calls made
    created_at: datetime = Field(default_factory=datetime.utcnow)
