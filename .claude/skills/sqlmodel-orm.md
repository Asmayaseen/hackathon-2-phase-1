# SQLModel ORM Skill

> **Category:** Database Operations
> **Technology:** SQLModel (SQLAlchemy + Pydantic)
> **Phase:** II - Full-Stack Web Application

---

## 📋 Overview

SQLModel combines SQLAlchemy's database operations with Pydantic's validation, providing type-safe ORM for PostgreSQL.

---

## 🎯 Core Capabilities

### 1. Define Models
```python
from sqlmodel import SQLModel, Field
from datetime import datetime

class Task(SQLModel, table=True):
    """Task database model."""
    __tablename__ = "tasks"

    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="users.id")
    title: str = Field(max_length=200)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### 2. Database Connection
```python
from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql://user:pass@host/db"
engine = create_engine(DATABASE_URL, echo=False)

def get_db():
    with Session(engine) as session:
        yield session
```

### 3. CRUD Operations
```python
from sqlmodel import Session, select

# Create
def create_task(db: Session, user_id: str, title: str) -> Task:
    task = Task(user_id=user_id, title=title)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

# Read
def get_user_tasks(db: Session, user_id: str) -> list[Task]:
    return db.exec(
        select(Task).where(Task.user_id == user_id)
    ).all()

# Update
def update_task(db: Session, task_id: int, title: str) -> Task:
    task = db.get(Task, task_id)
    task.title = title
    task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(task)
    return task

# Delete
def delete_task(db: Session, task_id: int) -> None:
    task = db.get(Task, task_id)
    db.delete(task)
    db.commit()
```

### 4. Filtering & Sorting
```python
from sqlmodel import select

# Filter by status
tasks = db.exec(
    select(Task)
    .where(Task.user_id == user_id)
    .where(Task.completed == False)
).all()

# Sort by created_at
tasks = db.exec(
    select(Task)
    .where(Task.user_id == user_id)
    .order_by(Task.created_at.desc())
).all()

# Paginate
tasks = db.exec(
    select(Task)
    .where(Task.user_id == user_id)
    .offset(0)
    .limit(10)
).all()
```

---

## 📊 Best Practices

### ✅ DO
- Always filter by user_id for data isolation
- Use indexes on frequently filtered columns
- Commit after mutations
- Refresh to get updated values

### ❌ DON'T
- Never use raw SQL strings (SQL injection risk)
- Don't query without user_id filter
- Don't forget to commit changes

---

**Used by:** Backend-Developer agent
