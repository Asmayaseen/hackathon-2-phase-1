# JWT Verification Skill

> **Category:** Security / Authentication
> **Technology:** JWT (JSON Web Tokens)
> **Phase:** II - Full-Stack Web Application

---

## 📋 Overview

Verify JWT tokens on backend to authenticate API requests and enforce authorization.

---

## 🎯 Core Capabilities

### 1. JWT Verification Middleware
```python
from fastapi import Header, HTTPException
import jwt
from datetime import datetime

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET")

async def verify_jwt(authorization: str = Header(None)) -> dict:
    """Verify JWT token and return payload.

    Args:
        authorization: Authorization header with Bearer token

    Returns:
        Decoded JWT payload containing user_id, email, etc.

    Raises:
        HTTPException: 401 if token missing, invalid, or expired
    """
    # Check header exists
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header missing"
        )

    # Check Bearer format
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization header format"
        )

    # Extract token
    token = authorization.replace("Bearer ", "")

    try:
        # Decode and verify
        payload = jwt.decode(
            token,
            BETTER_AUTH_SECRET,
            algorithms=["HS256"]
        )

        # Check expiry
        if payload.get('exp') < datetime.utcnow().timestamp():
            raise HTTPException(status_code=401, detail="Token expired")

        return payload

    except jwt.InvalidSignatureError:
        raise HTTPException(status_code=401, detail="Invalid token signature")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token format")
    except Exception:
        raise HTTPException(status_code=401, detail="Token verification failed")
```

### 2. Protect Endpoints
```python
from fastapi import Depends

@router.get("/api/{user_id}/tasks")
async def list_tasks(
    user_id: str,
    token_data: dict = Depends(verify_jwt),  # Verify JWT
    db: Session = Depends(get_db)
):
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    # Query user's tasks only
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return {"tasks": tasks}
```

### 3. Extract User Information
```python
@router.get("/api/{user_id}/profile")
async def get_profile(
    user_id: str,
    token_data: dict = Depends(verify_jwt)
):
    # Extract user info from token
    email = token_data.get("email")
    name = token_data.get("name")

    # Verify authorization
    if token_data.get("user_id") != user_id:
        raise HTTPException(403, "Forbidden")

    return {
        "user_id": user_id,
        "email": email,
        "name": name
    }
```

---

## 🔐 Security Checklist

### ✅ Always Do
- Verify JWT signature
- Check token expiry
- Validate user_id matches URL parameter
- Filter database queries by user_id
- Use HTTPS in production

### ❌ Never Do
- Trust client-provided user_id without JWT verification
- Skip user_id validation
- Return other users' data
- Log JWT tokens
- Commit BETTER_AUTH_SECRET to git

---

## 📊 JWT Token Structure

```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1702900000,
  "exp": 1703504800
}
```

**Verification Flow:**
1. Extract token from Authorization header
2. Verify signature using BETTER_AUTH_SECRET
3. Check expiry (exp field)
4. Extract user_id, email, etc.
5. Validate user_id matches request parameter
6. Proceed with authorized request

---

**Used by:** Backend-Developer agent
