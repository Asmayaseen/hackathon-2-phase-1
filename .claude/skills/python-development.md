# Skill: Python Development

> **Category:** Programming & Implementation
> **Used By:** Python-Developer Agent
> **Purpose:** Implement features using Python 3.13+ with best practices

---

## 📋 Skill Description

The python-development skill enables implementing clean, maintainable, and correct Python code following modern Python standards and best practices.

## 🎯 Skill Objectives

1. Write Python 3.13+ compatible code
2. Follow PEP 8 style guidelines
3. Use type hints effectively
4. Implement clean architecture
5. Handle errors gracefully

---

## 🛠️ Core Competencies

### 1. Modern Python Syntax
```python
# Use type hints
def add_todo(title: str) -> Todo | None:
    pass

# Use dataclasses
from dataclasses import dataclass, field

@dataclass
class Todo:
    id: int
    title: str
    completed: bool = False

# Use match-case (Python 3.10+)
match choice:
    case 1:
        handle_add()
    case 2:
        handle_view()
```

### 2. Type Hints
```python
# Basic types
def greet(name: str) -> str:
    return f"Hello, {name}"

# Optional types
def find_todo(id: int) -> Todo | None:
    pass

# Collections
def get_todos() -> list[Todo]:
    pass

# Multiple return values
def calculate_stats() -> tuple[int, int, int]:
    return total, completed, pending
```

### 3. Error Handling
```python
# Specific exceptions
try:
    value = int(input("Enter number: "))
except ValueError:
    print("Error: Invalid number")
    return

# Multiple exceptions
try:
    # ... code
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Finally block for cleanup
try:
    # ... code
finally:
    # Cleanup
```

### 4. Clean Code Patterns
```python
# List comprehensions
completed = [t for t in todos if t.completed]

# Generator expressions
total = sum(1 for t in todos if t.completed)

# Context managers (when needed)
with open('file.txt') as f:
    content = f.read()

# Dataclasses for data
@dataclass
class Todo:
    id: int
    title: str
```

---

## 📐 PEP 8 Standards

### Naming Conventions
```python
# Variables and functions: snake_case
todo_manager = TodoManager()
def add_todo(): pass

# Classes: PascalCase
class TodoManager: pass

# Constants: UPPER_CASE
MAX_TODOS = 1000

# Private: _leading_underscore
def _internal_function(): pass
```

### Code Layout
```python
# Imports at top
import sys
from datetime import datetime
from dataclasses import dataclass

# Two blank lines before class/function
def function_one():
    pass


def function_two():
    pass

# One blank line between methods
class MyClass:
    def method_one(self):
        pass

    def method_two(self):
        pass
```

### Line Length and Spacing
```python
# Max 100 characters per line (project standard)
# Spaces around operators
result = value + 10

# No spaces inside brackets
my_list = [1, 2, 3]
my_dict = {'key': 'value'}

# Space after comma
function(arg1, arg2, arg3)
```

---

## 🏗️ Architecture Patterns

### Separation of Concerns
```python
# models.py - Data only
@dataclass
class Todo:
    id: int
    title: str

# todo_manager.py - Business logic only
class TodoManager:
    def add_todo(self, title: str) -> Todo | None:
        # Logic here
        pass

# ui.py - UI only
def display_menu():
    print("=== Menu ===")

# main.py - Coordination
def main():
    manager = TodoManager()
    while True:
        display_menu()
        # Handle choices
```

### Single Responsibility
```python
# Good - Each function does one thing
def validate_title(title: str) -> bool:
    return bool(title.strip())

def create_todo(title: str) -> Todo:
    return Todo(id=next_id(), title=title)

# Bad - Function does too much
def add_todo_with_validation_and_display(title):
    if not title.strip():
        print("Error")
        return
    todo = create_todo(title)
    print(f"Added: {todo}")
    return todo
```

---

## 📝 Documentation Standards

