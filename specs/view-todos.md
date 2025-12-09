# Feature: View Todos

## Overview
Display all todo items in a clear, formatted list showing their ID, status, title, and creation timestamp. Provide a summary with total count and completion statistics.

## User Story
**As a** user
**I want to** view all my todo items in a formatted list
**So that** I can see what tasks I have and their current status

## Acceptance Criteria
- [ ] Display all todos in the list
- [ ] Show each todo's ID, status, title, and creation timestamp
- [ ] Use visual indicators for completion status (✓ for complete, ✗ for incomplete)
- [ ] Display todos in order (newest first or oldest first)
- [ ] Show summary statistics (total, completed, pending)
- [ ] Handle empty list gracefully with informative message
- [ ] Format timestamps in readable format
- [ ] Display is clear and easy to read

## Detailed Requirements

### Input
- None (menu selection only)

### Processing
1. Retrieve all todos from in-memory storage
2. Check if list is empty
3. If not empty:
   - Format each todo for display
   - Calculate statistics (total, completed, pending)
   - Display formatted list
4. If empty:
   - Display "No todos yet" message

### Output

#### Non-Empty List Format
```
=== Your Todos ===
1. [✓] Buy groceries (Created: 2025-01-10 14:30)
2. [✗] Finish project (Created: 2025-01-10 15:45)
3. [✓] Call mom (Created: 2025-01-10 16:00)

Total: 3 todos (2 completed, 1 pending)

[Return to main menu]
```

#### Empty List Format
```
=== Your Todos ===
No todos yet. Add your first todo!

[Return to main menu]
```

## Edge Cases

### Case 1: Empty List
**Condition:** No todos have been added yet
**Handling:** Display "No todos yet. Add your first todo!" message

### Case 2: All Completed
**Condition:** All todos are marked as complete
**Handling:** Display normally, summary shows "X todos (X completed, 0 pending)"

### Case 3: None Completed
**Condition:** All todos are incomplete
**Handling:** Display normally, summary shows "X todos (0 completed, X pending)"

### Case 4: Single Todo
**Condition:** Only one todo in the list
**Handling:** Display normally with singular form "1 todo"

### Case 5: Very Long Title
**Condition:** Todo title exceeds console width
**Handling:** Let it wrap naturally (no truncation in Phase I)

### Case 6: Many Todos
**Condition:** 50+ todos in the list
**Handling:** Display all (no pagination in Phase I, let it scroll)

## User Interface

### Menu Option
```
2. View Todos
```

### Interaction Flow
```
Enter your choice (1-6): 2

=== Your Todos ===
1. [✗] Buy groceries (Created: 2025-01-10 14:30)
2. [✗] Finish project (Created: 2025-01-10 15:45)

Total: 2 todos (0 completed, 2 pending)

[Press Enter to continue]
```

## Examples

### Example 1: Mixed Status
```
=== Your Todos ===
1. [✓] Buy groceries (Created: 2025-01-10 14:30)
2. [✗] Finish project (Created: 2025-01-10 15:45)
3. [✓] Call mom (Created: 2025-01-10 16:00)
4. [✗] Read book (Created: 2025-01-10 17:00)

Total: 4 todos (2 completed, 2 pending)
```

### Example 2: Empty List
```
=== Your Todos ===
No todos yet. Add your first todo!
```

### Example 3: All Complete
```
=== Your Todos ===
1. [✓] Buy groceries (Created: 2025-01-10 14:30)
2. [✓] Finish project (Created: 2025-01-10 15:45)

Total: 2 todos (2 completed, 0 pending)
```

## Display Format Specifications

### Status Indicators
- **Complete:** `[✓]` (checkmark in brackets)
- **Incomplete:** `[✗]` (X in brackets)

### Timestamp Format
- Format: `YYYY-MM-DD HH:MM`
- Example: `2025-01-10 14:30`
- Use 24-hour time format

### List Order
- Display in insertion order (first added = first displayed)
- Use the todo's ID for ordering (ascending)

### Summary Format
- Always show: `Total: X todos (Y completed, Z pending)`
- Use singular "todo" if total is 1
- Show both completed and pending counts

## Error Handling

### Possible Errors

1. **No Errors Expected**
   - This is a read-only operation
   - Should not fail under normal circumstances

2. **Graceful Handling**
   - If internal error occurs, display: "Error: Unable to display todos"
   - Return to menu

## Technical Implementation Notes

### Function Signature
```python
def view_todos() -> None:
    """Display all todos in formatted list."""
```

### Helper Functions
```python
def format_todo(todo: Todo) -> str:
    """Format a single todo for display.

    Args:
        todo: The todo item to format

    Returns:
        Formatted string representation
    """

def calculate_statistics(todos: list[Todo]) -> tuple[int, int, int]:
    """Calculate todo statistics.

    Args:
        todos: List of all todos

    Returns:
        Tuple of (total, completed, pending)
    """
```

### Timestamp Formatting
```python
# Use strftime for consistent formatting
timestamp_str = todo.created_at.strftime("%Y-%m-%d %H:%M")
```

## Success Criteria

This feature is considered complete when:
- [x] All todos are displayed correctly
- [x] Status indicators (✓/✗) are shown properly
- [x] Timestamps are formatted consistently
- [x] Summary statistics are accurate
- [x] Empty list shows helpful message
- [x] Display is clear and readable
- [x] All edge cases handled
- [x] Code follows project standards
- [x] Function is properly documented

## Dependencies
- Requires: Todo data model
- Requires: In-memory storage with todos

## Future Enhancements (Not Phase I)
- Pagination for large lists
- Sorting options (by date, status, title)
- Filtering options (show only complete/incomplete)
- Search functionality
- Color-coding for different priorities
- Display todo descriptions

---

**Status:** Specification Complete - Ready for Implementation
**Priority:** High (Core Feature)
**Phase:** I - Foundation
