# Feature: Delete Todo

## Overview
Allow users to permanently remove a todo item from the list by specifying its ID. Includes confirmation to prevent accidental deletions.

## User Story
**As a** user
**I want to** delete todo items I no longer need
**So that** I can keep my list clean and relevant

## Acceptance Criteria
- [ ] User can specify which todo to delete by ID
- [ ] System validates that the ID exists
- [ ] System asks for confirmation before deleting
- [ ] User can cancel the deletion
- [ ] Todo is permanently removed from the list
- [ ] System confirms successful deletion
- [ ] Deleted todos cannot be recovered (in Phase I)

## Detailed Requirements

### Input
1. **Todo ID** (integer, required)
   - Must be a valid existing todo ID
   - Must be a positive integer

2. **Confirmation** (Y/N, required)
   - User must confirm deletion
   - Accept: Y, y, Yes, yes (case insensitive)
   - Reject: N, n, No, no (case insensitive)

### Processing
1. Prompt user for todo ID
2. Validate ID is a valid integer
3. Search for todo with that ID
4. If not found, display error and return
5. Display todo details
6. Ask for confirmation: "Are you sure you want to delete this todo? (Y/N)"
7. If confirmed (Y):
   - Remove todo from list
   - Display success message
8. If not confirmed (N):
   - Cancel deletion
   - Display cancellation message

### Output
- Success message: "✓ Todo deleted successfully!"
- Cancellation message: "Deletion cancelled"
- Error messages:
  - "Error: Invalid ID format"
  - "Error: Todo with ID X not found"
- Show todo details before confirmation
- Return to main menu

## Edge Cases

### Case 1: Invalid ID (Non-Numeric)
**Input:** User enters "abc" as ID
**Handling:** Display "Error: Invalid ID format" and return to menu

### Case 2: Todo Not Found
**Input:** User enters valid number but todo doesn't exist (e.g., ID 999)
**Handling:** Display "Error: Todo with ID 999 not found" and return to menu

### Case 3: User Cancels Deletion
**Input:** User enters valid ID but then types "N" for confirmation
**Handling:** Display "Deletion cancelled", todo remains in list

### Case 4: Invalid Confirmation Input
**Input:** User enters something other than Y/N for confirmation
**Handling:** Treat as "No" and cancel deletion

### Case 5: Last Todo
**Input:** Deleting the only todo in the list
**Handling:** Delete normally, list becomes empty

### Case 6: Delete Completed Todo
**Input:** Deleting a todo that is marked complete
**Handling:** Delete normally (no special handling)

## User Interface

### Menu Option
```
4. Delete Todo
```

### Interaction Flow (Confirmed)
```
Enter your choice (1-6): 4

Enter todo ID to delete: 1
Todo to delete: [✗] Buy groceries

Are you sure you want to delete this todo? (Y/N): Y
✓ Todo deleted successfully!

[Return to main menu]
```

### Interaction Flow (Cancelled)
```
Enter your choice (1-6): 4

Enter todo ID to delete: 1
Todo to delete: [✗] Buy groceries

Are you sure you want to delete this todo? (Y/N): N
Deletion cancelled

[Return to main menu]
```

### Interaction Flow (Not Found)
```
Enter your choice (1-6): 4

Enter todo ID to delete: 999
Error: Todo with ID 999 not found

[Return to main menu]
```

## Examples

### Example 1: Successful Deletion
```
Before: List has 3 todos (IDs: 1, 2, 3)
Input: ID=2, Confirmation=Y
After: List has 2 todos (IDs: 1, 3)
Output: "✓ Todo deleted successfully!"
```

### Example 2: Cancelled Deletion
```
Before: List has 3 todos (IDs: 1, 2, 3)
Input: ID=2, Confirmation=N
After: List still has 3 todos (IDs: 1, 2, 3)
Output: "Deletion cancelled"
```

### Example 3: Invalid ID
```
Input: ID=999
Output: "Error: Todo with ID 999 not found"
No deletion occurs
```

## Error Handling

### Possible Errors

1. **Invalid ID Format**
   - **Condition:** User enters non-numeric ID
   - **Message:** "Error: Invalid ID format"
   - **Action:** Do not delete, return to menu

2. **Todo Not Found**
   - **Condition:** ID doesn't exist in the list
   - **Message:** "Error: Todo with ID X not found"
   - **Action:** Do not delete, return to menu

3. **Input Error**
   - **Condition:** Unexpected input error (EOF)
   - **Message:** "Error: Invalid input"
   - **Action:** Return to menu gracefully

## Confirmation Logic

### Accepted Confirmations (Yes)
- "Y" (case insensitive)
- "y"
- "Yes" (case insensitive)
- "yes"
- "YES"

### Rejected Confirmations (No)
- "N" (case insensitive)
- "n"
- "No" (case insensitive)
- "no"
- "NO"
- Any other input (treated as No)

## Technical Implementation Notes

### Function Signature
```python
def delete_todo(todo_id: int) -> bool:
    """Delete a todo item after confirmation.

    Args:
        todo_id: The ID of the todo to delete

    Returns:
        True if deleted successfully, False otherwise
    """
```

### Helper Functions
```python
def confirm_deletion(todo: Todo) -> bool:
    """Ask user to confirm deletion.

    Args:
        todo: The todo to be deleted

    Returns:
        True if user confirms, False otherwise
    """

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
- Always show todo details before asking for confirmation
- Default to "No" for invalid confirmation inputs
- Actually remove from list only after confirmation

## Success Criteria

This feature is considered complete when:
- [x] User can delete todos by ID
- [x] Invalid IDs are rejected with clear error
- [x] Non-existent IDs show appropriate error
- [x] Confirmation is required before deletion
- [x] User can cancel deletion
- [x] Success message is displayed after deletion
- [x] Todo is completely removed from list
- [x] All edge cases handled
- [x] Code follows project standards
- [x] Function is properly documented

## Dependencies
- Requires: Todo data model
- Requires: In-memory storage with existing todos
- Requires: Find todo by ID functionality

## Future Enhancements (Not Phase I)
- Soft delete with recycle bin
- Undo deletion
- Bulk delete operations
- Delete by criteria (all completed, all older than X days)
- Confirmation preference (skip for repeated deletions)
- Deletion audit log

---

**Status:** Specification Complete - Ready for Implementation
**Priority:** High (Core Feature)
**Phase:** I - Foundation
