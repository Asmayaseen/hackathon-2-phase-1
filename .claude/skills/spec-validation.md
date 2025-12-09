# Skill: Spec Validation

> **Category:** Documentation & Quality Assurance
> **Used By:** Spec-Writer Agent, Code-Reviewer Agent
> **Purpose:** Validate specifications against template and quality standards

---

## 📋 Skill Description

The spec-validation skill enables agents to systematically validate feature specifications to ensure they are complete, clear, and implementable before development begins.

## 🎯 Skill Objectives

1. Ensure all required sections are present
2. Verify completeness of information
3. Check clarity and readability
4. Validate testability of criteria
5. Confirm implementability

---

## ✅ Validation Checklist

### Structure Validation
- [ ] Uses SPEC_TEMPLATE.md structure
- [ ] All required sections present
- [ ] Sections in correct order
- [ ] Proper markdown formatting

### Content Validation
- [ ] Overview is clear and concise
- [ ] User story follows "As a/I want to/So that" format
- [ ] Acceptance criteria are specific and testable
- [ ] Edge cases are identified and documented
- [ ] Error handling is comprehensive
- [ ] Examples are provided and clear
- [ ] Technical notes are sufficient

### Quality Validation
- [ ] Language is clear and unambiguous
- [ ] Requirements are specific, not vague
- [ ] No missing critical information
- [ ] Specifications are implementable
- [ ] Examples match requirements

---

## 🔍 Validation Process

### Step 1: Structure Check
```markdown
Required Sections:
✓ Overview
✓ User Story
✓ Acceptance Criteria
✓ Detailed Requirements (Input/Processing/Output)
✓ Edge Cases
✓ User Interface
✓ Examples
✓ Error Handling
✓ Technical Implementation Notes
✓ Success Criteria
✓ Dependencies
```

### Step 2: Completeness Check
- Each section has substantial content
- No placeholder text remaining
- All TODOs resolved
- All examples complete

### Step 3: Clarity Check
- Requirements are unambiguous
- Examples illustrate points clearly
- Technical notes are understandable
- Error messages are defined

### Step 4: Testability Check
- Acceptance criteria can be verified
- Edge cases can be tested
- Success criteria are measurable
- Examples demonstrate usage

---

## 🚨 Common Issues to Detect

### Missing Information
- [ ] Edge cases not documented
- [ ] Error scenarios not defined
- [ ] Examples missing
- [ ] Technical details incomplete

### Vague Requirements
- [ ] "User-friendly interface" (too vague)
- [ ] "Good performance" (not measurable)
- [ ] "Handle appropriately" (not specific)

### Incomplete Specifications
- [ ] Acceptance criteria too broad
- [ ] Edge cases not handled
- [ ] Error messages not defined
- [ ] Output format not specified

---

## 💡 Usage Examples

### Valid Spec Example
```markdown
## Acceptance Criteria
- [ ] User can enter a todo title
- [ ] System assigns unique auto-incrementing ID
- [ ] Empty titles are rejected with "Error: Title cannot be empty"
- [ ] Success shows "✓ Todo added successfully!"
```

### Invalid Spec Example (Too Vague)
```markdown
## Acceptance Criteria
- [ ] User can add todos
- [ ] System handles errors
- [ ] Success is shown
```

---

## 🎓 Skill Mastery Levels

### Beginner
- Can check if all sections exist
- Can identify obvious missing information

### Intermediate
- Can assess content quality
- Can identify vague requirements
- Can suggest improvements

### Expert
- Can ensure complete implementability
- Can identify subtle issues
- Can validate consistency across specs

---

**Status:** Active
**Version:** 1.0
**Used In:** Phase I Constitution