### Docstrings
```python
def add_todo(title: str) -> Todo | None:
    """Add a new todo item.

    Creates a new todo with auto-generated ID and timestamp.
    Validates that title is not empty.

    Args:
        title: The todo item title (whitespace will be trimmed)

    Returns:
        The created Todo object if successful, None if title is invalid

    Raises:
        ValueError: If title is empty after stripping whitespace

    Examples:
        >>> todo = add_todo("Buy groceries")
        >>> print(todo.title)
        Buy groceries
    """
    pass
```

### Inline Comments
```python
# Use comments for complex logic
def calculate_stats(todos: list[Todo]) -> dict:
    # Count completed todos efficiently using generator expression
    completed = sum(1 for t in todos if t.completed)

    # Calculate percentage, avoiding division by zero
    total = len(todos)
    percentage = (completed / total * 100) if total > 0 else 0

    return {'total': total, 'completed': completed, 'percentage': percentage}
```

---

## 🧪 Testing Practices

### Manual Testing Approach
```python
# Test systematically
def test_add_todo():
    """Manual test checklist:
    1. Valid title - should create todo
    2. Empty title - should return None
    3. Whitespace title - should return None
    4. Very long title - should accept
    5. Special characters - should accept
    """
    pass
```

---

## 🚨 Common Pitfalls to Avoid

### 1. Mutable Default Arguments
```python
# ❌ Bad - Mutable default
def add_items(items=[]):
    items.append(1)
    return items

# ✅ Good - Use None
def add_items(items=None):
    if items is None:
        items = []
    items.append(1)
    return items
```

### 2. Bare Except
```python
# ❌ Bad - Catches everything
try:
    value = int(x)
except:
    pass

# ✅ Good - Specific exception
try:
    value = int(x)
except ValueError:
    print("Invalid integer")
```

### 3. Missing Type Hints
```python
# ❌ Bad - No types
def process(data):
    return data.upper()

# ✅ Good - With types
def process(data: str) -> str:
    return data.upper()
```

---

## 💡 Best Practices

### 1. Use Dataclasses for Data
```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Todo:
    id: int
    title: str
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)
```

### 2. Use List Comprehensions
```python
# Good - Readable and efficient
completed_todos = [t for t in todos if t.completed]

# Avoid - Unnecessarily complex
completed_todos = list(filter(lambda t: t.completed, todos))
```

### 3. Use f-strings
```python
# Good - Clear and efficient
message = f"Todo {todo.id}: {todo.title}"

# Avoid - Old style
message = "Todo {}: {}".format(todo.id, todo.title)
```

### 4. Guard Clauses
```python
# Good - Early return
def process_todo(todo: Todo | None) -> str:
    if todo is None:
        return "No todo"

    if not todo.title:
        return "Empty title"

    # Main logic here
    return f"Processing: {todo.title}"

# Avoid - Deep nesting
def process_todo(todo):
    if todo is not None:
        if todo.title:
            # Main logic nested deeply
            return f"Processing: {todo.title}"
        else:
            return "Empty title"
    else:
        return "No todo"
```

---

## 🎓 Skill Mastery Levels

### Beginner
- Can write basic Python code
- Can use basic type hints
- Can handle simple errors

### Intermediate
- Can use advanced type hints
- Can write clean, organized code
- Can handle complex error scenarios
- Can use dataclasses effectively

### Expert
- Can design clean architectures
- Can write highly maintainable code
- Can optimize appropriately
- Can handle all edge cases elegantly

---

## 📚 Resources

### Python 3.13+ Features
- Type hints with `|` operator
- Dataclasses
- Match-case statements
- Improved error messages

### Tools
- **ruff** - Linting and formatting
- **mypy** - Type checking (optional)
- **black** - Code formatting (if needed)

---

**Status:** Active
**Version:** 1.0
**Used In:** Phase I Constitution
**Required For:** All Python implementation
