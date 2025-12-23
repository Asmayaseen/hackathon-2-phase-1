"""Task management API routes."""

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlmodel import Session, select
from datetime import datetime
from typing import Literal, Optional
import csv
import json
import io

from database import get_db
from models import Task
from schemas.task import TaskCreate, TaskUpdate, TaskResponse, TaskListResponse
from middleware.auth import verify_jwt
from services.task_service import TaskService

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["tasks"])


@router.get("", response_model=TaskListResponse)
async def list_tasks(
    user_id: str,
    status: Literal["all", "pending", "completed"] = Query("all"),
    sort: Literal["created", "title", "updated", "priority", "due_date"] = Query("created"),
    search: Optional[str] = Query(None),
    page: int = Query(1, gt=0),
    limit: int = Query(20, gt=0, le=100),
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    List all tasks for a user with filtering, sorting, search, and pagination.

    - **user_id**: User ID from URL path
    - **status**: Filter by completion status (all/pending/completed)
    - **sort**: Sort order (created/title/updated/priority/due_date)
    - **search**: Search in title and description
    - **page**: Page number (starts from 1)
    - **limit**: Items per page (max 100)
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    # Use service layer
    tasks, total_count = TaskService.list_tasks(
        db=db,
        user_id=user_id,
        status=status,
        sort_by=sort,
        search=search,
        page=page,
        limit=limit
    )

    # Calculate statistics for current filter
    completed = sum(1 for task in tasks if task.completed)
    pending = len(tasks) - completed

    return TaskListResponse(
        tasks=tasks,
        total=total_count,
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
    - **priority**: Task priority (optional, default: 'medium')
    - **due_date**: Task due date (optional, ISO 8601 format)
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
        priority=task_data.priority,
        due_date=task_data.due_date,
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
    Update a task's title, description, priority, and/or due date.

    - **user_id**: User ID from URL path
    - **task_id**: Task ID to update
    - **title**: New title (optional)
    - **description**: New description (optional)
    - **priority**: New priority (optional)
    - **due_date**: New due date (optional)
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
    if task_data.priority is not None:
        task.priority = task_data.priority
    if task_data.due_date is not None:
        task.due_date = task_data.due_date

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


# Bulk Operations
@router.post("/bulk/delete")
async def bulk_delete_tasks(
    user_id: str,
    task_ids: list[int],
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Bulk delete multiple tasks.

    - **user_id**: User ID from URL path
    - **task_ids**: List of task IDs to delete
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    deleted_count = TaskService.bulk_delete(db, user_id, task_ids)

    return {
        "message": f"Successfully deleted {deleted_count} task(s)",
        "deleted_count": deleted_count
    }


@router.post("/bulk/complete")
async def bulk_complete_tasks(
    user_id: str,
    task_ids: list[int],
    completed: bool = True,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Bulk update completion status of multiple tasks.

    - **user_id**: User ID from URL path
    - **task_ids**: List of task IDs to update
    - **completed**: Completion status (true/false)
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    updated_count = TaskService.bulk_complete(db, user_id, task_ids, completed)

    return {
        "message": f"Successfully updated {updated_count} task(s)",
        "updated_count": updated_count,
        "completed": completed
    }


@router.get("/stats")
async def get_task_stats(
    user_id: str,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """
    Get task statistics for a user.

    - **user_id**: User ID from URL path
    """
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=403,
            detail="Access forbidden: user_id mismatch"
        )

    stats = TaskService.get_stats(db, user_id)
    return stats


# Export/Import Operations


@router.get("/export/csv")
async def export_tasks_csv(
    user_id: str,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """Export all tasks as CSV file."""
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    tasks, _ = TaskService.list_tasks(db, user_id, status="all", limit=10000)

    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)

    # Write header
    writer.writerow(["ID", "Title", "Description", "Priority", "Due Date", "Tags", "Completed", "Created At"])

    # Write tasks
    for task in tasks:
        writer.writerow([
            task.id,
            task.title,
            task.description or "",
            task.priority,
            task.due_date.isoformat() if task.due_date else "",
            ",".join(task.tags) if task.tags else "",
            task.completed,
            task.created_at.isoformat()
        ])

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=tasks.csv"}
    )


@router.get("/export/json")
async def export_tasks_json(
    user_id: str,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """Export all tasks as JSON file."""
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    tasks, _ = TaskService.list_tasks(db, user_id, status="all", limit=10000)

    # Convert to dict
    tasks_data = [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "priority": task.priority,
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "tags": task.tags,
            "completed": task.completed,
            "created_at": task.created_at.isoformat(),
            "updated_at": task.updated_at.isoformat()
        }
        for task in tasks
    ]

    json_str = json.dumps(tasks_data, indent=2)

    return StreamingResponse(
        iter([json_str]),
        media_type="application/json",
        headers={"Content-Disposition": "attachment; filename=tasks.json"}
    )


@router.post("/import/json")
async def import_tasks_json(
    user_id: str,
    tasks_data: list[dict],
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db),
):
    """Import tasks from JSON data."""
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Access forbidden")

    imported_count = 0
    errors = []

    for task_data in tasks_data:
        try:
            TaskService.create_task(
                db=db,
                user_id=user_id,
                title=task_data.get("title", "Untitled"),
                description=task_data.get("description"),
                priority=task_data.get("priority", "medium"),
                due_date=datetime.fromisoformat(task_data["due_date"]) if task_data.get("due_date") else None,
            )
            imported_count += 1
        except Exception as e:
            errors.append(f"Error importing task '{task_data.get('title', 'Unknown')}': {str(e)}")

    return {
        "message": f"Successfully imported {imported_count} task(s)",
        "imported": imported_count,
        "errors": errors
    }
