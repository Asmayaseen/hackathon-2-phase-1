"""Task management API routes."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from datetime import datetime
from typing import Literal

from database import get_db
from models import Task
from schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
from middleware.auth import verify_jwt

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["tasks"])


@router.get("", response_model=TaskListResponse)
async def list_tasks(
    user_id: str,
    status: Literal["all", "pending", "completed"] = Query("all"),
    sort: Literal["created", "title", "updated"] = Query("created"),
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    List all tasks for a user with optional filtering and sorting.

    - **user_id**: User ID from URL path
    - **status**: Filter by completion status (all/pending/completed)
    - **sort**: Sort order (created/title/updated)
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Build query
    query = select(Task).where(Task.user_id == user_id)

    # Apply status filter
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)

    # Apply sorting
    if sort == "title":
        query = query.order_by(Task.title)
    elif sort == "updated":
        query = query.order_by(Task.updated_at.desc())
    else:  # created (default)
        query = query.order_by(Task.created_at.desc())

    # Execute query
    tasks = db.exec(query).all()

    # Calculate statistics
    total = len(tasks)
    completed = sum(1 for task in tasks if task.completed)
    pending = total - completed

    return TaskListResponse(
        tasks=tasks,
        total=total,
        completed=completed,
        pending=pending
    )


@router.post("", response_model=TaskResponse, status_code=201)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Create a new task for the authenticated user.

    - **user_id**: User ID from URL path
    - **title**: Task title (required, 1-200 chars)
    - **description**: Task description (optional, max 1000 chars)
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Create task
    task = Task(
        user_id=user_id,
        title=task_data.title,
        description=task_data.description,
        completed=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    user_id: str,
    task_id: int,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Get a specific task by ID.

    - **user_id**: User ID from URL path
    - **task_id**: Task ID to retrieve
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Fetch task
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found or access forbidden"
        )

    return task


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: int,
    task_data: TaskUpdate,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Update a task's title and/or description.

    - **user_id**: User ID from URL path
    - **task_id**: Task ID to update
    - **title**: New title (optional)
    - **description**: New description (optional)
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Fetch task
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found or access forbidden"
        )

    # Update fields if provided
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description

    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}")
async def delete_task(
    user_id: str,
    task_id: int,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Delete a task permanently.

    - **user_id**: User ID from URL path
    - **task_id**: Task ID to delete
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Fetch task
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found or access forbidden"
        )

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully", "task_id": task_id}


@router.patch("/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    user_id: str,
    task_id: int,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Toggle a task's completion status.

    - **user_id**: User ID from URL path
    - **task_id**: Task ID to toggle
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Fetch task
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail=f"Task {task_id} not found or access forbidden"
        )

    # Toggle completion
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
