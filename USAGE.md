# Usage Guide - Todo List Manager

> **Phase I Console Application**
> **Status:** Ready to Use! ✅

---

## 🚀 How to Run

### Method 1: Direct Python (Recommended for now)
```bash
# From project root
cd hackathon-2-phase-1
python3 src/main.py

# Or from src directory
cd src
python3 main.py
```

### Method 2: With UV (Once UV is installed)
```bash
# Install UV first
curl -LsSf https://astral.sh/uv/install.sh | sh

# Then run
cd hackathon-2-phase-1
uv run python src/main.py
```

---

## 📋 Features Guide

### 1. Add Todo
**Menu Option:** 1

**How to use:**
1. Select option 1
2. Enter todo title
3. Press Enter

**Example:**
```
Enter your choice (1-6): 1

--- Add Todo ---
Enter todo title: Buy groceries
✓ Todo added successfully!
```

**Tips:**
- Empty titles are rejected
- Whitespace is automatically trimmed
- Special characters are allowed

---

### 2. View Todos
**Menu Option:** 2

**How to use:**
1. Select option 2
2. View all todos with their status

**Example:**
```
Enter your choice (1-6): 2

=== Your Todos ===
1. [✗] Buy groceries (Created: 2025-12-09 16:30)
2. [✓] Finish project (Created: 2025-12-09 16:31)
3. [✗] Call mom (Created: 2025-12-09 16:32)

Total: 3 todos (1 completed, 2 pending)
```

**Status Indicators:**
- `[✓]` = Completed
- `[✗]` = Pending/Incomplete

---

### 3. Update Todo
**Menu Option:** 3

**How to use:**
1. Select option 3
2. Enter todo ID
3. Enter new title
4. Confirm

**Example:**
```
Enter your choice (1-6): 3

--- Update Todo ---
Enter todo ID to update: 1
Current todo: [✗] Buy groceries

Enter new title: Buy groceries and fruits
✓ Todo updated successfully!
```

**Tips:**
- Only title is updated
- Completion status preserved
- Creation timestamp preserved

---

### 4. Delete Todo
**Menu Option:** 4

**How to use:**
1. Select option 4
2. Enter todo ID
3. Confirm deletion (Y/N)

**Example:**
```
Enter your choice (1-6): 4

--- Delete Todo ---
Enter todo ID to delete: 2

Todo to delete: [✓] Finish project

Are you sure you want to delete this todo? (Y/N): Y
✓ Todo deleted successfully!
```

**Confirmation Options:**
- `Y`, `y`, `Yes`, `yes` = Confirm
- `N`, `n`, `No`, `no` or any other input = Cancel

**Tips:**
- Always requires confirmation
- Shows todo before deleting
- Can be cancelled anytime

---

### 5. Mark Complete/Incomplete
**Menu Option:** 5

**How to use:**
1. Select option 5
2. Enter todo ID
3. Status will toggle automatically

**Example:**
```
Enter your choice (1-6): 5

--- Mark Complete/Incomplete ---
Enter todo ID: 1

Current: [✗] Buy groceries
✓ Todo marked as complete!
```

**How it works:**
- Toggles between complete and incomplete
- Shows current status before changing
- Can toggle multiple times

---

### 6. Exit
**Menu Option:** 6

**How to use:**
1. Select option 6
2. Application closes gracefully

**Example:**
```
Enter your choice (1-6): 6

==============================
Thank you for using Todo Manager!
Goodbye! 👋
==============================
```

---

## 🎯 Common Workflows

### Quick Start Workflow
```
1. Run the application
2. Add a few todos (Option 1)
3. View your todos (Option 2)
4. Mark some complete (Option 5)
5. View updated list (Option 2)
```

### Task Management Workflow
```
Morning:
- Add todos for the day (Option 1)
- View your list (Option 2)

During Day:
- Mark tasks complete as you finish (Option 5)
- Update tasks if needed (Option 3)

Evening:
- View completed tasks (Option 2)
- Delete completed tasks (Option 4)
- Add tomorrow's tasks (Option 1)
```

---

## ⚠️ Error Messages

### Common Errors and Solutions

**Error:** `✗ Error: Title cannot be empty`
- **Cause:** You pressed Enter without typing a title
- **Solution:** Enter a non-empty title

**Error:** `✗ Error: Invalid ID format`
- **Cause:** You entered non-numeric characters for ID
- **Solution:** Enter only numbers (e.g., 1, 2, 3)

**Error:** `✗ Error: Todo with ID X not found`
- **Cause:** The ID doesn't exist
- **Solution:** View todos first (Option 2) to see valid IDs

**Error:** `✗ Invalid choice. Please enter a number between 1 and 6.`
- **Cause:** Menu choice outside 1-6 range
- **Solution:** Enter a number between 1 and 6

---

## 💡 Tips & Tricks

### Efficient Usage
1. **View First:** Always view todos (Option 2) before updating/deleting to see current IDs
2. **Clear Titles:** Use descriptive titles for better organization
3. **Mark Complete:** Mark tasks complete immediately after finishing
4. **Regular Cleanup:** Delete completed tasks regularly to keep list clean

