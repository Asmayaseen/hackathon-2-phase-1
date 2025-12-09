# /sp.task - Execute Development Task

Execute a development task using the appropriate subagent based on the task type.

## Instructions

Analyze the task and activate the appropriate agent:

### Task Type Detection:

**If task is about creating/updating specifications:**
→ Activate **Spec-Writer Agent**
- Use for: Writing specs, documenting features, requirement analysis
- Skills: spec-validation, requirement-analysis, user-story-writing

**If task is about implementing features:**
→ Activate **Python-Developer Agent**
- Use for: Writing code, implementing features, creating files
- Skills: python-development, console-ui-design, data-modeling

**If task is about reviewing code:**
→ Activate **Code-Reviewer Agent**
- Use for: Code review, quality check, spec compliance
- Skills: code-review, spec-compliance-check, quality-assurance

### Execution Process:

1. **Identify Task Type**
   - Read the task description
   - Determine which agent is appropriate
   - Check if spec exists (for implementation)

2. **Activate Agent**
   - Announce: "Activating [Agent Name] agent..."
   - Follow that agent's workflow
   - Use that agent's skills

3. **Execute Task**
   - Follow the agent's process
   - Maintain quality standards
   - Handle errors appropriately

4. **Report Completion**
   - Summarize what was done
   - Show results
   - Suggest next steps

### Agent Selection Guide:

```
Specification Tasks → Spec-Writer Agent
├── Create spec
├── Update spec
├── Document requirements
└── Define acceptance criteria

Implementation Tasks → Python-Developer Agent
├── Write Python code
├── Create new files
├── Implement features
├── Fix bugs
└── Refactor code

Review Tasks → Code-Reviewer Agent
├── Review code quality
├── Check spec compliance
├── Validate implementation
└── Assess architecture
```

### Quality Gates:
- ✓ Right agent for the task
- ✓ Follow agent's workflow
- ✓ Use agent's skills
- ✓ Maintain standards
- ✓ Complete documentation

**Ready to execute task!**

What task would you like me to perform?
