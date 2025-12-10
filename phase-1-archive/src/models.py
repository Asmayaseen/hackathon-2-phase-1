"""Data models for the Todo application.

This module contains the data model definitions for Phase I.
Uses dataclasses for clean, typed data structures.
"""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Todo:
    """Represents a todo item.

    Attributes:
        id: Unique identifier (auto-increment starting from 1)
        title: Todo item description/title
        completed: Whether the todo is complete (default: False)
        created_at: Timestamp when todo was created (auto-generated)

    Examples:
        >>> todo = Todo(id=1, title="Buy groceries")
        >>> print(todo.title)
        Buy groceries
        >>> print(todo.completed)
        False
    """

    id: int
    title: str
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)

    def __str__(self) -> str:
        """String representation of the todo.

        Returns:
            Formatted string with status, title, and timestamp
        """
        status = "[✓]" if self.completed else "[✗]"
        timestamp = self.created_at.strftime("%Y-%m-%d %H:%M")
        return f"{self.id}. {status} {self.title} (Created: {timestamp})"
