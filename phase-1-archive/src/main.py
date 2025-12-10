"""Main entry point for the Todo application.

This is the application entry point that coordinates the UI and business logic.
Run this file to start the Todo List Manager.

Usage:
    python main.py
    or
    python src/main.py (from project root)
"""

from todo_manager import TodoManager
from ui import (
    display_menu,
    get_menu_choice,
    handle_add_todo,
    handle_view_todos,
    handle_update_todo,
    handle_delete_todo,
    handle_mark_complete,
    display_goodbye,
)


def main() -> None:
    """Main application loop.

    Initializes the TodoManager and runs the main menu loop.
    Handles user choices and delegates to appropriate UI handlers.
    """
    print("\n" + "=" * 40)
    print("Welcome to Todo List Manager!")
    print("Evolution of Todo - Phase I")
    print("=" * 40)

    # Initialize the todo manager
    manager = TodoManager()

    # Main application loop
    while True:
        display_menu()
        choice = get_menu_choice()

        if choice == 1:
            handle_add_todo(manager)
        elif choice == 2:
            handle_view_todos(manager)
        elif choice == 3:
            handle_update_todo(manager)
        elif choice == 4:
            handle_delete_todo(manager)
        elif choice == 5:
            handle_mark_complete(manager)
        elif choice == 6:
            display_goodbye()
            break
        else:
            print("\n✗ Invalid choice. Please enter a number between 1 and 6.")

        # Small pause for readability (optional)
        input("\nPress Enter to continue...")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nApplication interrupted by user.")
        display_goodbye()
    except Exception as e:
        print(f"\n✗ An unexpected error occurred: {e}")
        print("Please report this issue.")
