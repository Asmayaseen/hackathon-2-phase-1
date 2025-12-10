# Backend Guidelines - FastAPI

> **Phase:** II - Full-Stack Web Application
> **Component:** Backend API Server
> **Stack:** FastAPI + SQLModel + Neon PostgreSQL

---

## 🎯 Overview

This is the backend API server for the Evolution of Todo application. It provides RESTful endpoints for task management with user authentication via Better Auth JWT tokens.

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | FastAPI | Latest |
| ORM | SQLModel | Latest |
| Database | Neon Serverless PostgreSQL | Cloud |
| Authentication | Better Auth (JWT verification) | Latest |
| Validation | Pydantic | v2+ |
| CORS | FastAPI CORS Middleware | Built-in |

---

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI app entry point
├── models.py            # SQLModel database models
├── database.py          # Database connection & session
├── routes/              # API route handlers
│   ├── __init__.py
│   ├── tasks.py         # Task CRUD endpoints
│   └── health.py        # Health check endpoint
├── middleware/          # Middleware (Auth, CORS, etc.)
│   ├── __init__.py
│   └── auth.py          # JWT verification
├── schemas/             # Pydantic request/response schemas
│   ├── __init__.py
│   └── task.py          # Task schemas
├── config.py            # Configuration (env vars)
├── requirements.txt     # Python dependencies
├── .env.example         # Example environment variables
└── CLAUDE.md            # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app

# Server
PORT=8000
HOST=0.0.0.0
```

---

## 📊 Database Models

### User Model (Managed by Better Auth)

Better Auth manages the `users` table. Reference it via `user_id`.

### Task Model

```python
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="users.id")
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

---

## 🛣️ API Endpoints

### Base URL
- **Development:** `http://localhost:8000`
- **Production:** `https://your-api.com`

### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "phase": "II"
}
```

### Task Endpoints

All task endpoints require JWT authentication via `Authorization: Bearer <token>` header.

#### List Tasks

```
GET /api/{user_id}/tasks?status=all&sort=created
```

**Query Parameters:**
- `status`: `"all"` | `"pending"` | `"completed"` (default: `"all"`)
- `sort`: `"created"` | `"title"` | `"updated"` (default: `"created"`)

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user123",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2025-12-09T10:00:00Z",
      "updated_at": "2025-12-09T10:00:00Z"
    }
  ],
  "total": 1,
  "completed": 0,
  "pending": 1
}
```

#### Create Task

```
POST /api/{user_id}/tasks
```

**Request:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T10:00:00Z"
}
```

#### Get Task

```
GET /api/{user_id}/tasks/{task_id}
```

**Response:** Task object or `404 Not Found`

#### Update Task

```
PUT /api/{user_id}/tasks/{task_id}
```

**Request:**
```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples, bananas"
}
```

**Response:** Updated task object

#### Delete Task

```
DELETE /api/{user_id}/tasks/{task_id}
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

#### Toggle Completion

```
PATCH /api/{user_id}/tasks/{task_id}/complete
```

**Response:** Updated task object with toggled `completed` status

---

## 🔐 Authentication Flow

### JWT Verification

1. Frontend sends JWT token in `Authorization: Bearer <token>` header
2. Backend extracts token from header
3. Backend verifies token signature using `BETTER_AUTH_SECRET`
4. Backend decodes token to get `user_id`, `email`, etc.
5. Backend validates that URL `user_id` matches token `user_id`
6. If valid, proceed with request; otherwise return `401 Unauthorized`

### Middleware Implementation

```python
from fastapi import Header, HTTPException
import jwt

async def verify_jwt(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    token = authorization.replace("Bearer ", "")

    try:
        payload = jwt.decode(token, BETTER_AUTH_SECRET, algorithms=["HS256"])
        return payload  # Contains user_id, email, etc.
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Route Protection

```python
from fastapi import Depends

