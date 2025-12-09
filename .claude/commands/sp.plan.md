# /sp.plan - Create Implementation Plan

Create a detailed implementation plan for a feature or set of features.

## Instructions

You are creating an implementation plan following Spec-Kit Plus methodology.

### Planning Process:

1. **Understand Requirements**
   - Read relevant specifications
   - Identify all features to implement
   - Check dependencies
   - Review current codebase state

2. **Break Down Work**
   - Divide into logical steps
   - Order by dependency
   - Identify parallel work opportunities
   - Estimate complexity (Simple/Medium/Complex)

3. **Create Implementation Plan**

   Format:
   ```markdown
   # Implementation Plan: [Feature/Project Name]

   ## Overview
   [Brief description of what will be implemented]

   ## Prerequisites
   - [ ] Specification complete and approved
   - [ ] Dependencies identified
   - [ ] Current codebase understood

   ## Implementation Steps

   ### Phase 1: [Name]
   **Goal:** [What this phase achieves]
   **Files:** [Which files will be modified/created]

   1. **Step 1:** [Action]
      - What: [Description]
      - Where: [File/location]
      - How: [Brief approach]
      - Validation: [How to verify]

   2. **Step 2:** [Action]
      [Same structure]

   ### Phase 2: [Name]
   [Same structure]

   ## Testing Strategy
   - [ ] Unit tests for [component]
   - [ ] Integration tests for [flow]
   - [ ] Manual testing scenarios

   ## Quality Checklist
   - [ ] Type hints added
   - [ ] Docstrings written
   - [ ] Error handling complete
   - [ ] Edge cases handled
   - [ ] Code reviewed

   ## Risks & Mitigations
   - **Risk 1:** [Description]
     - Mitigation: [How to handle]

   ## Success Criteria
   - [ ] All features working
   - [ ] Tests passing
   - [ ] Code reviewed and approved
   - [ ] Documentation updated
   ```

4. **Review Plan**
   - Check completeness
   - Verify ordering is logical
   - Ensure all dependencies covered
   - Validate against specifications

5. **Present Plan**
   - Show the complete plan
   - Explain key phases
   - Highlight risks
   - Get approval before starting

### Planning Principles:

**Incremental:**
- One feature at a time
- Small, verifiable steps
- Build on previous work

**Testable:**
- Each step has validation
- Clear success criteria
- Manual testing defined

**Clear:**
- Specific actions
- Named files/functions
- Understandable by anyone

**Realistic:**
- Account for complexity
- Consider dependencies
- Include review time

### Example Plan Structure:

```
Phase 1: Data Model
├── Create Todo class
├── Add validation
└── Test model

Phase 2: Business Logic
├── Create TodoManager
├── Implement CRUD operations
└── Test each operation

Phase 3: User Interface
├── Create menu system
├── Create handlers for each operation
└── Test user flows

Phase 4: Integration
├── Connect UI to logic
├── Add error handling
└── End-to-end testing
```

### For Spec-Kit Plus Projects:

Always include:
1. **Specification Review** - Ensure specs exist
2. **Implementation** - Write code
3. **Testing** - Validate functionality
4. **Code Review** - Check quality
5. **Documentation** - Update as needed

**Ready to create implementation plan!**

What feature or project should I plan?
