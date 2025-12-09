# Feature: Mark Complete/Incomplete

## Overview
Allow users to toggle the completion status of a todo item. A todo can be marked as complete or incomplete, enabling users to track their progress.

## User Story
**As a** user
**I want to** mark todos as complete or incomplete
**So that** I can track which tasks are done and which still need attention

## Acceptance Criteria
- [ ] User can specify which todo to toggle by ID
- [ ] System validates that the ID exists
- [ ] System toggles the completion status (complete ↔ incomplete)
- [ ] System shows current status before toggling
- [ ] System confirms the new status after toggling
- [ ] Other todo attributes remain unchanged (title, ID, timestamp)
- [ ] Status change is immediately reflected in the list

## Detailed Requirements

### Input
- **Todo ID** (integer, required)
  - Must be a valid existing todo ID
  - Must be a positive integer

### Processing
1. Prompt user for todo ID
2. Validate ID is a valid integer
3. Search for todo with that ID
4. If not found, display error and return
5. Display current todo with status
6. Toggle completion status:
   - If complete → set to incomplete
   - If incomplete → set to complete
7. Display success message with new status

### Output
- Success messages:
  - "✓ Todo marked as complete!"
  - "✓ Todo marked as incomplete!"
- Error messages:
  - "Error: Invalid ID format"
  - "Error: Todo with ID X not found"
- Show current status before toggling
- Return to main menu

## Edge Cases

### Case 1: Invalid ID (Non-Numeric)
**Input:** User enters "abc" as ID
**Handling:** Display "Error: Invalid ID format" and return to menu

### Case 2: Todo Not Found
**Input:** User enters valid number but todo doesn't exist (e.g., ID 999)
**Handling:** Display "Error: Todo with ID 999 not found" and return to menu

### Case 3: Toggle Multiple Times
**Input:** User marks the same todo complete, then incomplete, then complete again
**Handling:** Each toggle works correctly, reflecting the new status

### Case 4: First Todo to Complete
**Input:** Marking the first incomplete todo as complete
**Handling:** Mark as complete normally

### Case 5: Last Completed Todo
**Input:** Unmarking the last completed todo
**Handling:** Mark as incomplete normally

## User Interface

### Menu Option
```
5. Mark Complete/Incomplete
```

### Interaction Flow (Mark Complete)
```
Enter your choice (1-6): 5

Enter todo ID: 1
Current: [✗] Buy groceries

✓ Todo marked as complete!

[Return to main menu]
```

### Interaction Flow (Mark Incomplete)
```
Enter your choice (1-6): 5

Enter todo ID: 2
Current: [✓] Finish project

✓ Todo marked as incomplete!

[Return to main menu]
```

### Interaction Flow (Not Found)
```
Enter your choice (1-6): 5

Enter todo ID: 999
Error: Todo with ID 999 not found

[Return to main menu]
```

## Examples

### Example 1: Mark Incomplete as Complete
```
Before: ID 1 - "Buy groceries" [✗] (incomplete)
Input: ID=1
After: ID 1 - "Buy groceries" [✓] (complete)
Output: "✓ Todo marked as complete!"
```

### Example 2: Mark Complete as Incomplete
```
Before: ID 2 - "Finish project" [✓] (complete)
Input: ID=2
After: ID 2 - "Finish project" [✗] (incomplete)
Output: "✓ Todo marked as incomplete!"
```

### Example 3: Invalid ID
```
Input: ID=999
Output: "Error: Todo with ID 999 not found"
No status change
```

### Example 4: Multiple Toggles
```
Initial: ID 1 - [✗] incomplete
First toggle: [✓] complete → "✓ Todo marked as complete!"
Second toggle: [✗] incomplete → "✓ Todo marked as incomplete!"
Third toggle: [✓] complete → "✓ Todo marked as complete!"
```

## Toggle Logic

### Status Transition
```python
if todo.completed:
    todo.completed = False  # Mark as incomplete
    message = "✓ Todo marked as incomplete!"
else:
    todo.completed = True   # Mark as complete
    message = "✓ Todo marked as complete!"
```

### Visual Status Indicators
- **Complete:** `[✓]` - Checkmark in brackets
- **Incomplete:** `[✗]` - X in brackets

## Error Handling

### Possible Errors

1. **Invalid ID Format**
   - **Condition:** User enters non-numeric ID
   - **Message:** "Error: Invalid ID format"
   - **Action:** Do not toggle, return to menu

2. **Todo Not Found**
   - **Condition:** ID doesn't exist in the list
   - **Message:** "Error: Todo with ID X not found"
   - **Action:** Do not toggle, return to menu

3. **Input Error**
   - **Condition:** Unexpected input error (EOF)
   - **Message:** "Error: Invalid input"
   - **Action:** Return to menu gracefully

## Technical Implementation Notes

### Function Signature
```python
def toggle_todo_status(todo_id: int) -> bool:
    """Toggle the completion status of a todo.

    Args:
        todo_id: The ID of the todo to toggle

    Returns:
        True if toggled successfully, False otherwise
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

def get_status_display(completed: bool) -> str:
    """Get the display string for a completion status.

    Args:
        completed: The completion status

    Returns:
        Status indicator string ([✓] or [✗])
    """
```

### Validation Rules
- Validate ID is an integer before searching
- Toggle is a simple boolean flip
- Preserve all other todo attributes (title, ID, timestamp)
- Show appropriate message based on new status

### Data Preservation
- ✅ Title remains unchanged
- ✅ ID remains unchanged
- ✅ Creation timestamp remains unchanged
- ⚠️ Only `completed` field is modified

## Success Criteria

This feature is considered complete when:
- [x] User can toggle status by ID
- [x] Invalid IDs are rejected with clear error
- [x] Non-existent IDs show appropriate error
- [x] Status toggles correctly (complete ↔ incomplete)
- [x] Appropriate message shown for new status
- [x] Other attributes are preserved
- [x] Changes are immediately visible in list
- [x] Can toggle same todo multiple times
- [x] All edge cases handled
- [x] Code follows project standards
- [x] Function is properly documented

## Dependencies
- Requires: Todo data model with `completed` field
- Requires: In-memory storage with existing todos
- Requires: Find todo by ID functionality

## Future Enhancements (Not Phase I)
- Mark multiple todos complete at once
- Mark all complete/incomplete
- Completion timestamps (when it was completed)
- Completion history (number of times toggled)
- Undo toggle
- Bulk status operations
- Auto-complete based on criteria

---

**Status:** Specification Complete - Ready for Implementation
**Priority:** High (Core Feature)
**Phase:** I - Foundation