@app.get("/api/{user_id}/tasks")
async def list_tasks(
    user_id: str,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    # Fetch tasks for user
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return {"tasks": tasks}
```

---

## 🎨 API Conventions

### Request/Response Format

- **Content-Type:** `application/json`
- **Character Encoding:** UTF-8
- **Date Format:** ISO 8601 (`YYYY-MM-DDTHH:MM:SSZ`)

### Error Responses

All errors follow this format:

```json
{
  "detail": "Error message"
}
```

**Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - User doesn't own resource
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

### Validation

Use Pydantic models for request validation:

```python
from pydantic import BaseModel, Field

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = Field(None, max_length=1000)
```

---

## 🗄️ Database Operations

### Connection

```python
from sqlmodel import create_engine, Session

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=False)

def get_db():
    with Session(engine) as session:
        yield session
```

### CRUD Operations

```python
# Create
task = Task(user_id=user_id, title=title, description=description)
db.add(task)
db.commit()
db.refresh(task)

# Read
task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()

# Update
task.title = new_title
task.updated_at = datetime.utcnow()
db.commit()
db.refresh(task)

# Delete
db.delete(task)
db.commit()
```

---

## 🚀 Running the Server

### Development Mode

```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
# Run with multiple workers
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 🧪 Testing

### Manual Testing

Use `curl` or Postman:

```bash
# Health check
curl http://localhost:8000/health

# List tasks (requires JWT)
curl -H "Authorization: Bearer <token>" \
     http://localhost:8000/api/user123/tasks

# Create task
curl -X POST \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy groceries"}' \
     http://localhost:8000/api/user123/tasks
```

### Automated Tests

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

## 📦 Dependencies

```txt
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
sqlmodel>=0.0.22
psycopg2-binary>=2.9.10
python-jose[cryptography]>=3.3.0
pydantic>=2.10.0
python-dotenv>=1.0.1
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` instead
2. **Validate all inputs** - Use Pydantic models
3. **Sanitize user data** - Prevent SQL injection (SQLModel handles this)
4. **Use HTTPS in production** - No plain HTTP
5. **Implement rate limiting** - Prevent abuse (100 req/min/user)
6. **Log security events** - Auth failures, suspicious activity
7. **Keep dependencies updated** - Regular security patches

---

## 📝 Development Workflow

1. **Read Specification** - `@specs/api/rest-endpoints.md`
2. **Implement Route** - Follow patterns in existing routes
3. **Add Validation** - Use Pydantic schemas
4. **Test Endpoint** - Manual + automated tests
5. **Update Documentation** - Keep this file current
6. **Commit Changes** - With descriptive message

---

## 🐛 Common Issues

### Database Connection Fails

**Problem:** `OperationalError: could not connect to server`

**Solution:**
- Check `DATABASE_URL` in `.env`
- Verify Neon database is active
- Check network/firewall settings

### JWT Verification Fails

**Problem:** `401 Unauthorized` on all requests

**Solution:**
- Verify `BETTER_AUTH_SECRET` matches frontend
- Check token format: `Bearer <token>`
- Ensure token hasn't expired

### CORS Errors

**Problem:** Browser blocks requests

**Solution:**
- Add frontend URL to `ALLOWED_ORIGINS`
- Enable CORS middleware in `main.py`

---

## 📚 References

- **FastAPI Docs:** https://fastapi.tiangolo.com
- **SQLModel Docs:** https://sqlmodel.tiangolo.com
- **Neon Docs:** https://neon.tech/docs
- **Better Auth Docs:** https://www.better-auth.com/docs
- **Pydantic Docs:** https://docs.pydantic.dev

---

**Remember:**
- Always reference specs before implementation
- All endpoints require authentication except `/health`
- User isolation is critical - never show other users' data
- Keep code clean, typed, and documented
- Test thoroughly before deploying

🚀 **Build with FastAPI. Deploy with Confidence.**
