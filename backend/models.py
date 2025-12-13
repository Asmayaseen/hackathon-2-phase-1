"""Database models."""

from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional, Literal

# Type for task priority
TaskPriority = Literal['low', 'medium', 'high']


class Task(SQLModel, table=True):
    """Task model with priority and due date support."""

    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="users.id")
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, index=True)
    priority: str = Field(default='medium', index=True)  # 'low', 'medium', 'high'
    due_date: Optional[datetime] = Field(default=None, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
