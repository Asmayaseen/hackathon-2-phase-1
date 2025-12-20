"""
Business logic layer for reusable operations.

Task: T-201 - Create Service Layer Package
Spec: specs-history/phase-3-chatbot/spec.md §3.1.2
Plan: specs-history/phase-3-chatbot/plan.md Phase 2 Step 2.1

This module provides shared business logic that can be reused across:
- REST API endpoints (backend/routes/tasks.py)
- MCP tools (backend/mcp_server/tools.py)
- Any future interfaces

Following Constitution principle: Service Layer Pattern
"""

from .task_service import (
    create_task,
    list_tasks,
    get_task,
    update_task,
    delete_task,
    toggle_complete,
)

__all__ = [
    "create_task",
    "list_tasks",
    "get_task",
    "update_task",
    "delete_task",
    "toggle_complete",
]
