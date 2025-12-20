# Spec-Driven Workflow Skill

> **Type:** Skill
> **Domain:** Development Methodology
> **Reusability:** Universal - Any software project

---

## Skill Overview

This skill encapsulates the complete Spec-Driven Development workflow used in the Evolution of Todo project. It ensures no code is written before specifications are complete and approved.

**Core Mantra:** Specification → Plan → Tasks → Implementation

---

## When to Use This Skill

Use this workflow when:
- Starting a new feature
- Making architectural changes
- Implementing complex functionality
- Working with AI coding assistants
- Collaborating in teams
- Building production systems

---

## Workflow Steps

### Step 1: Write Specification

**File:** `specs-history/{phase-name}/spec.md`

**Contents:**
1. Overview and objectives
2. User stories with acceptance criteria
3. Functional requirements
4. Non-functional requirements
5. Technical constraints
6. Integration points
7. Testing requirements
8. Success metrics

**Template:**
```markdown
# {Feature Name} Specification

## 1. Overview
[Brief description]

## 2. User Stories
**US-1:** As a {user}, I want to {action}, so that {benefit}

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2

## 3. Functional Requirements
[What the system must do]

## 4. Non-Functional Requirements
- Performance: [metrics]
- Security: [requirements]
- Scalability: [requirements]

## 5. Technical Constraints
- Technology stack
- Architecture patterns
- External dependencies

## 6. Success Criteria
- [ ] All features working
- [ ] Tests passing
- [ ] Documentation complete
```

**Validation:**
- All user stories have acceptance criteria
- Requirements are testable
- No ambiguity in specifications
- Stakeholders have reviewed

---

### Step 2: Create Implementation Plan

**File:** `specs-history/{phase-name}/plan.md`

**Contents:**
1. Prerequisites checklist
2. Phase breakdown
3. Detailed implementation steps
4. File modifications list
5. Validation methods
6. Risk mitigation
7. Success criteria

**Template:**
```markdown
# {Feature Name} Implementation Plan

## Overview
[How we'll build this]

## Prerequisites
- [ ] Spec complete and approved
- [ ] Dependencies identified

## Implementation Phases

### Phase 1: {Name}
**Goal:** {What this achieves}
**Complexity:** Simple/Medium/Complex
**Files:** {List of files}

#### Step 1.1: {Action}
**What:** {Description}
**Where:** {File path}
**How:** [Approach]
**Validation:** [How to verify]

## Quality Checklist
- [ ] Type hints added
- [ ] Docstrings written
- [ ] Error handling complete

## Risks & Mitigations
**Risk 1:** [Description]
- **Mitigation:** [How to handle]
```

**Validation:**
- All steps have clear validation
- Dependencies identified
- Files to modify listed
- Risks assessed

---

### Step 3: Break Into Tasks

**File:** `specs-history/{phase-name}/tasks.md`

**Contents:**
1. Task organization (by phase)
2. Individual task cards
3. Task dependencies
4. Acceptance criteria per task
5. Spec references

**Template:**
```markdown
# {Feature Name} Implementation Tasks

## Task Organization
Tasks numbered by phase: T-{phase}{number}

## PHASE 1: {Name}

### Task T-101: {Task Name}

**ID:** T-101
**Description:** {What to do}
**Preconditions:** {What must be done first}
**Artifacts:**
- `path/to/file.py` (create/update)

**Implementation:**
```python
# Code snippet or approach
```

**Validation:**
- [ ] Criterion 1
- [ ] Criterion 2

**Spec Reference:** spec.md §X.Y, plan.md Phase Z Step W
```

**Validation:**
- Each task has unique ID
- Preconditions listed
- Artifacts specified
- Validation criteria clear
- Links back to spec and plan

---

### Step 4: Implement via Claude Code

**Process:**
1. Read spec file
2. Read plan file
3. Read tasks file
4. Implement task T-101
5. Validate against acceptance criteria
6. Mark task complete
7. Move to next task

**Command Pattern:**
```
@specs-history/{phase-name}/spec.md
@specs-history/{phase-name}/plan.md
@specs-history/{phase-name}/tasks.md

Implement Task T-101: {Task Name}

Follow the implementation approach in the plan.
Validate against the acceptance criteria.
```

**Validation:**
- Implementation matches spec
- All acceptance criteria met
- Code follows plan approach
- No deviation from specification

---

## Best Practices

### Do's ✅

1. **Specification First**
   - Never write code before spec
   - Update spec if requirements change
   - Get stakeholder approval

2. **Clear Acceptance Criteria**
   - Testable criteria
   - Binary pass/fail
   - No ambiguity

3. **Small Tasks**
   - Each task < 4 hours
   - Clear start and end
   - Independent when possible

4. **Validation at Every Step**
   - Spec reviewed
   - Plan validated
   - Tasks checked
   - Implementation tested

5. **Link Everything**
   - Tasks → Plan → Spec
   - Code comments → Task IDs
   - Tests → Acceptance criteria

### Don'ts ❌

1. **Don't Skip Steps**
   - No code before spec
   - No tasks before plan
   - No implementation before tasks

2. **Don't Assume**
   - Clarify ambiguity
   - Document assumptions
   - Get confirmation

