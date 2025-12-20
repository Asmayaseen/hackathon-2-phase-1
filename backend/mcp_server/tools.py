"""
MCP Tools for Task Management.

Tasks: T-303 to T-307 - Implement all 5 MCP Tools
Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
Plan: specs-history/phase-3-chatbot/plan.md Phase 3 Steps 3.3-3.4

This module provides MCP tools that AI agents use to manage tasks.
All tools follow these Constitution principles:

1. MCP-First Tool Design - All task operations via MCP
2. Service Layer Pattern - Tools call service layer for business logic
3. User Authorization - Every tool validates user_id
4. Type Safety - Full type hints
5. Error Handling - Graceful, user-friendly errors
"""

from mcp.server import tool
from typing import Dict, List, Any, Optional
from database import get_db
from services.task_service import (
    create_task as service_create_task,
    list_tasks as service_list_tasks,
    get_task as service_get_task,
    update_task as service_update_task,
    delete_task as service_delete_task,
    toggle_complete as service_toggle_complete,
)
import logging

logger = logging.getLogger(__name__)


@tool
async def add_task(
    user_id: str,
    title: str,
    description: Optional[str] = None
) -> Dict[str, Any]:
    """
    Create a new task for the user.

    Task: T-303 - Implement add_task MCP Tool
    Constitution: MCP-First Tool Design, User Authorization

    Args:
        user_id: User ID who owns the task (required)
        title: Task title, 1-200 characters (required)
        description: Optional task description, max 1000 characters

    Returns:
        dict: {
            "task_id": int,
            "status": "created",
            "title": str
        }

        Or on error: {
            "error": str
        }

    Example:
        >>> await add_task("user123", "Buy groceries", "Milk, eggs, bread")
        {"task_id": 5, "status": "created", "title": "Buy groceries"}
    """
    # Validation
    if not user_id:
        return {"error": "user_id is required"}

    if not title:
        return {"error": "title is required"}

    if len(title) > 200:
        return {"error": "Title must be max 200 characters"}

    if description and len(description) > 1000:
        return {"error": "Description must be max 1000 characters"}

    # Get database session
    db = next(get_db())

    try:
        # Call service layer
        task = await service_create_task(
            user_id=user_id,
            title=title,
            description=description,
            db=db
        )

        logger.info(f"Task created via MCP: user={user_id}, task_id={task.id}")

        return {
            "task_id": task.id,
            "status": "created",
            "title": task.title
        }

    except ValueError as e:
        logger.warning(f"Validation error in add_task: {e}")
        return {"error": str(e)}

    except Exception as e:
        logger.error(f"Unexpected error in add_task: {e}")
        return {"error": "Failed to create task. Please try again."}

    finally:
        db.close()


@tool
async def list_tasks(
    user_id: str,
    status: str = "all"
) -> List[Dict[str, Any]]:
    """
    Retrieve tasks for the user with optional filtering.

    Task: T-304 - Implement list_tasks MCP Tool
    Constitution: User Authorization, Type Safety

    Args:
        user_id: User ID (required)
        status: Filter by status - "all", "pending", or "completed" (default: "all")

    Returns:
        list: Array of task objects [
            {
                "id": int,
                "title": str,
                "description": str,
                "completed": bool,
                "priority": str,
                "created_at": str (ISO format)
            },
            ...
        ]

        Or on error: [{"error": str}]

    Example:
        >>> await list_tasks("user123", "pending")
        [
            {"id": 1, "title": "Buy milk", "completed": false, ...},
            {"id": 2, "title": "Call mom", "completed": false, ...}
        ]
    """
    # Validation
    if not user_id:
        return [{"error": "user_id is required"}]

    if status not in ["all", "pending", "completed"]:
        return [{"error": "status must be 'all', 'pending', or 'completed'"}]

    # Get database session
    db = next(get_db())

    try:
        # Call service layer
        tasks = await service_list_tasks(
            user_id=user_id,
            status=status,
            db=db
        )

        logger.info(f"Tasks listed via MCP: user={user_id}, status={status}, count={len(tasks)}")

        # Convert to dict format
        return [
            {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "completed": task.completed,
                "priority": task.priority,
                "due_date": task.due_date.isoformat() if task.due_date else None,
                "created_at": task.created_at.isoformat()
            }
            for task in tasks
        ]

    except ValueError as e:
        logger.warning(f"Validation error in list_tasks: {e}")
        return [{"error": str(e)}]

    except Exception as e:
        logger.error(f"Unexpected error in list_tasks: {e}")
        return [{"error": "Failed to retrieve tasks. Please try again."}]

    finally:
        db.close()


