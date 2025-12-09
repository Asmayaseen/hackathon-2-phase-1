# Feature: Update Todo

## Overview
Allow users to modify the title of an existing todo item by specifying its ID and providing a new title.

## User Story
**As a** user
**I want to** update the title of an existing todo
**So that** I can correct mistakes or refine task descriptions

## Acceptance Criteria
- [ ] User can specify which todo to update by ID
- [ ] User can enter a new title for the todo
- [ ] System validates that the ID exists
- [ ] System validates that the new title is not empty
- [ ] Original creation timestamp is preserved
- [ ] Completion status is preserved
- [ ] System confirms successful update
- [ ] Updated todo is immediately reflected in the list

## Detailed Requirements

### Input
1. **Todo ID** (integer, required)
   - Must be a valid existing todo ID
   - Must be a positive integer

2. **New Title** (string, required)
   - Minimum length: 1 character (excluding whitespace)
   - Must not be empty or contain only whitespace

### Processing
1. Prompt user for todo ID
2. Validate ID is a valid integer
3. Search for todo with that ID
4. If not found, display error and return
5. Display current todo details
6. Prompt user for new title
7. Validate new title is not empty
8. Update todo title (preserve ID, completion status, timestamp)
9. Display success message

### Output
- Success message: "✓ Todo updated successfully!"
- Error messages:
  - "Error: Invalid ID format"
  - "Error: Todo with ID X not found"
  - "Error: Title cannot be empty"
- Show current todo before updating
- Return to main menu

## Edge Cases

### Case 1: Invalid ID (Non-Numeric)
**Input:** User enters "abc" as ID
**Handling:** Display "Error: Invalid ID format" and return to menu

### Case 2: Todo Not Found
**Input:** User enters valid number but todo doesn't exist (e.g., ID 999)
**Handling:** Display "Error: Todo with ID 999 not found" and return to menu

### Case 3: Empty New Title
**Input:** User provides valid ID but empty title
**Handling:** Display "Error: Title cannot be empty", todo remains unchanged

### Case 4: Same Title
**Input:** User enters the same title as current
**Handling:** Accept and update (no special handling needed)

### Case 5: Update Completed Todo
**Input:** Updating a todo that is marked complete
**Handling:** Update title, keep completion status as complete

## User Interface

### Menu Option
```
3. Update Todo
```

### Interaction Flow (Success)
```
Enter your choice (1-6): 3

Enter todo ID to update: 1
Current todo: [✗] Buy groceries

Enter new title: Buy groceries and fruits
✓ Todo updated successfully!

[Return to main menu]
```

### Interaction Flow (Todo Not Found)
```
Enter your choice (1-6): 3

Enter todo ID to update: 999
Error: Todo with ID 999 not found

[Return to main menu]
```

### Interaction Flow (Invalid Input)
```
Enter your choice (1-6): 3

Enter todo ID to update: abc
Error: Invalid ID format

[Return to main menu]
```

## Examples

### Example 1: Valid Update
```
Before: ID 1 - "Buy groceries" (incomplete)
Input: ID=1, New Title="Buy groceries and fruits"
After: ID 1 - "Buy groceries and fruits" (incomplete)
Output: "✓ Todo updated successfully!"
```

### Example 2: Update Completed Todo
```
Before: ID 2 - "Finish project" (complete)
Input: ID=2, New Title="Finish project report"
After: ID 2 - "Finish project report" (complete)
Output: "✓ Todo updated successfully!"
```

### Example 3: Invalid ID
```
Input: ID=999
Output: "Error: Todo with ID 999 not found"
```

## Error Handling

### Possible Errors

1. **Invalid ID Format**
   - **Condition:** User enters non-numeric ID
   - **Message:** "Error: Invalid ID format"
   - **Action:** Do not update, return to menu

2. **Todo Not Found**
   - **Condition:** ID doesn't exist in the list
   - **Message:** "Error: Todo with ID X not found"
   - **Action:** Do not update, return to menu

3. **Empty Title**
   - **Condition:** New title is empty or whitespace only
   - **Message:** "Error: Title cannot be empty"
   - **Action:** Do not update, return to menu

4. **Input Error**
   - **Condition:** Unexpected input error (EOF)
   - **Message:** "Error: Invalid input"
   - **Action:** Return to menu gracefully

## Technical Implementation Notes

### Function Signature
```python
def update_todo(todo_id: int, new_title: str) -> bool:
    """Update a todo item's title.

    Args:
        todo_id: The ID of the todo to update
        new_title: The new title (will be trimmed)

    Returns:
        True if updated successfully, False otherwise
    """
```

### Helper Functions
```python
def find_todo_by_id(todo_id: int) -> Todo | None:
    """Find a todo by its ID.

    Args:
        todo_id: The ID to search for

    Returns:
        The todo if found, None otherwise
    """
```

### Validation Rules
- Validate ID is an integer before searching
- Strip whitespace from new title
- Check if resulting title is empty
- Preserve all other todo attributes (ID, timestamp, completed)

## Success Criteria

This feature is considered complete when:
- [x] User can update todos by ID
- [x] Invalid IDs are rejected with clear error
- [x] Non-existent IDs show appropriate error
- [x] Empty titles are rejected
- [x] Completion status is preserved
- [x] Timestamps are preserved
- [x] Success message is displayed
- [x] Changes are immediately visible
- [x] All edge cases handled
- [x] Code follows project standards
- [x] Function is properly documented

## Dependencies
- Requires: Todo data model
- Requires: In-memory storage with existing todos
- Requires: Find todo by ID functionality

## Future Enhancements (Not Phase I)
- Update other fields (due date, priority, description)
- Undo functionality
- Update history/audit trail
- Bulk update operations
- Confirm before updating

---

**Status:** Specification Complete - Ready for Implementation
**Priority:** High (Core Feature)
**Phase:** I - Foundation
