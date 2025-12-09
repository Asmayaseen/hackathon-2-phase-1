# Slash Commands - Evolution of Todo

> **Custom commands for spec-driven development workflow**

---

## 📋 Available Commands

### `/sp.specify` - Create Specification
**Purpose:** Activate Spec-Writer agent to create detailed feature specification

**Usage:**
```
/sp.specify
```

**What it does:**
- Activates Spec-Writer agent
- Creates specification following template
- Validates completeness
- Saves to specs/ folder

**When to use:**
- Starting a new feature
- Need to document requirements
- Before implementation begins

---

### `/sp.task` - Execute Development Task
**Purpose:** Execute any development task with appropriate agent

**Usage:**
```
/sp.task
```

**What it does:**
- Analyzes task type
- Activates appropriate agent:
  - Spec-Writer for specifications
  - Python-Developer for implementation
  - Code-Reviewer for reviews
- Executes task following agent workflow

**When to use:**
- Any development task
- When you're not sure which agent to use
- General purpose command

---

### `/sp.plan` - Create Implementation Plan
**Purpose:** Create detailed step-by-step implementation plan

**Usage:**
```
/sp.plan
```

**What it does:**
- Breaks down work into phases
- Identifies dependencies
- Creates ordered steps
- Defines success criteria
- Risk assessment

**When to use:**
- Before implementing complex features
- Planning multiple features
- Need to understand scope

---

### `/sp.implement` - Implement Feature
**Purpose:** Activate Python-Developer agent to implement feature

**Usage:**
```
/sp.implement
```

**What it does:**
- Activates Python-Developer agent
- Reads specification
- Implements following spec exactly
- Tests implementation
- Verifies quality standards

**When to use:**
- Specification is ready
- Ready to write code
- Implementing a feature

---

### `/sp.review` - Review Code
**Purpose:** Activate Code-Reviewer agent to review implementation

**Usage:**
```
/sp.review
```

**What it does:**
- Activates Code-Reviewer agent
- Reviews against specification
- Checks code quality
- Validates architecture
- Creates review report

**When to use:**
- Feature implementation complete
- Need quality check
- Before marking feature done

---

## 🔄 Typical Workflow

```
1. /sp.specify          → Create specification
   ↓
2. Review & Approve     → User reviews spec
   ↓
3. /sp.implement        → Implement feature
   ↓
4. /sp.review          → Review implementation
   ↓
5. Fix issues (if any) → Revise code
   ↓
6. /sp.review          → Final review
   ↓
7. Feature Complete!   → Move to next feature
```

---

## 📚 Command Details

### Command Structure

All commands follow this pattern:
```
/sp.<action>

Where:
/sp = "Spec Kit Plus" prefix
<action> = specify, task, plan, implement, review
```

### Command Categories

**Planning Commands:**
- `/sp.specify` - Create specifications
- `/sp.plan` - Create implementation plans

**Execution Commands:**
- `/sp.task` - Execute any task
- `/sp.implement` - Implement features

**Quality Commands:**
- `/sp.review` - Review code quality

---

## 🎯 Usage Examples

### Example 1: New Feature
```bash
User: I need to add a search feature
Assistant: Let me help you with that.

# Use /sp.specify to create spec
/sp.specify

# Spec-Writer agent creates detailed spec
# User reviews and approves

# Use /sp.implement to build it
/sp.implement

# Python-Developer agent implements
# Tests and validates

# Use /sp.review to check quality
/sp.review

# Code-Reviewer agent reviews
# Reports quality status
```

### Example 2: Complex Feature
```bash
User: I need to add authentication system
Assistant: That's complex, let me plan it first.

# Use /sp.plan to break it down
/sp.plan

# Creates multi-phase plan
# User reviews plan

# Use /sp.specify for Phase 1
/sp.specify

# Then implement Phase 1
/sp.implement

# Review Phase 1
/sp.review

# Repeat for other phases
```

### Example 3: General Task
```bash
User: Can you improve the error messages?
Assistant: I'll help with that.

# Use /sp.task for general tasks
/sp.task

# Automatically picks Code-Reviewer
# Reviews current messages
# Suggests improvements
# Python-Developer implements changes
```

---

## 🎓 Best Practices

### Do's ✓
- Use `/sp.specify` before implementing
- Use `/sp.review` after implementing
- Use `/sp.plan` for complex features
- Follow the workflow order
- Read specs carefully

### Don'ts ✗
- Don't implement without spec
- Don't skip reviews
- Don't rush through steps
- Don't mix commands randomly

---

## 📊 Command Reference

| Command | Agent | Purpose | Output |
|---------|-------|---------|--------|
| `/sp.specify` | Spec-Writer | Create spec | Spec file |
| `/sp.task` | Auto-detect | Execute task | Task result |
| `/sp.plan` | Planner | Create plan | Plan document |
| `/sp.implement` | Python-Dev | Write code | Implementation |
| `/sp.review` | Code-Review | Check quality | Review report |

---

## 🔧 Configuration

Commands are stored in:
```
.claude/commands/
├── sp.specify.md
├── sp.task.md
├── sp.plan.md
├── sp.implement.md
├── sp.review.md
└── README.md (this file)
```

Each command file contains:
- Instructions for Claude
- Agent activation
- Workflow steps
- Quality standards
- Best practices

---

## 💡 Tips

1. **Start with Spec:** Always `/sp.specify` first
2. **Plan Big Features:** Use `/sp.plan` for complex work
3. **Review Always:** Always `/sp.review` after implementation
4. **Use /sp.task:** When unsure which command to use
5. **Follow Order:** Specify → Implement → Review

---

## 🎯 Success Metrics

When using commands properly:
- ✓ All features have specifications
- ✓ Implementation matches specs
- ✓ Code quality is high
- ✓ All code is reviewed
- ✓ No bugs slip through

---

## 📞 Help

For more information:
- **Agent Details:** See `.claude/agents/`
- **Skills Details:** See `.claude/skills/`
- **Constitution:** See `.spec-kit/constitution.md`
- **Workflow:** See `CLAUDE.md`

---

**Version:** 1.0
**Phase:** I - Foundation
**Status:** Active

**Happy Coding with Slash Commands! 🚀**
