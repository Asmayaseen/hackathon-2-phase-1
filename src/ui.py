"""Console user interface for the Todo application.

This module contains all UI-related functions for the console interface.
No business logic here - only user interaction and display.
"""

from todo_manager import TodoManager
from models import Todo


def display_menu() -> None:
    """Display the main menu."""
    print("\n" + "=" * 30)
    print("=== Todo List Manager ===")
    print("=" * 30)
    print("1. Add Todo")
    print("2. View Todos")
    print("3. Update Todo")
    print("4. Delete Todo")
    print("5. Mark Complete/Incomplete")
    print("6. Exit")
    print("=" * 30)


def get_menu_choice() -> int:
    """Get user's menu choice with validation.

    Returns:
        Valid menu choice (1-6), or -1 if invalid input
    """
    try:
        choice = int(input("\nEnter your choice (1-6): "))
        return choice
    except ValueError:
        return -1
    except (EOFError, KeyboardInterrupt):
        return 6  # Exit on EOF or Ctrl+C


def handle_add_todo(manager: TodoManager) -> None:
    """Handle adding a new todo.

    Prompts user for title, validates input, and adds todo.

    Args:
        manager: The TodoManager instance
    """
    print("\n--- Add Todo ---")

    try:
        title = input("Enter todo title: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    if not title:
        print("✗ Error: Title cannot be empty")
        return

    todo = manager.add_todo(title)
    if todo:
        print("✓ Todo added successfully!")
    else:
        print("✗ Error: Could not add todo")


def handle_view_todos(manager: TodoManager) -> None:
    """Handle viewing all todos.

    Displays all todos in formatted list with statistics.

    Args:
        manager: The TodoManager instance
    """
    print("\n=== Your Todos ===")

    todos = manager.get_all_todos()

    if not todos:
        print("No todos yet. Add your first todo!")
        return

    # Display each todo
    for todo in todos:
        print(str(todo))

    # Display statistics
    total, completed, pending = manager.get_statistics()
    todo_word = "todo" if total == 1 else "todos"
    print(f"\nTotal: {total} {todo_word} ({completed} completed, {pending} pending)")


def handle_update_todo(manager: TodoManager) -> None:
    """Handle updating a todo's title.

    Prompts for ID and new title, validates, and updates.

    Args:
        manager: The TodoManager instance
    """
    print("\n--- Update Todo ---")

    # Get todo ID
    try:
        todo_id = int(input("Enter todo ID to update: "))
    except ValueError:
        print("✗ Error: Invalid ID format")
        return
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    # Find todo
    todo = manager.find_todo_by_id(todo_id)
    if not todo:
        print(f"✗ Error: Todo with ID {todo_id} not found")
        return

    # Show current todo
    status = "[✓]" if todo.completed else "[✗]"
    print(f"Current todo: {status} {todo.title}")

    # Get new title
    try:
        new_title = input("\nEnter new title: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    if not new_title:
        print("✗ Error: Title cannot be empty")
        return

    # Update
    if manager.update_todo(todo_id, new_title):
        print("✓ Todo updated successfully!")
    else:
        print("✗ Error: Could not update todo")


def handle_delete_todo(manager: TodoManager) -> None:
    """Handle deleting a todo.

    Prompts for ID, shows todo, asks for confirmation, and deletes.

    Args:
        manager: The TodoManager instance
    """
    print("\n--- Delete Todo ---")

    # Get todo ID
    try:
        todo_id = int(input("Enter todo ID to delete: "))
    except ValueError:
        print("✗ Error: Invalid ID format")
        return
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    # Find todo
    todo = manager.find_todo_by_id(todo_id)
    if not todo:
        print(f"✗ Error: Todo with ID {todo_id} not found")
        return

    # Show todo to be deleted
    status = "[✓]" if todo.completed else "[✗]"
    print(f"\nTodo to delete: {status} {todo.title}")

    # Confirm deletion
    try:
        response = input("\nAre you sure you want to delete this todo? (Y/N): ").strip().lower()
    except (EOFError, KeyboardInterrupt):
        print("\nDeletion cancelled")
        return

    if response not in ('y', 'yes'):
        print("Deletion cancelled")
        return

    # Delete
    if manager.delete_todo(todo_id):
        print("✓ Todo deleted successfully!")
    else:
        print("✗ Error: Could not delete todo")


def handle_mark_complete(manager: TodoManager) -> None:
    """Handle marking a todo as complete/incomplete.

    Prompts for ID, shows current status, and toggles.

    Args:
        manager: The TodoManager instance
    """
    print("\n--- Mark Complete/Incomplete ---")

    # Get todo ID
    try:
        todo_id = int(input("Enter todo ID: "))
    except ValueError:
        print("✗ Error: Invalid ID format")
        return
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    # Find todo
    todo = manager.find_todo_by_id(todo_id)
    if not todo:
        print(f"✗ Error: Todo with ID {todo_id} not found")
        return

    # Show current status
    status = "[✓]" if todo.completed else "[✗]"
    print(f"\nCurrent: {status} {todo.title}")

    # Toggle
    if manager.toggle_todo_status(todo_id):
        if todo.completed:
            print("✓ Todo marked as complete!")
        else:
            print("✓ Todo marked as incomplete!")
    else:
        print("✗ Error: Could not update todo")


def display_goodbye() -> None:
    """Display goodbye message."""
    print("\n" + "=" * 30)
    print("Thank you for using Todo Manager!")
    print("Goodbye! 👋")
    print("=" * 30)
