# Skill: Console UI Design

> **Category:** User Interface & Experience
> **Used By:** Python-Developer Agent
> **Purpose:** Design clear, intuitive console interfaces

---

## 📋 Skill Description

The console-ui-design skill enables creating user-friendly command-line interfaces with clear menus, formatted output, and intuitive interactions.

## 🎯 Skill Objectives

1. Create clear, readable menus
2. Design formatted output displays
3. Implement intuitive input handling
4. Provide helpful feedback
5. Ensure consistent user experience

---

## 🎨 Design Principles

### 1. Clarity
- Every prompt should be clear and specific
- Every output should be formatted and readable
- Every error should explain what happened

### 2. Consistency
- Use consistent formatting throughout
- Use consistent terminology
- Use consistent visual indicators

### 3. Feedback
- Confirm all actions
- Show current state
- Explain what happened
- Guide next steps

### 4. Error Handling
- Clear error messages
- Explain what went wrong
- Suggest how to fix
- Allow recovery

---

## 📋 Menu Design

### Main Menu Template
```python
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
```

### Menu Best Practices
- Use numbered options (1, 2, 3...)
- Keep options short and clear
- Include an exit option
- Use visual separators (===, ---)
- Add spacing for readability

---

## 📊 Output Formatting

### List Display
```python
def display_todos(todos: list[Todo]) -> None:
    """Display all todos in formatted list."""
    if not todos:
        print("\n=== Your Todos ===")
        print("No todos yet. Add your first todo!")
        return

    print("\n=== Your Todos ===")
    for todo in todos:
        status = "[✓]" if todo.completed else "[✗]"
        timestamp = todo.created_at.strftime("%Y-%m-%d %H:%M")
        print(f"{todo.id}. {status} {todo.title} (Created: {timestamp})")

    # Summary statistics
    total = len(todos)
    completed = sum(1 for t in todos if t.completed)
    pending = total - completed
    print(f"\nTotal: {total} todo{'s' if total != 1 else ''} "
          f"({completed} completed, {pending} pending)")
```

### Status Indicators
```python
# Use visual symbols
"[✓]"  # Completed
"[✗]"  # Incomplete
"✓"    # Success indicator
"✗"    # Error indicator

# Usage examples
print("✓ Todo added successfully!")
print("✗ Error: Todo not found")
```

### Formatting Helpers
```python
def format_header(text: str, width: int = 50) -> str:
    """Format a header with borders."""
    return f"\n{'=' * width}\n{text.center(width)}\n{'=' * width}"

def format_status(completed: bool) -> str:
    """Format completion status."""
    return "[✓]" if completed else "[✗]"

def format_timestamp(dt: datetime) -> str:
    """Format timestamp consistently."""
    return dt.strftime("%Y-%m-%d %H:%M")
```

---

## 🎯 Input Handling

### Menu Choice Input
```python
def get_menu_choice() -> int:
    """Get user's menu choice with validation."""
    try:
        choice = int(input("\nEnter your choice (1-6): "))
        return choice
    except ValueError:
        return -1  # Invalid choice indicator
    except EOFError:
        return 6  # Exit on EOF
```

### Text Input
```python
def get_todo_title() -> str | None:
    """Get todo title from user."""
    try:
        title = input("Enter todo title: ").strip()
        if not title:
            print("✗ Error: Title cannot be empty")
            return None
        return title
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return None
```

### Confirmation Input
```python
def confirm_action(message: str) -> bool:
    """Get yes/no confirmation from user."""
    try:
        response = input(f"{message} (Y/N): ").strip().lower()
        return response in ('y', 'yes')
    except (EOFError, KeyboardInterrupt):
        return False  # Default to no on interrupt
```

---

## 💬 Feedback Messages

### Success Messages
```python
# Clear, positive feedback
print("✓ Todo added successfully!")
print("✓ Todo updated successfully!")
print("✓ Todo deleted successfully!")
print("✓ Todo marked as complete!")
```

### Error Messages
```python
# Clear, specific errors
print("✗ Error: Title cannot be empty")
print("✗ Error: Todo with ID 5 not found")
print("✗ Error: Invalid ID format")
print("✗ Error: Invalid input")
```

### Info Messages
```python
# Helpful information
print("Deletion cancelled")
print("No todos yet. Add your first todo!")
print("Operation cancelled")
```

---

## 🎨 Visual Design Patterns

### Section Headers
```python
def print_section_header(title: str):
    """Print a section header."""
    print(f"\n=== {title} ===")

# Usage
print_section_header("Your Todos")
print_section_header("Add New Todo")
```

### Separators
```python
# Visual separation
print("-" * 50)  # Light separator
print("=" * 50)  # Heavy separator
print()           # Blank line

# Usage
display_menu()
print("-" * 50)
show_current_state()
```

