# AGENTS.md - AI Agent Instructions

> **Project:** Evolution of Todo - Phase III
> **Purpose:** Universal instructions for ALL AI agents (Claude, Copilot, Gemini, etc.)
> **Methodology:** Spec-Driven Development with Agentic Dev Stack

---

## Purpose

This project uses **Spec-Driven Development (SDD)** — a workflow where **no agent is allowed to write code until the specification is complete and approved**.

All AI agents (Claude Code, GitHub Copilot, Gemini, local LLMs, etc.) must follow the **Spec-Kit lifecycle:**

> **Constitution → Specify → Plan → Tasks → Implement**

This prevents "vibe coding," ensures alignment across agents, and guarantees that every implementation step maps back to an explicit requirement.

---

## How Agents Must Work

Every agent in this project MUST obey these rules:

1. **Never generate code without a referenced Task ID.**
2. **Never modify architecture without updating the plan.**
3. **Never propose features without updating specifications.**
4. **Never change approach without updating the constitution.**
5. **Every code file must contain a comment linking it to the Task and Spec sections.**

**If an agent cannot find the required spec, it must STOP and request it, not improvise.**

---

## Spec-Driven Workflow (Source of Truth)

### 1. Constitution (WHY — Principles & Constraints)

**File:** `CONSTITUTION-PHASE3.md`

Defines the project's non-negotiables:
- Architectural values (stateless, MCP-first, etc.)
- Security rules (user isolation, JWT verification)
- Tech stack constraints
- Performance expectations
- Patterns allowed/forbidden

**Agents must check this before proposing solutions.**

**Example:**
```markdown
@CONSTITUTION-PHASE3.md

What are the principles for chat endpoint architecture?
```

---

### 2. Specify (WHAT — Requirements, Journeys & Acceptance Criteria)

**File:** `specs-history/phase-3-chatbot/spec.md`

Contains:
- User journeys
- User stories with acceptance criteria
- Functional requirements
- Non-functional requirements
- Domain rules
- Business constraints
- Integration points

**Agents must not infer missing requirements** — they must request clarification or propose specification updates.

**Example:**
```markdown
@specs-history/phase-3-chatbot/spec.md

What are the acceptance criteria for US-1 (Natural Language Task Creation)?
```

---

### 3. Plan (HOW — Architecture, Components, Interfaces)

**File:** `specs-history/phase-3-chatbot/plan.md`

Includes:
- Phase breakdown (7 phases for Phase III)
- Detailed implementation steps
- Component breakdown
- File modifications list
- APIs & schema diagrams
- Service boundaries
- System responsibilities
- High-level sequencing
- Risk mitigation strategies

**All architectural output MUST be generated from the Specification file.**

**Example:**
```markdown
@specs-history/phase-3-chatbot/plan.md

What is the implementation approach for Phase 3: MCP Server?
```

---

### 4. Tasks (BREAKDOWN — Atomic, Testable Work Units)

**File:** `specs-history/phase-3-chatbot/tasks.md`

Each Task must contain:
- Task ID (e.g., T-101)
- Clear description
- Preconditions (what must be done first)
- Expected outputs
- Artifacts to create/modify
- Implementation approach
- Validation criteria
- Links back to Specify + Plan sections

**Agents implement ONLY what these tasks define.**

**Example:**
```markdown
@specs-history/phase-3-chatbot/tasks.md

Show me Task T-303: Implement add_task MCP Tool
```

---

### 5. Implement (CODE — Write Only What the Tasks Authorize)

Agents now write code, but must:
- Reference Task IDs in commit messages
- Follow the Plan exactly
- Not invent new features or flows
- Stop and request clarification if anything is underspecified
- Link code to tasks in comments

> **The golden rule: No task = No code.**

**Example:**
```python
# Task: T-303 - Implement add_task MCP Tool
# Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
# Plan: specs-history/phase-3-chatbot/plan.md Phase 3 Step 3.3

@tool
async def add_task(user_id: str, title: str, description: str = None) -> dict:
    """Create a new task for the user."""
    ...
```

---

## Agent Behavior in This Project

### When Generating Code:

Agents must reference:
```python
# [Task]: T-101
# [From]: spec.md §2.1, plan.md §3.4
```

### When Proposing Architecture:

Agents must reference:
```
Update required in plan.md → add component X
Reason: [architectural justification]
Aligns with constitution principle: [principle name]
```

