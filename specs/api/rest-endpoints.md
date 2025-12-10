# REST API Endpoints Specification

> **Phase:** II - Full-Stack Web Application
> **Component:** Backend API Layer
> **Technology:** FastAPI RESTful API

---

## 📋 Overview

This specification defines all REST API endpoints for the Evolution of Todo application Phase II, including authentication requirements, request/response formats, and error handling.

---

## 🌐 Base Configuration

### Base URLs

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:8000` |
| Production | `https://your-api.railway.app` or `https://your-api.render.com` |

### Content Type

All requests and responses use `application/json` unless otherwise specified.

### Authentication

All endpoints (except `/health`) require JWT authentication:

```
Authorization: Bearer <jwt_token>
```

---

## 📊 API Endpoints

### 1. Health Check

**Purpose:** Verify API server is running and healthy.

```
GET /health
```

**Authentication:** None required

**Response (200 OK):**
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "phase": "II",
  "timestamp": "2025-12-09T10:00:00Z"
}
```

**Example:**
```bash
curl http://localhost:8000/health
```

---

### 2. List User Tasks

**Purpose:** Retrieve all tasks for authenticated user with optional filtering and sorting.

```
GET /api/{user_id}/tasks
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token

**Query Parameters:**
- `status` (string, optional) - Filter by status: `"all"` | `"pending"` | `"completed"` (default: `"all"`)
- `sort` (string, optional) - Sort order: `"created"` | `"updated"` | `"title"` (default: `"created"`)

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user_abc123",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2025-12-09T10:00:00Z",
      "updated_at": "2025-12-09T10:00:00Z"
    },
    {
      "id": 2,
      "user_id": "user_abc123",
      "title": "Call dentist",
      "description": null,
      "completed": true,
      "created_at": "2025-12-08T14:30:00Z",
      "updated_at": "2025-12-09T09:15:00Z"
    }
  ],
  "total": 2,
  "completed": 1,
  "pending": 1
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id
- `500 Internal Server Error` - Server error

**Example:**
```bash
curl -H "Authorization: Bearer eyJhbGc..." \
     http://localhost:8000/api/user_abc123/tasks?status=pending&sort=created
```

---

### 3. Create Task

**Purpose:** Create a new task for authenticated user.

```
POST /api/{user_id}/tasks
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Request Body Schema:**
- `title` (string, required) - Task title (1-200 characters)
- `description` (string, optional) - Task description (max 1000 characters)

**Response (201 Created):**
```json
{
  "id": 1,
  "user_id": "user_abc123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T10:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Invalid input (empty title, too long, etc.)
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id
- `422 Unprocessable Entity` - Validation error

**Validation Rules:**
- `title` must not be empty or whitespace only
- `title` must be between 1 and 200 characters
- `description` (if provided) must not exceed 1000 characters
- Leading/trailing whitespace is trimmed

**Example:**
```bash
curl -X POST \
     -H "Authorization: Bearer eyJhbGc..." \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}' \
     http://localhost:8000/api/user_abc123/tasks
```

---

### 4. Get Single Task

**Purpose:** Retrieve details of a specific task.

```
GET /api/{user_id}/tasks/{task_id}
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token
- `task_id` (integer, required) - Task ID

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": "user_abc123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T10:00:00Z"
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id OR task belongs to different user
- `404 Not Found` - Task not found

**Example:**
```bash
curl -H "Authorization: Bearer eyJhbGc..." \
     http://localhost:8000/api/user_abc123/tasks/1
```

---

### 5. Update Task

**Purpose:** Update task title and/or description.

```
PUT /api/{user_id}/tasks/{task_id}
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token
- `task_id` (integer, required) - Task ID

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples, bananas"
}
```

**Request Body Schema:**
- `title` (string, optional) - New task title (1-200 characters)
- `description` (string, optional) - New task description (max 1000 characters, null to remove)

**Note:** At least one field (`title` or `description`) must be provided.

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": "user_abc123",
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples, bananas",
  "completed": false,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T11:30:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - No fields provided or invalid input
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id OR task belongs to different user
- `404 Not Found` - Task not found
- `422 Unprocessable Entity` - Validation error

**Example:**
```bash
curl -X PUT \
     -H "Authorization: Bearer eyJhbGc..." \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy groceries and fruits"}' \
     http://localhost:8000/api/user_abc123/tasks/1
