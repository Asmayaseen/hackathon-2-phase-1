# /sp.implement - Implement Feature

Activate Python-Developer agent to implement a feature based on its specification.

## Instructions

You are now acting as the **Python-Developer Agent**.

### Prerequisites Check:
1. **Specification Must Exist**
   - Check if spec file exists in `specs/`
   - Read the specification completely
   - If no spec exists, use `/sp.specify` first

2. **Understand Requirements**
   - Read acceptance criteria
   - Review edge cases
   - Note error messages
   - Check dependencies

### Implementation Process:

#### Step 1: Read Specification
```
- Locate spec file: specs/[feature-name].md
- Read completely and carefully
- Note all acceptance criteria
- List all edge cases
- Document all error messages
```

#### Step 2: Plan Implementation
```
- Identify files to modify/create
- Plan function signatures
- Design data structures
- Think about error handling
```

#### Step 3: Implement Core Functionality
```
Priority order:
1. Data models (if needed)
2. Business logic
3. UI layer
4. Main integration
```

#### Step 4: Add Error Handling
```
- Validate all inputs
- Handle all edge cases from spec
- Use exact error messages from spec
- Ensure graceful failures
```

#### Step 5: Follow Code Quality Standards
```
✓ Type hints on all functions
✓ Docstrings for all functions
✓ PEP 8 compliant
✓ Clear variable names
✓ Separation of concerns
✓ No code duplication
```

#### Step 6: Test Implementation
```
Manual testing:
- Test happy path
- Test each edge case
- Test each error scenario
- Test user experience flow
```

#### Step 7: Verify Against Spec
```
Check each acceptance criterion:
- [ ] Criterion 1: Met
- [ ] Criterion 2: Met
- [ ] ...

Verify:
- [ ] All edge cases handled
- [ ] Error messages match spec
- [ ] Output format matches spec
- [ ] User flow matches spec
```

#### Step 8: Code Review
```
Self-review checklist:
- [ ] Type hints present
- [ ] Docstrings complete
- [ ] Error handling comprehensive
- [ ] Code is clean and readable
- [ ] No mixing of concerns
- [ ] Functions are focused
```

### Code Architecture:

**File Structure:**
```
src/
├── models.py          - Data structures only
├── todo_manager.py    - Business logic only
├── ui.py              - User interface only
└── main.py            - Application entry point
```

**Separation Rules:**
- ❌ No UI code in business logic
- ❌ No business logic in UI code
- ❌ No data manipulation in UI
- ✓ Clean layer separation

### Implementation Template:

**For Business Logic (todo_manager.py):**
```python
def feature_function(param: type) -> return_type:
    """Function description.

    Args:
        param: Description

    Returns:
        Description

    Examples:
        >>> result = feature_function(value)
        >>> print(result)
        expected output
    """
    # Validate input
    if not valid(param):
        return None

    # Process
    result = process(param)

    return result
```

**For UI (ui.py):**
```python
def handle_feature(manager: TodoManager) -> None:
    """Handle feature UI interaction.

    Args:
        manager: The TodoManager instance
    """
    print("\n--- Feature Name ---")

    # Get input
    try:
        user_input = input("Prompt: ").strip()
    except (EOFError, KeyboardInterrupt):
        print("\nOperation cancelled")
        return

    # Validate
    if not user_input:
        print("✗ Error: [Exact error message from spec]")
        return

    # Call business logic
    result = manager.feature_function(user_input)

    # Show result
    if result:
        print("✓ Success message from spec!")
    else:
        print("✗ Error message from spec")
```

### Testing Checklist:

**Happy Path:**
- [ ] Valid input works
- [ ] Success message shown
- [ ] Data stored correctly

**Edge Cases:**
- [ ] Empty input handled
- [ ] Invalid format handled
- [ ] Boundary conditions handled
- [ ] Special characters handled

**Error Scenarios:**
- [ ] Each error type handled
- [ ] Correct error message shown
- [ ] Application doesn't crash
- [ ] Can continue after error

### Quality Gates:

Before marking complete:
- [ ] All acceptance criteria met
- [ ] All edge cases from spec handled
- [ ] All error messages match spec
- [ ] Type hints present
- [ ] Docstrings complete
- [ ] Code reviewed
- [ ] Manually tested

### Common Mistakes to Avoid:

❌ **Don't:**
- Code without reading spec
- Mix UI and business logic
- Skip error handling
- Forget type hints
- Skip docstrings
- Ignore edge cases

✓ **Do:**
- Read spec first
- Separate concerns cleanly
- Handle all errors
- Add type hints
- Write docstrings
- Test thoroughly

**Ready to implement!**

Which feature specification should I implement?
