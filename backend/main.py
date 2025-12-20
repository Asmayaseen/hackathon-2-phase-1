"""FastAPI main application."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import create_db_and_tables
from routes import tasks

# Create FastAPI app
app = FastAPI(
    title="Evolution of Todo API",
    description="Phase II - Full-Stack Web Application Backend",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.on_event("startup")
def on_startup():
    """Initialize database on startup."""
    create_db_and_tables()


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "version": "2.0.0",
        "phase": "II",
    }


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Evolution of Todo API - Phase II",
        "docs": "/docs",
        "health": "/health",
    }


# Register routers
app.include_router(tasks.router)  # Phase II - REST API

# Phase III - Chat endpoint
try:
    from routes import chat
    app.include_router(chat.router)  # Phase III - Chat endpoint
except ImportError:
    pass  # Chat router not available yet