3. **Don't Deviate**
   - Follow the spec
   - Update spec if needed
   - Don't improvise

4. **Don't Rush**
   - Thorough specification saves time
   - Rushed specs = rework
   - Quality over speed

---

## Example: Full Workflow

### Scenario: Add Priority Field to Tasks

#### Step 1: Specification
```markdown
# Add Task Priority Feature

## User Story
**US-1:** As a user, I want to set task priority, so I can focus on important items

**Acceptance Criteria:**
- [ ] Tasks have priority field (low/medium/high)
- [ ] Default priority is medium
- [ ] Filter tasks by priority
- [ ] Sort tasks by priority
```

#### Step 2: Plan
```markdown
# Implementation Plan: Task Priority

## Phase 1: Database Schema
**Step 1.1:** Add priority column to tasks table
**Step 1.2:** Create migration script

## Phase 2: Backend API
**Step 2.1:** Update Task model
**Step 2.2:** Add priority parameter to endpoints
**Step 2.3:** Implement filtering logic

## Phase 3: Frontend UI
**Step 3.1:** Add priority dropdown to create form
**Step 3.2:** Display priority badges in task list
**Step 3.3:** Add priority filter controls
```

#### Step 3: Tasks
```markdown
# Task Breakdown

## Task T-101: Add Priority Column
**Preconditions:** None
**Artifacts:** `backend/models.py`, `backend/migrations/004_add_priority.py`
**Validation:** Column exists in database

## Task T-102: Update Task Model
**Preconditions:** T-101 complete
**Artifacts:** `backend/models.py`
**Validation:** Model has priority field with type hints

[...more tasks...]
```

#### Step 4: Implementation
```
@specs-history/priority-feature/tasks.md

Implement Task T-101: Add Priority Column
```

---

## Integration with Tools

### With Claude Code
- Reference spec files with `@`
- Task-by-task implementation
- Automatic validation

### With Git
```bash
git commit -m "T-101: Add priority column to tasks

Spec: specs-history/priority-feature/spec.md §3.1
Plan: specs-history/priority-feature/plan.md Phase 1 Step 1.1"
```

### With Issue Trackers
- One issue per task
- Link to spec file
- Acceptance criteria in description

---

## Benefits

1. **Clarity:** Everyone knows what to build
2. **Predictability:** Estimate based on tasks
3. **Quality:** Validate against spec
4. **Collaboration:** Shared source of truth
5. **Onboarding:** New devs read specs
6. **AI-Friendly:** Claude Code follows specs precisely

---

## Anti-Patterns to Avoid

### ❌ Vibe Coding
```
"I'll just add this feature real quick"
[30 minutes later: unclear requirements, bugs, technical debt]
```

### ❌ Spec Debt
```
"I'll write the spec after I code it"
[Result: Spec doesn't match implementation]
```

### ❌ Over-Engineering
```
"Let me add these extra features not in the spec"
[Result: Scope creep, delayed delivery]
```

### ❌ Under-Specifying
```
"The spec just says 'add authentication'"
[Result: Ambiguous, many interpretations]
```

---

## Metrics for Success

Track these to measure spec-driven effectiveness:

1. **Spec Coverage:** % of code with corresponding spec
2. **Rework Rate:** % of tasks needing re-implementation
3. **Scope Creep:** Features added not in spec
4. **Time Estimation Accuracy:** Planned vs actual time
5. **Bug Rate:** Bugs per 1000 lines of code

**Target:**
- Spec coverage: >95%
- Rework rate: <10%
- Scope creep: <5%
- Estimation accuracy: ±20%
- Bug rate: <5 per 1000 LOC

---

## Reusability Score: 100/100

**Why Universally Reusable:**
- Language agnostic
- Framework agnostic
- Domain agnostic
- Team size agnostic
- Project type agnostic

**Where to Use:**
- Web applications
- Mobile apps
- Backend services
- Data pipelines
- ML/AI projects
- Infrastructure as code
- Any software project

---

## Quick Reference Card

```
┌─────────────────────────────────────┐
│    SPEC-DRIVEN WORKFLOW (SDD)       │
├─────────────────────────────────────┤
│                                     │
│  1. SPECIFICATION                   │
│     ↓                               │
│     Write spec.md                   │
│     - User stories                  │
│     - Requirements                  │
│     - Acceptance criteria           │
│                                     │
│  2. PLAN                            │
│     ↓                               │
│     Write plan.md                   │
│     - Phases                        │
│     - Steps                         │
│     - Validation                    │
│                                     │
│  3. TASKS                           │
│     ↓                               │
│     Write tasks.md                  │
│     - Task breakdown                │
│     - Dependencies                  │
│     - Artifacts                     │
│                                     │
│  4. IMPLEMENT                       │
│     ↓                               │
│     Code via Claude Code            │
│     - Follow specs                  │
│     - Validate criteria             │
│     - Link to tasks                 │
│                                     │
│  NEVER CODE WITHOUT SPEC!           │
│                                     │
└─────────────────────────────────────┘
```

---

## License

MIT - Use in any project, open or proprietary

---

## Changelog

- v1.0.0: Initial spec-driven workflow skill
- Proven in: Evolution of Todo (Phases I-V)
- Used by: 1000+ hackathon participants

---

**Specification before implementation. Every single time.**
