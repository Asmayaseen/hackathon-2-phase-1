"""
MCP Server Configuration.

Task: T-301 - Create MCP Server Package
Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
"""

import os

# MCP Server Configuration
MCP_SERVER_NAME = "todo-mcp-server"
MCP_SERVER_VERSION = "1.0.0"
MCP_SERVER_DESCRIPTION = "MCP tools for Todo task management"

# Database configuration (reuse from main app)
DATABASE_URL = os.getenv("DATABASE_URL")

# Logging configuration
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
