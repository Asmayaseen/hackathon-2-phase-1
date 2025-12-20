"""Application configuration."""

import os
from pydantic_settings import BaseSettings
from typing import List
from pydantic import field_validator


class Settings(BaseSettings):
    """Application settings."""

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://username:password@localhost/dbname"
    )

    # Authentication
    BETTER_AUTH_SECRET: str = os.getenv(
        "BETTER_AUTH_SECRET",
        "your-secret-key-here-min-32-characters"
    )
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRY: int = 604800  # 7 days in seconds

    # CORS - accepts comma-separated string or list
    ALLOWED_ORIGINS: str | List[str] = "http://localhost:3000,https://your-app.vercel.app"

    @field_validator('ALLOWED_ORIGINS', mode='before')
    @classmethod
    def parse_origins(cls, v):
        """Parse ALLOWED_ORIGINS from comma-separated string or list."""
        if isinstance(v, str):
            # Split by comma and strip whitespace
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        return v

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    # API
    API_PREFIX: str = "/api"
    API_VERSION: str = "v1"

    # Logging
    LOG_LEVEL: str = "INFO"

    # Phase III - AI Chatbot
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4")
    MCP_SERVER_NAME: str = os.getenv("MCP_SERVER_NAME", "todo-mcp-server")
    MCP_SERVER_VERSION: str = os.getenv("MCP_SERVER_VERSION", "1.0.0")
    MCP_SERVER_DESCRIPTION: str = os.getenv(
        "MCP_SERVER_DESCRIPTION",
        "MCP tools for Evolution of Todo task management"
    )

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