### Keyboard Shortcuts
- **Ctrl+C:** Exit application immediately
- **Ctrl+D:** Cancel current operation (on some systems)
- **Enter:** Continue to next prompt

### Best Practices
1. Keep titles concise but descriptive
2. Use consistent naming for similar tasks
3. Mark tasks complete as you go
4. Review your list regularly (Option 2)
5. Delete old/irrelevant todos

---

## 🔧 Troubleshooting

### Application won't start
**Problem:** `python3: command not found`
**Solution:** Install Python 3.13+ or use `python` instead of `python3`

**Problem:** `ModuleNotFoundError`
**Solution:** Make sure you're running from correct directory:
```bash
cd hackathon-2-phase-1
python3 src/main.py
```

### Can't see todos
**Problem:** Added todos but list is empty
**Solution:** This shouldn't happen, but if it does:
1. Restart the application
2. Note: Phase I uses in-memory storage (todos lost on exit)

### Numbers don't work
**Problem:** Can't enter numbers for menu/ID
**Solution:** Make sure NumLock is on or try typing numbers from top row

---

## 📊 Understanding the Display

### Todo Format
```
1. [✗] Buy groceries (Created: 2025-12-09 16:30)
│  │   │               │
│  │   │               └─ Creation timestamp
│  │   └─ Todo title
│  └─ Status ([✓] complete, [✗] incomplete)
└─ Todo ID (use for update/delete/toggle)
```

### Statistics Format
```
Total: 3 todos (1 completed, 2 pending)
       │        │           │
       │        │           └─ Incomplete todos
       │        └─ Completed todos
       └─ Total number of todos
```

---

## 🎓 Example Session

Here's a complete example session:

```
$ python3 src/main.py

========================================
Welcome to Todo List Manager!
Evolution of Todo - Phase I
========================================

==============================
=== Todo List Manager ===
==============================
1. Add Todo
2. View Todos
3. Update Todo
4. Delete Todo
5. Mark Complete/Incomplete
6. Exit
==============================

Enter your choice (1-6): 1

--- Add Todo ---
Enter todo title: Buy groceries
✓ Todo added successfully!

Press Enter to continue...

[Menu appears again]

Enter your choice (1-6): 1

--- Add Todo ---
Enter todo title: Finish project
✓ Todo added successfully!

Press Enter to continue...

Enter your choice (1-6): 2

=== Your Todos ===
1. [✗] Buy groceries (Created: 2025-12-09 16:30)
2. [✗] Finish project (Created: 2025-12-09 16:30)

Total: 2 todos (0 completed, 2 pending)

Press Enter to continue...

Enter your choice (1-6): 5

--- Mark Complete/Incomplete ---
Enter todo ID: 1

Current: [✗] Buy groceries
✓ Todo marked as complete!

Press Enter to continue...

Enter your choice (1-6): 2

=== Your Todos ===
1. [✓] Buy groceries (Created: 2025-12-09 16:30)
2. [✗] Finish project (Created: 2025-12-09 16:30)

Total: 2 todos (1 completed, 1 pending)

Press Enter to continue...

Enter your choice (1-6): 6

==============================
Thank you for using Todo Manager!
Goodbye! 👋
==============================
```

---

## ⚡ Quick Reference

| Action | Option | Requires | Confirmation |
|--------|--------|----------|--------------|
| Add Todo | 1 | Title | No |
| View Todos | 2 | - | No |
| Update Todo | 3 | ID, New Title | No |
| Delete Todo | 4 | ID | Yes |
| Mark Complete | 5 | ID | No |
| Exit | 6 | - | No |

---

## 📝 Important Notes

### Phase I Limitations
⚠️ **In-Memory Storage:** Todos are NOT saved when you exit
- All todos are lost when application closes
- This is intentional for Phase I
- Phase II will add file persistence

### Data Not Saved
When you close the application:
- ❌ All todos are deleted
- ❌ No history is kept
- ❌ Cannot recover previous session

**Workaround:** Keep application running while working

---

## 🎯 What's Next?

### Phase II (Coming Soon)
- ✅ File persistence (JSON/CSV)
- ✅ Load todos on startup
- ✅ Save todos on exit
- ✅ Keep data between sessions

### Phase III (Future)
- ✅ SQLite database
- ✅ Advanced fields (priority, due date)
- ✅ Filtering and searching

### Phase IV (Future)
- ✅ Web API (FastAPI)
- ✅ Multiple interfaces
- ✅ API endpoints

---

## 🆘 Need Help?

1. **Read this guide** - Covers most common scenarios
2. **Check specifications** - See `specs/` folder
3. **Review examples** - See example session above
4. **Check CODE_REVIEW.md** - See implementation details

---

## 🎉 Enjoy Using Todo List Manager!

**Current Version:** Phase I (v0.1.0)
**Status:** Production Ready ✅
**Last Updated:** December 9, 2025

**Happy Task Managing! 📝✨**