### When Proposing New Behavior or Feature:

Agents must reference:
```
Requires update in spec.md (WHAT section)
New user story: US-X
Acceptance criteria: [list criteria]
```

### When Changing Principles:

Agents must reference:
```
Modify CONSTITUTION-PHASE3.md → Principle #X
Justification: [reason for change]
Impact: [affected components]
```

---

## Agent Failure Modes (What Agents MUST Avoid)

Agents are NOT allowed to:

- ❌ Freestyle code or architecture
- ❌ Generate missing requirements
- ❌ Create tasks on their own
- ❌ Alter stack choices without justification
- ❌ Add endpoints, fields, or flows that aren't in the spec
- ❌ Ignore acceptance criteria
- ❌ Produce "creative" implementations that violate the plan
- ❌ Skip security checks (user_id verification, JWT validation)
- ❌ Store state in memory (violates stateless principle)
- ❌ Modify Phase II code (evolutionary, not revolutionary)

**If a conflict arises between spec files, the hierarchy is:**

```
Constitution > Specify > Plan > Tasks
```

---

## Developer–Agent Alignment

Humans and agents collaborate, but the **spec is the single source of truth**.

Before every session, agents should re-read:

1. `CONSTITUTION-PHASE3.md` - Why we build this way
2. `specs-history/phase-3-chatbot/spec.md` - What to build
3. `specs-history/phase-3-chatbot/plan.md` - How to build it
4. `specs-history/phase-3-chatbot/tasks.md` - Specific work items

This ensures predictable, deterministic development.

---

## Reusable Intelligence Integration

This project includes **Subagents** and **Skills** for accelerated development:

### Subagents (`.claude/agents/`)

Specialized AI assistants for specific tasks:

1. **MCP Tool Builder** (`.claude/agents/mcp-tool-builder/AGENT.md`)
   - Builds MCP tools following best practices
   - Use when creating/updating MCP tools

2. **Chat Endpoint Builder** (`.claude/agents/chat-endpoint-builder/AGENT.md`)
   - Builds stateless chat endpoints with OpenAI Agents SDK
   - Use when creating chat API endpoints

**How to use:**
```markdown
@.claude/agents/mcp-tool-builder/AGENT.md

Create MCP tool: delete_task
Parameters: user_id, task_id
Service: task_service.delete_task
```

### Skills (`.claude/skills/`)

Reusable workflows and patterns:

1. **Spec-Driven Workflow** (`.claude/skills/spec-driven-workflow/SKILL.md`)
   - Enforces specification-before-implementation methodology
   - Use for all feature development

2. **Database Migration Builder** (`.claude/skills/database-migration-builder/SKILL.md`)
   - Creates safe, idempotent database migrations
   - Use when changing database schema

**How to use:**
```markdown
@.claude/skills/spec-driven-workflow/SKILL.md

I need to implement a new feature: task priorities
```

---

## Phase III Specific Guidelines

### Stateless Architecture (Non-Negotiable)

```python
# ✅ CORRECT - Stateless
@app.post("/api/{user_id}/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    # Load history from DB every time
    history = await load_conversation_history(request.conversation_id, db)
    # Process with fresh context
    response = await agent.run(history + [request.message])
    # Save to DB
    await save_messages(conversation_id, user_message, assistant_response, db)
    return response

# ❌ WRONG - Stateful (violates constitution)
conversation_cache = {}  # DON'T DO THIS!
```

### MCP-First Tool Design

```python
# ✅ CORRECT - MCP Tool
@tool
async def add_task(user_id: str, title: str, description: str = None):
    """AI agent calls this to create tasks"""
    return await task_service.create_task(user_id, title, description)

# ❌ WRONG - Direct database access from agent
async def handle_add_task(user_id, title):
    db.execute("INSERT INTO tasks...")  # DON'T DO THIS!
```

### Service Layer Pattern

```python
# ✅ CORRECT - Service Layer
# backend/services/task_service.py
async def create_task(user_id: str, title: str, description: str = None):
    """Shared business logic"""
    # Validation, database operations, etc.
    pass

# backend/routes/tasks.py (REST API)
from services.task_service import create_task

# backend/mcp_server/tools.py (MCP Tools)
from services.task_service import create_task  # REUSE!
```

### User Authorization (Every Request)