### Aligned Output
```python
# Left-aligned with consistent spacing
print(f"{id:3d}. {status:3s} {title}")

# Example output:
#   1. [✓] Buy groceries
#   2. [✗] Finish project
#  10. [✓] Call mom
```

---

## 🚨 Error Handling UI

### Input Validation Feedback
```python
def handle_add_todo(manager: TodoManager) -> None:
    """Handle add todo with validation feedback."""
    title = input("Enter todo title: ").strip()

    if not title:
        print("✗ Error: Title cannot be empty")
        return

    todo = manager.add_todo(title)
    if todo:
        print("✓ Todo added successfully!")
    else:
        print("✗ Error: Could not add todo")
```

### Operation Feedback
```python
def handle_delete_todo(manager: TodoManager) -> None:
    """Handle delete todo with feedback."""
    try:
        todo_id = int(input("Enter todo ID to delete: "))
    except ValueError:
        print("✗ Error: Invalid ID format")
        return

    todo = manager.find_todo_by_id(todo_id)
    if not todo:
        print(f"✗ Error: Todo with ID {todo_id} not found")
        return

    # Show what will be deleted
    status = format_status(todo.completed)
    print(f"\nTodo to delete: {status} {todo.title}")

    # Confirm
    if not confirm_action("Are you sure you want to delete this todo?"):
        print("Deletion cancelled")
        return

    # Delete and confirm
    if manager.delete_todo(todo_id):
        print("✓ Todo deleted successfully!")
    else:
        print("✗ Error: Could not delete todo")
```

---

## 📱 User Flow Design

### Linear Flow Example
```
[Display Menu]
      ↓
[Get Choice]
      ↓
[Execute Action]
      ↓
[Show Result]
      ↓
[Return to Menu]
```

### Interactive Flow Example
```
[Prompt for Input]
      ↓
[Validate Input]
      ↓
[If Invalid] → [Show Error] → [Return to Prompt]
      ↓ [If Valid]
[Show Confirmation]
      ↓
[Confirm Action]
      ↓
[If Yes] → [Execute] → [Show Success]
[If No] → [Cancel] → [Show Cancelled]
      ↓
[Return to Menu]
```

---

## 💡 Best Practices

### 1. Clear Prompts
```python
# Good - Specific and clear
input("Enter todo ID to update: ")
input("Enter new title: ")

# Bad - Vague
input("Enter value: ")
input("Input: ")
```

### 2. Visual Hierarchy
```python
# Good - Clear hierarchy
print("\n=== Todo List Manager ===")  # Main title
print("--- Current Todos ---")         # Section
print("1. Buy groceries")              # Item

# Bad - No hierarchy
print("Todo List Manager")
print("Current Todos")
print("Buy groceries")
```

### 3. Consistent Formatting
```python
# Good - Consistent status
def format_status(completed: bool) -> str:
    return "[✓]" if completed else "[✗]"

# Use everywhere
print(f"{format_status(todo.completed)} {todo.title}")

# Bad - Inconsistent
print(f"[X] {todo.title}")  # Sometimes X
print(f"[done] {todo.title}")  # Sometimes done
```

### 4. Helpful Defaults
```python
# Good - Provide context and defaults
choice = input("Enter choice (1-6) [1]: ")
choice = choice if choice else "1"

# Good - Clear range
input("Enter todo ID (1-10): ")
```

---

## 🎓 Skill Mastery Levels

### Beginner
- Can create basic menus
- Can get user input
- Can display simple output

### Intermediate
- Can format output nicely
- Can handle input validation
- Can provide good feedback
- Can create visual hierarchy

### Expert
- Can design intuitive workflows
- Can handle complex interactions
- Can provide excellent UX
- Can anticipate user needs

---

## 📚 Design Examples

### Full Feature Flow
```python
def handle_mark_complete(manager: TodoManager) -> None:
    """Handle marking todo complete/incomplete."""
    # Get input
    try:
        todo_id = int(input("Enter todo ID: "))
    except ValueError:
        print("✗ Error: Invalid ID format")
        return

    # Find todo
    todo = manager.find_todo_by_id(todo_id)
    if not todo:
        print(f"✗ Error: Todo with ID {todo_id} not found")
        return

    # Show current state
    status = format_status(todo.completed)
    print(f"\nCurrent: {status} {todo.title}")

    # Toggle
    if manager.toggle_todo(todo_id):
        new_status = "complete" if todo.completed else "incomplete"
        print(f"✓ Todo marked as {new_status}!")
    else:
        print("✗ Error: Could not update todo")
```

---

**Status:** Active
**Version:** 1.0
**Used In:** Phase I Constitution
**Required For:** All UI implementation
