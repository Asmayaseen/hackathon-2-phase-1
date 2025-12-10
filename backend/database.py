"""Database connection and session management."""

from sqlmodel import create_engine, Session, SQLModel
from config import settings


# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == "development",
    pool_pre_ping=True,
)


def create_db_and_tables():
    """Create database tables."""
    SQLModel.metadata.create_all(engine)


def get_db():
    """Get database session dependency."""
    with Session(engine) as session:
        yield session