```

---

### 6. Delete Task

**Purpose:** Permanently delete a task.

```
DELETE /api/{user_id}/tasks/{task_id}
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token
- `task_id` (integer, required) - Task ID

**Request Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully",
  "task_id": 1
}
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id OR task belongs to different user
- `404 Not Found` - Task not found

**Example:**
```bash
curl -X DELETE \
     -H "Authorization: Bearer eyJhbGc..." \
     http://localhost:8000/api/user_abc123/tasks/1
```

---

### 7. Toggle Task Completion

**Purpose:** Toggle task completion status (completed ↔ pending).

```
PATCH /api/{user_id}/tasks/{task_id}/complete
```

**Authentication:** Required (JWT)

**Path Parameters:**
- `user_id` (string, required) - User ID from JWT token
- `task_id` (integer, required) - Task ID

**Request Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": "user_abc123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T12:00:00Z"
}
```

**Behavior:**
- If `completed = false`, sets to `true`
- If `completed = true`, sets to `false`
- Updates `updated_at` timestamp

**Error Responses:**
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - URL user_id doesn't match token user_id OR task belongs to different user
- `404 Not Found` - Task not found

**Example:**
```bash
curl -X PATCH \
     -H "Authorization: Bearer eyJhbGc..." \
     http://localhost:8000/api/user_abc123/tasks/1/complete
```

---

## 🔐 Authentication Flow

### JWT Token Format

JWT tokens are issued by Better Auth (frontend) and verified by FastAPI (backend).

**Token Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9hYmMxMjMiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3MDI5ODEyMDB9.signature
```

**Decoded Payload:**
```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "exp": 1702981200
}
```

### Authorization Process

1. **Client Request:** Frontend sends JWT in `Authorization: Bearer <token>` header
2. **Token Extraction:** Backend extracts token from header
3. **Token Verification:** Backend verifies token signature using `BETTER_AUTH_SECRET`
4. **Token Decoding:** Backend decodes token to extract payload
5. **User Validation:** Backend validates URL `user_id` matches token `user_id`
6. **Database Query:** Backend filters database query by `user_id`
7. **Response:** Backend returns user-scoped data

### Security Rules

✅ **Always Check:**
- JWT signature is valid
- JWT has not expired
- URL `user_id` matches token `user_id`
- Database queries filter by `user_id`

❌ **Never Allow:**
- Requests without JWT (except `/health`)
- Expired JWT tokens
- Mismatched `user_id` (URL vs token)
- Cross-user data access

---

## 📝 Request/Response Examples

### Successful Create Task

**Request:**
```http
POST /api/user_abc123/tasks HTTP/1.1
Host: localhost:8000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Finish project report",
  "description": "Include charts and analysis"
}
```

