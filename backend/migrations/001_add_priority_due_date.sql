-- Migration: Add priority and due_date columns to tasks table
-- Date: 2025-12-13
-- Description: Add task priority levels and due date functionality

-- Add priority column with default 'medium' and CHECK constraint
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium'
CHECK (priority IN ('low', 'medium', 'high'));

-- Add due_date column (nullable)
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS due_date TIMESTAMP NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

-- Update existing tasks to have 'medium' priority (in case column already exists but is NULL)
UPDATE tasks SET priority = 'medium' WHERE priority IS NULL;

-- Verify migration
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'tasks'
AND column_name IN ('priority', 'due_date');
