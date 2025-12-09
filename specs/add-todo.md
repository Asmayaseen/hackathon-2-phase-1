# Feature: Add Todo

## Overview
Allow users to create new todo items by providing a title. The system will automatically assign an ID and timestamp to each todo item.

## User Story
**As a** user
**I want to** add new todo items to my list
**So that** I can keep track of tasks I need to complete

## Acceptance Criteria
- [ ] User can enter a title for the new todo
- [ ] System automatically assigns a unique ID (auto-increment)
- [ ] System automatically records creation timestamp
- [ ] New todo is marked as incomplete by default
- [ ] System confirms successful creation with a message
- [ ] Empty or whitespace-only titles are rejected
- [ ] Todo is immediately available in the list

## Detailed Requirements

### Input
- **Title** (string, required)
  - Minimum length: 1 character (excluding whitespace)
  - Maximum length: No limit (reasonable console input)
  - Must not be empty or contain only whitespace

### Processing
1. Validate that title is not empty after stripping whitespace
2. Generate unique ID (auto-increment from last ID)
3. Create timestamp (current date and time)
4. Create Todo object with:
   - `id`: Auto-generated integer
   - `title`: User-provided title (trimmed)
   - `completed`: False (default)
   - `created_at`: Current datetime
5. Add todo to the in-memory list
6. Return success confirmation

### Output
- Success message: "✓ Todo added successfully!"
- Error message (if invalid): "Error: Title cannot be empty"
- Return to main menu

## Edge Cases

### Case 1: Empty Title
**Input:** User presses Enter without typing anything
**Handling:** Display error message "Error: Title cannot be empty" and return to menu

### Case 2: Whitespace-Only Title
**Input:** User enters only spaces/tabs (e.g., "   ")
**Handling:** Display error message "Error: Title cannot be empty" and return to menu

### Case 3: Very Long Title
**Input:** User enters a very long title (e.g., 500+ characters)
**Handling:** Accept the input (no artificial limit), display normally

### Case 4: Special Characters
**Input:** User enters title with special characters (e.g., "Buy @groceries #important")
**Handling:** Accept all characters, store and display as-is

### Case 5: First Todo
**Input:** Adding the first todo to an empty list
**Handling:** Assign ID = 1, create normally

## User Interface

### Menu Option
```
1. Add Todo
```

### Interaction Flow
```
Enter your choice (1-6): 1

Enter todo title: Buy groceries
✓ Todo added successfully!

[Return to main menu]
```

### Error Flow
```
Enter your choice (1-6): 1

Enter todo title:
Error: Title cannot be empty

[Return to main menu]
```

## Examples

### Example 1: Valid Todo
```
Input: "Buy groceries"
Result: Todo created with ID 1
Output: "✓ Todo added successfully!"
```

### Example 2: Valid Todo with Special Characters
```
Input: "Review PR #123 @john"
Result: Todo created with ID 2
Output: "✓ Todo added successfully!"
```

### Example 3: Empty Title
```
Input: ""
Result: No todo created
Output: "Error: Title cannot be empty"
```

## Error Handling

### Possible Errors

1. **Empty Title Error**
   - **Condition:** Title is empty or contains only whitespace
   - **Message:** "Error: Title cannot be empty"
   - **Action:** Do not create todo, return to menu

2. **Input Error** (rare)
   - **Condition:** Unexpected input error (e.g., EOF)
   - **Message:** "Error: Invalid input"
   - **Action:** Return to menu gracefully

## Technical Implementation Notes

### Data Structure
```python
@dataclass
class Todo:
    id: int
    title: str
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)
```

### Function Signature
```python
def add_todo(title: str) -> dict[str, any] | None:
    """Add a new todo item.

    Args:
        title: The todo item title (will be trimmed)

    Returns:
        The created todo as a dictionary, or None if invalid
    """
```

### Validation Rules
- Strip whitespace from title before validation
- Check if resulting string is empty
- No other validation needed for Phase I

## Success Criteria

This feature is considered complete when:
- [x] User can add todos via console menu
- [x] IDs are auto-generated and unique
- [x] Timestamps are automatically recorded
- [x] Empty titles are rejected with clear error message
- [x] Success message is displayed after creation
- [x] New todos appear in the list immediately
- [x] All edge cases are handled correctly
- [x] Code follows project standards (type hints, PEP 8)
- [x] Function is properly documented

## Dependencies
- None (first feature to implement)

## Future Enhancements (Not Phase I)
- Add priority levels
- Add due dates
- Add categories/tags
- Add descriptions
- Validate title length limits

---

**Status:** Specification Complete - Ready for Implementation
**Priority:** High (Core Feature)
**Phase:** I - Foundation