```python
# ✅ CORRECT - Verify user at every step
@tool
async def delete_task(user_id: str, task_id: int):
    task = await db.get_task(task_id)
    if task.user_id != user_id:
        return {"error": "Task not found"}  # Don't reveal existence
    await db.delete(task)

# ❌ WRONG - No authorization check
@tool
async def delete_task(task_id: int):
    await db.delete_task(task_id)  # Any user can delete any task!
```

---

## Quick Reference: Task Implementation Flow

```
1. Read Task from tasks.md
   ↓
2. Check Task preconditions met
   ↓
3. Read referenced spec sections
   ↓
4. Read referenced plan sections
   ↓
5. Read constitution principles
   ↓
6. Implement following the plan
   ↓
7. Add Task ID comment in code
   ↓
8. Validate against acceptance criteria
   ↓
9. Mark Task complete
```

---

## Environment Setup

### Required Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
OPENAI_API_KEY=sk-proj-...
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_OPENAI_DOMAIN_KEY=...
BETTER_AUTH_SECRET=...
DATABASE_URL=postgresql://...
```

---

## Testing Protocol

Before marking any task complete:

1. **Unit Test** - Test the component independently
2. **Integration Test** - Test with dependencies
3. **Acceptance Test** - Verify against criteria in spec
4. **Constitution Test** - Verify principles followed
5. **Regression Test** - Ensure Phase II still works

---

## Commit Message Format

```
T-{task-id}: {Short description}

Spec: specs-history/phase-3-chatbot/spec.md §X.Y
Plan: specs-history/phase-3-chatbot/plan.md Phase Z Step W
Constitution: CONSTITUTION-PHASE3.md §Principle

Implementation:
- {bullet point 1}
- {bullet point 2}

Validation:
- {acceptance criterion 1} ✓
- {acceptance criterion 2} ✓
```

**Example:**
```
T-303: Implement add_task MCP Tool

Spec: specs-history/phase-3-chatbot/spec.md §3.1.3
Plan: specs-history/phase-3-chatbot/plan.md Phase 3 Step 3.3
Constitution: CONSTITUTION-PHASE3.md MCP-First Tool Design

Implementation:
- Created add_task tool with @tool decorator
- Integrated with task_service.create_task
- Added user_id validation
- Comprehensive error handling

Validation:
- Tool creates tasks in database ✓
- Returns structured response ✓
- User authorization enforced ✓
```

---

## Emergency Protocols

### If Specification is Unclear

**DO NOT improvise.** Instead:

1. Stop implementation
2. Document the ambiguity
3. Ask for clarification
4. Update spec with answer
5. Resume implementation

### If Task is Blocked

1. Document the blocker
2. Check if preconditions were met
3. Create new task for resolution
4. Move to next unblocked task

### If Constitution Conflict

1. Constitution always wins
2. Update plan/tasks to align
3. Document the change
4. Proceed with aligned approach

---

## Success Metrics

Track these for quality assurance:

- **Spec Coverage:** % of code with corresponding spec (Target: >95%)
- **Task Completion:** % of tasks completed vs planned (Target: 100%)
- **Constitution Compliance:** % of principles followed (Target: 100%)
- **Rework Rate:** % of tasks needing re-implementation (Target: <10%)
- **Test Pass Rate:** % of tests passing (Target: 100%)

---

## Agent Checklist (Before Every Implementation)

- [ ] Read Constitution
- [ ] Read Specification
- [ ] Read Plan
- [ ] Identify Task ID
- [ ] Check Task preconditions
- [ ] Understand acceptance criteria
- [ ] Read relevant subagent/skill docs (if applicable)
- [ ] Implement following plan
- [ ] Add Task ID comments
- [ ] Validate against criteria
- [ ] Run tests
- [ ] Verify constitution compliance

---

## License

MIT - Agents may reuse this workflow in any project

---

## Changelog

- **v3.0.0** (Phase III): Added MCP-first, Stateless, Service Layer principles
- **v2.0.0** (Phase II): Added authentication, multi-user principles
- **v1.0.0** (Phase I): Initial spec-driven workflow

---

**Remember:**

> "Specification before implementation. Every single time. No exceptions."

> "If it's not in the spec, it doesn't exist. If it's not in a task, don't code it."

> "Constitution > Spec > Plan > Tasks > Code"

---

🚀 **Build with Intelligence. Code with Discipline. Deploy with Confidence.**
