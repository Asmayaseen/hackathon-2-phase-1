# Skill: Code Review

> **Category:** Quality Assurance
> **Used By:** Code-Reviewer Agent
> **Purpose:** Systematically review code for quality, correctness, and compliance

---

## 📋 Skill Description

The code-review skill enables comprehensive evaluation of code against specifications, quality standards, and best practices.

## 🎯 Review Dimensions

### 1. Specification Compliance
- Does implementation match requirements?
- Are all acceptance criteria met?
- Are edge cases handled correctly?
- Do error messages match specification?

### 2. Code Quality
- Are type hints present and accurate?
- Are docstrings complete?
- Is code PEP 8 compliant?
- Is code readable and maintainable?

### 3. Architecture
- Is separation of concerns maintained?
- Are layers properly separated?
- Is function design appropriate?
- Is code well-organized?

### 4. Error Handling
- Are all inputs validated?
- Are exceptions handled appropriately?
- Are error messages clear?
- Does app handle failures gracefully?

---

## ✅ Review Checklist

```markdown
## Specification Compliance
- [ ] All acceptance criteria met
- [ ] Edge cases handled per spec
- [ ] Error messages match specification
- [ ] Output format matches specification
- [ ] User interface matches specification

## Type Hints
- [ ] All functions have type hints
- [ ] Parameter types specified
- [ ] Return types specified
- [ ] Types are accurate

## Docstrings
- [ ] All functions documented
- [ ] Args documented
- [ ] Returns documented
- [ ] Raises documented (if applicable)

## PEP 8 Compliance
- [ ] Passes ruff check
- [ ] Naming conventions followed
- [ ] Proper indentation
- [ ] Reasonable line length
- [ ] Proper spacing

## Architecture
- [ ] Separation of concerns maintained
- [ ] UI code only in ui.py
- [ ] Logic only in todo_manager.py
- [ ] Models only in models.py

## Error Handling
- [ ] All inputs validated
- [ ] Exceptions caught appropriately
- [ ] Error messages are clear
- [ ] App doesn't crash

## Code Quality
- [ ] Functions are focused
- [ ] Variable names are clear
- [ ] No code duplication
- [ ] Logical organization
```

---

**Status:** Active
**Version:** 1.0
**Used In:** Phase I Constitution
