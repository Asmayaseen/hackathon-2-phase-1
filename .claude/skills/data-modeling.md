# Skill: Data Modeling

> **Category:** Design & Architecture
> **Used By:** Python-Developer Agent
> **Purpose:** Design efficient, appropriate data structures

---

## 📋 Skill Description

The data-modeling skill enables designing clean, efficient data structures using Python's dataclasses and modern features.

## 🎯 Data Model Principles

### 1. Use Dataclasses
```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Todo:
    """Todo item data model."""
    id: int
    title: str
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)
```

### 2. Type Safety
```python
# All fields have type annotations
id: int                    # Required, no default
title: str                 # Required, no default
completed: bool = False    # Optional, has default
```

### 3. Immutable When Possible
```python
@dataclass(frozen=True)  # Immutable
class Config:
    max_todos: int = 1000
    show_timestamps: bool = True
```

### 4. Defaults and Factories
```python
# Static default
completed: bool = False

# Dynamic default (factory)
created_at: datetime = field(default_factory=datetime.now)
```

---

## 🏗️ Phase I Data Model

### Todo Item
```python
@dataclass
class Todo:
    """Represents a todo item.

    Attributes:
        id: Unique identifier (auto-increment)
        title: Todo item description
        completed: Whether todo is complete (default: False)
        created_at: When todo was created (auto-generated)
    """
    id: int
    title: str
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)
```

### In-Memory Storage
```python
class TodoManager:
    """Manages todo CRUD operations."""

    def __init__(self):
        """Initialize with empty todo list."""
        self.todos: list[Todo] = []
        self.next_id: int = 1
```

---

**Status:** Active
**Version:** 1.0
**Used In:** Phase I Constitution
