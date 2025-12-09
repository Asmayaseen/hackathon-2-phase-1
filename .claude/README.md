# Claude Code Configuration

> **Project:** Evolution of Todo - Phase I
> **Purpose:** AI-assisted spec-driven development

---

## 📁 Directory Structure

```
.claude/
├── agents/                    # Subagent definitions
│   ├── spec-writer.md        # Spec-Writer subagent
│   ├── python-developer.md   # Python-Developer subagent
│   └── code-reviewer.md      # Code-Reviewer subagent
├── skills/                    # Skill definitions
│   ├── spec-validation.md    # Validate specifications
│   ├── python-development.md # Python coding best practices
│   ├── console-ui-design.md  # Console UI design patterns
│   ├── code-review.md        # Code review methodology
│   └── data-modeling.md      # Data structure design
└── README.md                  # This file
```

---

## 🤖 Subagents

### 1. Spec-Writer Agent
**Purpose:** Create comprehensive feature specifications
**Skills:** spec-validation, requirement-analysis
**Scope:** specs/ directory

### 2. Python-Developer Agent
**Purpose:** Implement features based on specifications
**Skills:** python-development, console-ui-design, data-modeling
**Scope:** src/ directory

### 3. Code-Reviewer Agent
**Purpose:** Review code for quality and compliance
**Skills:** code-review, spec-compliance-check, quality-assurance
**Scope:** Review only (no implementation)

---

## 🛠️ Skills

### Core Skills
1. **spec-validation** - Validate specifications against template
2. **python-development** - Implement Python 3.13+ code
3. **console-ui-design** - Design console interfaces
4. **data-modeling** - Design data structures
5. **code-review** - Review code quality

---

## 🎯 Usage

### Activating Subagents

When working on a task, activate the appropriate subagent:

#### Creating a Specification
```
"Activating Spec-Writer agent to create the [Feature] specification..."
```

#### Implementing a Feature
```
"Activating Python-Developer agent to implement [Feature] based on specs/[file].md..."
```

#### Reviewing Code
```
"Activating Code-Reviewer agent to review the [Feature] implementation..."
```

### Using Skills

Skills are automatically used by subagents:
- **Spec-Writer** uses spec-validation
- **Python-Developer** uses python-development, console-ui-design, data-modeling
- **Code-Reviewer** uses code-review, spec-compliance-check

---

## 📋 Workflow

```
[User Request]
      ↓
[Spec-Writer Agent]
   • Uses spec-validation skill
   • Creates detailed specification
   • Gets user approval
      ↓
[Python-Developer Agent]
   • Uses python-development skill
   • Uses console-ui-design skill
   • Uses data-modeling skill
   • Implements feature
      ↓
[Code-Reviewer Agent]
   • Uses code-review skill
   • Reviews against specification
   • Validates quality
      ↓
[Feature Complete]
```

---

## 🎓 Constitutional Authority

All subagents and skills operate under the authority of:
- **Constitution:** `.spec-kit/constitution.md`
- **Configuration:** `.spec-kit/config.yaml`
- **Guidelines:** `CLAUDE.md`

---

## 📚 Documentation

For detailed information:
- **Subagent Details:** See individual files in `agents/`
- **Skill Details:** See individual files in `skills/`
- **Development Guide:** See `../CLAUDE.md`
- **Quick Start:** See `../QUICKSTART.md`

---

**Status:** Active for Phase I
**Version:** 1.0
**Last Updated:** December 9, 2025