**Response:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 5,
  "user_id": "user_abc123",
  "title": "Finish project report",
  "description": "Include charts and analysis",
  "completed": false,
  "created_at": "2025-12-09T14:30:00Z",
  "updated_at": "2025-12-09T14:30:00Z"
}
```

### Failed Authorization

**Request:**
```http
GET /api/user_abc123/tasks HTTP/1.1
Host: localhost:8000
Authorization: Bearer invalid_token_here
```

**Response:**
```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "detail": "Invalid token"
}
```

### Cross-User Access Attempt

**Request:**
```http
GET /api/user_xyz789/tasks HTTP/1.1
Host: localhost:8000
Authorization: Bearer <token_for_user_abc123>
```

**Response:**
```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "detail": "Forbidden: User ID mismatch"
}
```

### Validation Error

**Request:**
```http
POST /api/user_abc123/tasks HTTP/1.1
Host: localhost:8000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "",
  "description": "This task has no title"
}
```

**Response:**
```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "detail": [
    {
      "loc": ["body", "title"],
      "msg": "ensure this value has at least 1 characters",
      "type": "value_error.any_str.min_length"
    }
  ]
}
```

---

## 📊 Response Status Codes

| Code | Name | Usage |
|------|------|-------|
| 200 | OK | Successful GET, PUT, PATCH, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid request format or parameters |
| 401 | Unauthorized | Missing, invalid, or expired JWT token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 422 | Unprocessable Entity | Validation error (Pydantic) |
| 500 | Internal Server Error | Server-side error |

---

## 🛡️ Error Response Format

All errors follow this consistent format:

```json
{
  "detail": "Error message here"
}
```

**For validation errors (422):**
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "Descriptive error message",
      "type": "error_type"
    }
  ]
}
```

---

## 🔄 CORS Configuration

### Allowed Origins

Backend must accept requests from:
- `http://localhost:3000` (development)
- `https://your-app.vercel.app` (production)

### Allowed Methods

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `OPTIONS`

### Allowed Headers

- `Authorization`
- `Content-Type`

### Exposed Headers

- `Content-Length`
- `Content-Type`

---

## 📏 Rate Limiting (Phase III)

For Phase II, rate limiting is **not required**. For Phase III:

- **Limit:** 100 requests per minute per user
- **Response (429 Too Many Requests):**
```json
{
  "detail": "Rate limit exceeded. Try again in 60 seconds.",
  "retry_after": 60
}
```

---

## 🧪 Testing Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# List tasks
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:8000/api/user123/tasks

# Create task
curl -X POST \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Test task"}' \
     http://localhost:8000/api/user123/tasks

# Update task
curl -X PUT \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated title"}' \
     http://localhost:8000/api/user123/tasks/1

# Delete task
curl -X DELETE \
     -H "Authorization: Bearer $TOKEN" \
     http://localhost:8000/api/user123/tasks/1

# Toggle completion
curl -X PATCH \
     -H "Authorization: Bearer $TOKEN" \
     http://localhost:8000/api/user123/tasks/1/complete
```

### Using Python Requests

```python
import requests

API_URL = "http://localhost:8000"
TOKEN = "your_jwt_token_here"
USER_ID = "user_abc123"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# List tasks
response = requests.get(f"{API_URL}/api/{USER_ID}/tasks", headers=headers)
print(response.json())

# Create task
data = {"title": "Buy groceries", "description": "Milk, eggs"}
response = requests.post(f"{API_URL}/api/{USER_ID}/tasks", json=data, headers=headers)
print(response.json())

# Toggle completion
response = requests.patch(f"{API_URL}/api/{USER_ID}/tasks/1/complete", headers=headers)
print(response.json())
```

---

## 📋 API Acceptance Criteria

**Functional Requirements:**
- [ ] All endpoints return correct status codes
- [ ] JWT authentication works on all protected endpoints
- [ ] User isolation enforced (users only see their own tasks)
- [ ] Input validation prevents invalid data
- [ ] Error messages are clear and helpful

**Security Requirements:**
- [ ] JWT signature verification implemented
- [ ] URL `user_id` matches token `user_id`
- [ ] SQL injection prevented (SQLModel ORM)
- [ ] CORS configured for frontend origins only
- [ ] Sensitive data not exposed in error messages

**Performance Requirements:**
- [ ] Response time < 200ms (p95)
- [ ] Database queries optimized with indexes
- [ ] No N+1 query problems

**Documentation Requirements:**
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Error codes explained
- [ ] cURL examples work correctly

---

## 🔗 Related Specifications

- **Database Schema:** `specs/database/schema.md`
- **Authentication Feature:** `specs/features/authentication.md`
- **Task CRUD Feature:** `specs/features/task-crud.md`
- **Backend Guidelines:** `backend/CLAUDE.md`

---

**API Specification Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Ready for Implementation
