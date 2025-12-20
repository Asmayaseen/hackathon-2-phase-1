"""
Task service layer - Reusable business logic for task operations.

Tasks: T-202, T-203, T-204 - Implement Task Service Functions
Spec: specs-history/phase-3-chatbot/spec.md §3.1.2
Plan: specs-history/phase-3-chatbot/plan.md Phase 2 Step 2.2

This service layer provides shared business logic that can be used by:
1. REST API endpoints (routes/tasks.py)
2. MCP tools (mcp_server/tools.py)
3. Any future interfaces

Following Constitution principles:
- Service Layer Pattern: Business logic centralized
- Type Safety: Full type hints
- User Isolation: Every function validates user_id
"""

from sqlmodel import Session, select
from models import Task
from datetime import datetime
from typing import List, Optional, Dict, Any


async def create_task(
    user_id: str,
    title: str,
    description: Optional[str] = None,
    priority: str = "medium",
    due_date: Optional[datetime] = None,
    db: Session = None
) -> Task:
    """
    Create a new task for the user.

    Args:
        user_id: User ID who owns the task
        title: Task title (1-200 characters)
        description: Optional task description (max 1000 characters)
        priority: Task priority ('low', 'medium', 'high')
        due_date: Optional due date
        db: Database session

    Returns:
        Created Task object

    Raises:
        ValueError: If title is invalid or user_id is missing
    """
    # Validation
    if not user_id:
        raise ValueError("user_id is required")

    if not title or len(title) > 200:
        raise ValueError("Title must be 1-200 characters")

    if description and len(description) > 1000:
        raise ValueError("Description must be max 1000 characters")

    if priority not in ['low', 'medium', 'high']:
        raise ValueError("Priority must be 'low', 'medium', or 'high'")

    # Create task
    task = Task(
        user_id=user_id,
        title=title,
        description=description,
        priority=priority,
        due_date=due_date,
        completed=False
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


async def list_tasks(
    user_id: str,
    status: str = "all",
    priority: Optional[str] = None,
    db: Session = None
) -> List[Task]:
    """
    List tasks for user with optional filtering.

    Args:
        user_id: User ID
        status: Filter by status ("all", "pending", "completed")
        priority: Optional filter by priority ('low', 'medium', 'high')
        db: Database session

    Returns:
        List of Task objects matching filters

    Raises:
        ValueError: If user_id is missing or filters are invalid
    """
    if not user_id:
        raise ValueError("user_id is required")

    if status not in ["all", "pending", "completed"]:
        raise ValueError("Status must be 'all', 'pending', or 'completed'")

    # Base query: filter by user
    statement = select(Task).where(Task.user_id == user_id)

    # Apply status filter
    if status == "pending":
        statement = statement.where(Task.completed == False)
    elif status == "completed":
        statement = statement.where(Task.completed == True)

    # Apply priority filter
    if priority:
        if priority not in ['low', 'medium', 'high']:
            raise ValueError("Priority must be 'low', 'medium', or 'high'")
        statement = statement.where(Task.priority == priority)

    # Order by created date (newest first)
    statement = statement.order_by(Task.created_at.desc())

    result = db.exec(statement)
    return result.all()


async def get_task(
    user_id: str,
    task_id: int,
    db: Session = None
) -> Optional[Task]:
    """
    Get a specific task by ID.

    Args:
        user_id: User ID (for authorization)
        task_id: Task ID to retrieve
        db: Database session

    Returns:
        Task object if found and belongs to user, None otherwise

    Note:
        Returns None for both "not found" and "not authorized" to avoid
        revealing task existence to unauthorized users.
    """
    if not user_id:
        raise ValueError("user_id is required")

    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == user_id  # Ensure user owns the task
    )

    result = db.exec(statement)
    return result.first()


async def update_task(
    user_id: str,
    task_id: int,
    updates: Dict[str, Any],
    db: Session = None
) -> Optional[Task]:
    """
    Update task fields.

    Args:
        user_id: User ID (for authorization)
        task_id: Task ID to update
        updates: Dictionary of field updates (e.g., {"title": "New title"})
        db: Database session

    Returns:
        Updated Task object if found and authorized, None otherwise

    Raises:
        ValueError: If updates are invalid
    """
    if not user_id:
        raise ValueError("user_id is required")

    if not updates:
        raise ValueError("At least one field must be updated")

    # Get task (with authorization check)
    task = await get_task(user_id, task_id, db)
    if not task:
        return None

    # Validate and apply updates
    allowed_fields = {"title", "description", "priority", "due_date", "completed"}
    for field, value in updates.items():
        if field not in allowed_fields:
            raise ValueError(f"Cannot update field: {field}")

        # Field-specific validation
        if field == "title":
            if not value or len(value) > 200:
                raise ValueError("Title must be 1-200 characters")
        elif field == "description" and value is not None:
            if len(value) > 1000:
                raise ValueError("Description must be max 1000 characters")
        elif field == "priority":
            if value not in ['low', 'medium', 'high']:
                raise ValueError("Priority must be 'low', 'medium', or 'high'")

        # Apply update
        setattr(task, field, value)

    # Update timestamp
    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


async def delete_task(
    user_id: str,
    task_id: int,
    db: Session = None
) -> bool:
    """
    Delete a task.

    Args:
        user_id: User ID (for authorization)
        task_id: Task ID to delete
        db: Database session

    Returns:
        True if task was deleted, False if not found or unauthorized
    """
    if not user_id:
        raise ValueError("user_id is required")

    # Get task (with authorization check)
    task = await get_task(user_id, task_id, db)
    if not task:
        return False

    db.delete(task)
    db.commit()

    return True


async def toggle_complete(
    user_id: str,
    task_id: int,
    db: Session = None
) -> Optional[Task]:
    """
    Toggle task completion status.

    Args:
        user_id: User ID (for authorization)
        task_id: Task ID to toggle
        db: Database session

    Returns:
        Updated Task object with toggled status, None if not found/authorized
    """
    if not user_id:
        raise ValueError("user_id is required")

    # Get task (with authorization check)
    task = await get_task(user_id, task_id, db)
    if not task:
        return None

    # Toggle completion
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