@tool
async def complete_task(
    user_id: str,
    task_id: int
) -> Dict[str, Any]:
    """
    Mark a task as complete (or toggle completion status).

    Task: T-305 - Implement complete_task MCP Tool
    Constitution: User Authorization, Graceful Error Handling

    Args:
        user_id: User ID (required, for authorization)
        task_id: Task ID to complete (required)

    Returns:
        dict: {
            "task_id": int,
            "status": "completed" or "pending",
            "title": str
        }

        Or on error: {
            "error": str
        }

    Example:
        >>> await complete_task("user123", 3)
        {"task_id": 3, "status": "completed", "title": "Call mom"}
    """
    # Validation
    if not user_id:
        return {"error": "user_id is required"}

    if not task_id:
        return {"error": "task_id is required"}

    # Get database session
    db = next(get_db())

    try:
        # Call service layer
        task = await service_toggle_complete(
            user_id=user_id,
            task_id=task_id,
            db=db
        )

        if not task:
            # Don't reveal if task doesn't exist or user doesn't own it
            return {"error": "Task not found"}

        logger.info(f"Task completed via MCP: user={user_id}, task_id={task_id}, completed={task.completed}")

        return {
            "task_id": task.id,
            "status": "completed" if task.completed else "pending",
            "title": task.title
        }

    except ValueError as e:
        logger.warning(f"Validation error in complete_task: {e}")
        return {"error": str(e)}

    except Exception as e:
        logger.error(f"Unexpected error in complete_task: {e}")
        return {"error": "Failed to complete task. Please try again."}

    finally:
        db.close()


@tool
async def delete_task(
    user_id: str,
    task_id: int
) -> Dict[str, Any]:
    """
    Delete a task from the user's list.

    Task: T-306 - Implement delete_task MCP Tool
    Constitution: User Authorization, Security (don't reveal task existence)

    Args:
        user_id: User ID (required, for authorization)
        task_id: Task ID to delete (required)

    Returns:
        dict: {
            "task_id": int,
            "status": "deleted",
            "title": str
        }

        Or on error: {
            "error": str
        }

    Example:
        >>> await delete_task("user123", 2)
        {"task_id": 2, "status": "deleted", "title": "Old task"}
    """
    # Validation
    if not user_id:
        return {"error": "user_id is required"}

    if not task_id:
        return {"error": "task_id is required"}

    # Get database session
    db = next(get_db())

    try:
        # Get task first to return title (and verify ownership)
        task = await service_get_task(
            user_id=user_id,
            task_id=task_id,
            db=db
        )

        if not task:
            # Don't reveal if task doesn't exist or user doesn't own it
            return {"error": "Task not found"}

        title = task.title

        # Delete task
        success = await service_delete_task(
            user_id=user_id,
            task_id=task_id,
            db=db
        )

        if success:
            logger.info(f"Task deleted via MCP: user={user_id}, task_id={task_id}")

            return {
                "task_id": task_id,
                "status": "deleted",
                "title": title
            }
        else:
            return {"error": "Failed to delete task"}

    except ValueError as e:
        logger.warning(f"Validation error in delete_task: {e}")
        return {"error": str(e)}

    except Exception as e:
        logger.error(f"Unexpected error in delete_task: {e}")
        return {"error": "Failed to delete task. Please try again."}

    finally:
        db.close()


@tool
async def update_task(
    user_id: str,
    task_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None
) -> Dict[str, Any]:
    """
    Update task title or description.

    Task: T-307 - Implement update_task MCP Tool
    Constitution: User Authorization, Type Safety

    Args:
        user_id: User ID (required, for authorization)
        task_id: Task ID to update (required)
        title: New title (optional, 1-200 characters)
        description: New description (optional, max 1000 characters)

    Returns:
        dict: {
            "task_id": int,
            "status": "updated",
            "title": str
        }

        Or on error: {
            "error": str
        }

    Note:
        At least one of title or description must be provided.

    Example:
        >>> await update_task("user123", 1, title="Buy groceries and fruits")
        {"task_id": 1, "status": "updated", "title": "Buy groceries and fruits"}
    """
    # Validation
    if not user_id:
        return {"error": "user_id is required"}

    if not task_id:
        return {"error": "task_id is required"}

    if title is None and description is None:
        return {"error": "At least one field (title or description) must be provided"}

    # Get database session
    db = next(get_db())

    try:
        # Build updates dictionary
        updates = {}
        if title is not None:
            if not title or len(title) > 200:
                return {"error": "Title must be 1-200 characters"}
            updates["title"] = title

        if description is not None:
            if len(description) > 1000:
                return {"error": "Description must be max 1000 characters"}
            updates["description"] = description

        # Call service layer
        task = await service_update_task(
            user_id=user_id,
            task_id=task_id,
            updates=updates,
            db=db
        )

        if not task:
            # Don't reveal if task doesn't exist or user doesn't own it
            return {"error": "Task not found"}

        logger.info(f"Task updated via MCP: user={user_id}, task_id={task_id}, fields={list(updates.keys())}")

        return {
            "task_id": task.id,
            "status": "updated",
            "title": task.title
        }

    except ValueError as e:
        logger.warning(f"Validation error in update_task: {e}")
        return {"error": str(e)}

    except Exception as e:
        logger.error(f"Unexpected error in update_task: {e}")
        return {"error": "Failed to update task. Please try again."}

    finally:
        db.close()


# Log tool registration
logger.info("MCP Tools registered: add_task, list_tasks, complete_task, delete_task, update_task")
