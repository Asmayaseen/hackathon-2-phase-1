"""
MCP Server for AI-task interactions.

Task: T-301 - Create MCP Server Package
Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
Plan: specs-history/phase-3-chatbot/plan.md Phase 3 Step 3.1

This module provides Model Context Protocol (MCP) tools that allow
AI agents (OpenAI Agents SDK) to interact with task management operations.

Following Constitution principle: MCP-First Tool Design
"""

from .server import mcp_app
from .tools import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)

__all__ = [
    "mcp_app",
    "add_task",
    "list_tasks",
    "complete_task",
    "delete_task",
    "update_task",
]
