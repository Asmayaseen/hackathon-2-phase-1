"""
MCP Server initialization and setup.

Task: T-302 - Initialize MCP Server
Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
Plan: specs-history/phase-3-chatbot/plan.md Phase 3 Step 3.2

This server provides MCP tools for the OpenAI Agents SDK to manage tasks.

Following Constitution principles:
- MCP-First Tool Design
- Service Layer Pattern (tools call service layer)
- User Authorization (every tool validates user_id)
"""

from mcp.server import Server
from mcp.server.stdio import stdio_server
from .config import MCP_SERVER_NAME, MCP_SERVER_VERSION, MCP_SERVER_DESCRIPTION
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize MCP Server
mcp_app = Server(MCP_SERVER_NAME)

# Server metadata
mcp_app.server_info = {
    "name": MCP_SERVER_NAME,
    "version": MCP_SERVER_VERSION,
    "description": MCP_SERVER_DESCRIPTION,
}


@mcp_app.on_startup
async def startup():
    """Initialize MCP server on startup."""
    logger.info(f"MCP Server '{MCP_SERVER_NAME}' v{MCP_SERVER_VERSION} starting...")
    logger.info("Registering tools...")


@mcp_app.on_shutdown
async def shutdown():
    """Cleanup on server shutdown."""
    logger.info(f"MCP Server '{MCP_SERVER_NAME}' shutting down...")


# Tools will be registered in tools.py
# They are imported and registered automatically when the module loads
