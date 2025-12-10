"""Business logic for Todo CRUD operations.

This module contains the TodoManager class which handles all
business logic for managing todos. No UI code here - pure logic only.
"""

from models import Todo


class TodoManager:
    """Manages todo CRUD operations with in-memory storage.

    Attributes:
        todos: List of all todo items
        next_id: Next available ID for new todos (auto-increment)
    """

    def __init__(self) -> None:
        """Initialize the TodoManager with empty list."""
        self.todos: list[Todo] = []
        self.next_id: int = 1

    def add_todo(self, title: str) -> Todo | None:
        """Add a new todo item.

        Validates that title is not empty after stripping whitespace.
        Creates a new Todo with auto-generated ID and timestamp.

        Args:
            title: The todo item title (will be trimmed)

        Returns:
            The created Todo object if successful, None if title is invalid

        Examples:
            >>> manager = TodoManager()
            >>> todo = manager.add_todo("Buy groceries")
            >>> print(todo.title)
            Buy groceries
            >>> manager.add_todo("   ")  # Empty after trimming
            None
        """
        # Validate title
        title = title.strip()
        if not title:
            return None

        # Create todo with auto-generated ID
        todo = Todo(id=self.next_id, title=title)
        self.todos.append(todo)
        self.next_id += 1

        return todo

    def get_all_todos(self) -> list[Todo]:
        """Get all todos.

        Returns:
            List of all todo items (may be empty)
        """
        return self.todos.copy()

    def find_todo_by_id(self, todo_id: int) -> Todo | None:
        """Find a todo by its ID.

        Args:
            todo_id: The ID to search for

        Returns:
            The todo if found, None otherwise

        Examples:
            >>> manager = TodoManager()
            >>> todo = manager.add_todo("Test")
            >>> found = manager.find_todo_by_id(1)
            >>> print(found.title)
            Test
            >>> manager.find_todo_by_id(999)
            None
        """
        for todo in self.todos:
            if todo.id == todo_id:
                return todo
        return None

    def update_todo(self, todo_id: int, new_title: str) -> bool:
        """Update a todo item's title.

        Preserves ID, completion status, and creation timestamp.
        Only updates the title.

        Args:
            todo_id: The ID of the todo to update
            new_title: The new title (will be trimmed)

        Returns:
            True if updated successfully, False if todo not found or title invalid

        Examples:
            >>> manager = TodoManager()
            >>> todo = manager.add_todo("Old title")
            >>> manager.update_todo(1, "New title")
            True
            >>> manager.update_todo(999, "Title")
            False
        """
        # Validate new title
        new_title = new_title.strip()
        if not new_title:
            return False

        # Find and update todo
        todo = self.find_todo_by_id(todo_id)
        if todo is None:
            return False

        todo.title = new_title
        return True

    def delete_todo(self, todo_id: int) -> bool:
        """Delete a todo item.

        Args:
            todo_id: The ID of the todo to delete

        Returns:
            True if deleted successfully, False if todo not found

        Examples:
            >>> manager = TodoManager()
            >>> todo = manager.add_todo("To delete")
            >>> manager.delete_todo(1)
            True
            >>> manager.delete_todo(999)
            False
        """
        todo = self.find_todo_by_id(todo_id)
        if todo is None:
            return False

        self.todos.remove(todo)
        return True

    def toggle_todo_status(self, todo_id: int) -> bool:
        """Toggle the completion status of a todo.

        Switches from complete to incomplete or vice versa.

        Args:
            todo_id: The ID of the todo to toggle

        Returns:
            True if toggled successfully, False if todo not found

        Examples:
            >>> manager = TodoManager()
            >>> todo = manager.add_todo("Toggle me")
            >>> print(todo.completed)
            False
            >>> manager.toggle_todo_status(1)
            True
            >>> todo.completed
            True
        """
        todo = self.find_todo_by_id(todo_id)
        if todo is None:
            return False

        todo.completed = not todo.completed
        return True

    def get_statistics(self) -> tuple[int, int, int]:
        """Calculate todo statistics.

        Returns:
            Tuple of (total, completed, pending) counts

        Examples:
            >>> manager = TodoManager()
            >>> manager.add_todo("Todo 1")
            >>> manager.add_todo("Todo 2")
            >>> manager.toggle_todo_status(1)
            >>> total, completed, pending = manager.get_statistics()
            >>> print(f"{total} total, {completed} done, {pending} pending")
            2 total, 1 done, 1 pending
        """
        total = len(self.todos)
        completed = sum(1 for todo in self.todos if todo.completed)
        pending = total - completed
        return total, completed, pending
