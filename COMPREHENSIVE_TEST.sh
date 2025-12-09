#!/bin/bash

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║        COMPREHENSIVE PROJECT TEST                       ║"
echo "║        Evolution of Todo - Phase I                      ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

TEST_PASSED=0
TEST_FAILED=0

# Function to test file existence
test_file() {
    if [ -f "$1" ]; then
        echo "✓ $1"
        ((TEST_PASSED++))
        return 0
    else
        echo "✗ $1 - NOT FOUND"
        ((TEST_FAILED++))
        return 1
    fi
}

# Function to test directory
test_dir() {
    if [ -d "$1" ]; then
        echo "✓ $1/"
        ((TEST_PASSED++))
        return 0
    else
        echo "✗ $1/ - NOT FOUND"
        ((TEST_FAILED++))
        return 1
    fi
}

echo "═══════════════════════════════════════════════════════════"
echo "TEST 1: DIRECTORY STRUCTURE"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_dir ".claude"
test_dir ".claude/agents"
test_dir ".claude/skills"
test_dir ".claude/commands"
test_dir ".spec-kit"
test_dir "specs"
test_dir "src"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 2: CONFIGURATION FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file ".spec-kit/config.yaml"
test_file ".spec-kit/constitution.md"
test_file "pyproject.toml"
test_file ".gitignore"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 3: DOCUMENTATION FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file "CLAUDE.md"
test_file "README.md"
test_file "QUICKSTART.md"
test_file "HISTORY.md"
test_file "USAGE.md"
test_file "CODE_REVIEW.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 4: SUBAGENT FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file ".claude/agents/spec-writer.md"
test_file ".claude/agents/python-developer.md"
test_file ".claude/agents/code-reviewer.md"
test_file ".claude/README.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 5: SKILL FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file ".claude/skills/spec-validation.md"
test_file ".claude/skills/python-development.md"
test_file ".claude/skills/console-ui-design.md"
test_file ".claude/skills/code-review.md"
test_file ".claude/skills/data-modeling.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 6: COMMAND FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file ".claude/commands/sp.specify.md"
test_file ".claude/commands/sp.task.md"
test_file ".claude/commands/sp.plan.md"
test_file ".claude/commands/sp.implement.md"
test_file ".claude/commands/sp.review.md"
test_file ".claude/commands/README.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 7: SPECIFICATION FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file "specs/add-todo.md"
test_file "specs/view-todos.md"
test_file "specs/update-todo.md"
test_file "specs/delete-todo.md"
test_file "specs/mark-complete.md"
test_file "specs/SPEC_TEMPLATE.md"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "TEST 8: PYTHON SOURCE FILES"
echo "═══════════════════════════════════════════════════════════"
echo ""

test_file "src/__init__.py"
test_file "src/models.py"
test_file "src/todo_manager.py"
test_file "src/ui.py"
test_file "src/main.py"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Tests Passed: $TEST_PASSED"
echo "Tests Failed: $TEST_FAILED"
echo "Total Tests:  $((TEST_PASSED + TEST_FAILED))"
echo ""

if [ $TEST_FAILED -eq 0 ]; then
    echo "✓ ALL TESTS PASSED!"
    exit 0
else
    echo "✗ SOME TESTS FAILED!"
    exit 1
fi
