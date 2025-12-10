# FastAPI Development Skill

> **Category:** Backend Development
> **Technology:** FastAPI (Python 3.13+)
> **Phase:** II - Full-Stack Web Application

---

## 📋 Overview

This skill enables building production-ready RESTful APIs using FastAPI with proper routing, middleware, dependency injection, and error handling.

---

## 🎯 Core Capabilities

### 1. App Initialization
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Evolution of Todo API",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)
```

### 2. Route Handlers
```python
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["tasks"])

@router.get("", response_model=TaskListResponse)
async def list_tasks(
    user_id: str,
    status: str = "all",
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    """List all tasks for authenticated user."""
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return {"tasks": tasks, "total": len(tasks)}

@router.post("", status_code=201, response_model=TaskResponse)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    """Create a new task."""
    # Implementation
    pass
```

### 3. Dependency Injection
```python
from sqlmodel import Session, create_engine

engine = create_engine(DATABASE_URL)

def get_db():
    """Database session dependency."""
    with Session(engine) as session:
        yield session

async def verify_jwt(authorization: str = Header(None)) -> dict:
    """JWT verification dependency."""
    if not authorization:
        raise HTTPException(401, "Missing token")
    # Verify JWT
    return payload
```

### 4. Request Validation
```python
from pydantic import BaseModel, Field, validator

class TaskCreate(BaseModel):
    """Task creation request."""
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = Field(None, max_length=1000)

    @validator('title')
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty')
        return v.strip()
```

### 5. Error Handling
```python
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """HTTP exception handler."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
```

### 6. Middleware
```python
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add response time header."""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

---

## 📊 Best Practices

### ✅ DO

**Use dependency injection:**
```python
@router.get("/tasks")
async def list_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()
```

**Use proper status codes:**
```python
@router.post("/tasks", status_code=201)  # Created
@router.delete("/tasks/{id}", status_code=204)  # No Content
```

**Validate inputs with Pydantic:**
```python
class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
```

**Type hint everything:**
```python
async def create_task(task_data: TaskCreate) -> Task:
    pass
```

### ❌ DON'T

**Don't use global state:**
```python
# ❌ Bad
db_session = Session(engine)

@router.get("/tasks")
async def list_tasks():
    return db_session.query(Task).all()
```

**Don't return 200 for everything:**
```python
# ❌ Bad
@router.post("/tasks")  # Returns 200
async def create_task(task: TaskCreate):
    pass

# ✅ Good
@router.post("/tasks", status_code=201)  # Returns 201
async def create_task(task: TaskCreate):
    pass
```

---

## 🔐 Security Checklist

- [ ] JWT verification on protected endpoints
- [ ] Input validation with Pydantic
- [ ] CORS configured properly
- [ ] SQL injection prevented (use ORM)
- [ ] Rate limiting (Phase III)

---

## 🧪 Testing

```python
from fastapi.testclient import TestClient

client = TestClient(app)

def test_create_task():
    response = client.post(
        "/api/user123/tasks",
        json={"title": "Test task"},
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 201
    assert response.json()["title"] == "Test task"
```

---

**Skill Level:** Intermediate to Advanced
**Prerequisites:** Python, REST APIs, async/await
**Used by:** Backend-Developer agent
