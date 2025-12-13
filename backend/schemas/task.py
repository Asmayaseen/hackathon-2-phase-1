"""Task Pydantic schemas."""

from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional, Literal


class TaskCreate(BaseModel):
    """Schema for creating a task."""

    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Literal['low', 'medium', 'high'] = Field('medium')
    due_date: Optional[datetime] = Field(None)

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: str) -> str:
        """Validate title is not empty."""
        if not v.strip():
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip()

    @field_validator('description')
    @classmethod
    def description_sanitize(cls, v: Optional[str]) -> Optional[str]:
        """Sanitize description."""
        if v is not None:
            v = v.strip()
            return v if v else None
        return v


class TaskUpdate(BaseModel):
    """Schema for updating a task."""

    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Optional[Literal['low', 'medium', 'high']] = None
    due_date: Optional[datetime] = None

    @field_validator('title')
    @classmethod
    def title_not_empty(cls, v: Optional[str]) -> Optional[str]:
        """Validate title if provided."""
        if v is not None and not v.strip():
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip() if v else v


class TaskResponse(BaseModel):
    """Schema for task response."""

    id: int
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    priority: str
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TaskListResponse(BaseModel):
    """Schema for task list response."""

    tasks: list[TaskResponse]
    total: int
    completed: int
    pending: int
