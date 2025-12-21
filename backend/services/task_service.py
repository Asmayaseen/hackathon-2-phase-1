"""Task service - Business logic for task operations."""

from sqlmodel import Session, select, or_, func
from models import Task
from datetime import datetime
from typing import List, Optional


class TaskService:
    """Service class for task-related business logic."""

    @staticmethod
    def create_task(
        db: Session,
        user_id: str,
        title: str,
        description: Optional[str] = None,
        priority: str = "medium",
        due_date: Optional[datetime] = None,
    ) -> Task:
        """Create a new task."""
        task = Task(
            user_id=user_id,
            title=title,
            description=description,
            priority=priority,
            due_date=due_date,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def get_task(db: Session, user_id: str, task_id: int) -> Optional[Task]:
        """Get a single task by ID."""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        return db.exec(statement).first()

    @staticmethod
    def list_tasks(
        db: Session,
        user_id: str,
        status: str = "all",
        sort_by: str = "created",
        search: Optional[str] = None,
        page: int = 1,
        limit: int = 20,
    ) -> tuple:
        """List tasks with filtering, sorting, search, and pagination."""
        # Base query
        statement = select(Task).where(Task.user_id == user_id)

        # Filter by status
        if status == "pending":
            statement = statement.where(Task.completed == False)
        elif status == "completed":
            statement = statement.where(Task.completed == True)

        # Search in title and description
        if search:
            search_term = f"%{search}%"
            statement = statement.where(
                or_(
                    Task.title.ilike(search_term),
                    Task.description.ilike(search_term) if Task.description.isnot(None) else False
                )
            )

        # Get total count
        count_statement = select(func.count()).select_from(statement.subquery())
        total_count = db.exec(count_statement).one()

        # Sorting
        if sort_by == "created":
            statement = statement.order_by(Task.created_at.desc())
        elif sort_by == "title":
            statement = statement.order_by(Task.title.asc())
        elif sort_by == "updated":
            statement = statement.order_by(Task.updated_at.desc())
        elif sort_by == "priority":
            statement = statement.order_by(Task.priority.desc())
        elif sort_by == "due_date":
            statement = statement.order_by(Task.due_date.asc())
        else:
            statement = statement.order_by(Task.created_at.desc())

        # Pagination
        offset = (page - 1) * limit
        statement = statement.offset(offset).limit(limit)

        tasks = db.exec(statement).all()
        return list(tasks), total_count

    @staticmethod
    def update_task(
        db: Session,
        user_id: str,
        task_id: int,
        title: Optional[str] = None,
        description: Optional[str] = None,
        priority: Optional[str] = None,
        due_date: Optional[datetime] = None,
    ) -> Optional[Task]:
        """Update a task."""
        task = TaskService.get_task(db, user_id, task_id)
        if not task:
            return None

        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if priority is not None:
            task.priority = priority
        if due_date is not None:
            task.due_date = due_date

        task.updated_at = datetime.utcnow()
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, user_id: str, task_id: int) -> bool:
        """Delete a task."""
        task = TaskService.get_task(db, user_id, task_id)
        if not task:
            return False

        db.delete(task)
        db.commit()
        return True

    @staticmethod
    def toggle_complete(db: Session, user_id: str, task_id: int) -> Optional[Task]:
        """Toggle task completion status."""
        task = TaskService.get_task(db, user_id, task_id)
        if not task:
            return None

        task.completed = not task.completed
        task.updated_at = datetime.utcnow()
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def bulk_delete(db: Session, user_id: str, task_ids: List[int]) -> int:
        """Bulk delete tasks."""
        statement = select(Task).where(
            Task.user_id == user_id,
            Task.id.in_(task_ids)
        )
        tasks = db.exec(statement).all()

        for task in tasks:
            db.delete(task)

        db.commit()
        return len(tasks)

    @staticmethod
    def bulk_complete(db: Session, user_id: str, task_ids: List[int], completed: bool = True) -> int:
        """Bulk update completion status."""
        statement = select(Task).where(
            Task.user_id == user_id,
            Task.id.in_(task_ids)
        )
        tasks = db.exec(statement).all()

        for task in tasks:
            task.completed = completed
            task.updated_at = datetime.utcnow()
            db.add(task)

        db.commit()
        return len(tasks)

    @staticmethod
    def get_stats(db: Session, user_id: str) -> dict:
        """Get task statistics."""
        statement = select(Task).where(Task.user_id == user_id)
        tasks = db.exec(statement).all()

        total = len(tasks)
        completed = sum(1 for task in tasks if task.completed)
        pending = total - completed
        completion_rate = int((completed / total * 100)) if total > 0 else 0

        return {
            "total": total,
            "completed": completed,
            "pending": pending,
            "completionRate": completion_rate,
        }
