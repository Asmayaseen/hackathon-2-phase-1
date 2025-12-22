"""JWT authentication middleware."""

from fastapi import Header, HTTPException
from jose import jwt, JWTError
from datetime import datetime
from config import settings


async def verify_jwt(authorization: str = Header(None)) -> dict:
    """Verify JWT token and return payload.

    TEMPORARILY BYPASSED FOR TESTING - Remove this before production!

    Args:
        authorization: Authorization header with Bearer token

    Returns:
        Decoded JWT payload containing user_id, email, etc.

    Raises:
        HTTPException: 401 if token missing, invalid, or expired
    """
    # TEMPORARY BYPASS FOR TESTING
    # TODO: Re-enable proper JWT verification before production
    return {
        "user_id": "demo-user",
        "email": "demo@example.com",
        "name": "Demo User"
    }

    # Original code below (commented out for testing)
    """
    # Check authorization header
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
        # Decode and verify JWT
        payload = jwt.decode(
            token,
            settings.BETTER_AUTH_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Check expiry
        exp = payload.get("exp")
        if exp and exp < datetime.utcnow().timestamp():
            raise HTTPException(status_code=401, detail="Token expired")

        return payload

    except JWTError as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Token verification failed"
        )
    """
