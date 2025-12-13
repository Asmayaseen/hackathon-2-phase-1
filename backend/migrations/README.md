# Database Migrations

This directory contains SQL migration scripts for the TaskFlow database.

## Running Migrations

### Option 1: Using psql (Recommended for Neon)

```bash
# Set your DATABASE_URL
export DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Run migration
psql $DATABASE_URL < migrations/001_add_priority_due_date.sql
```

### Option 2: Using Neon Web Console

1. Go to https://console.neon.tech
2. Select your project
3. Open SQL Editor
4. Copy and paste the migration SQL
5. Execute

### Option 3: Using Python Script

```bash
python -c "
import psycopg2
import os

conn = psycopg2.connect(os.getenv('DATABASE_URL'))
cur = conn.cursor()

with open('migrations/001_add_priority_due_date.sql', 'r') as f:
    cur.execute(f.read())

conn.commit()
cur.close()
conn.close()
print('Migration completed successfully')
"
```

## Migration History

| # | Name | Date | Description |
|---|------|------|-------------|
| 001 | add_priority_due_date | 2025-12-13 | Add priority and due_date columns to tasks table |

## Rollback

To rollback migration 001:

```sql
-- Remove indexes
DROP INDEX IF EXISTS idx_tasks_priority;
DROP INDEX IF EXISTS idx_tasks_due_date;

-- Remove columns
ALTER TABLE tasks DROP COLUMN IF EXISTS priority;
ALTER TABLE tasks DROP COLUMN IF EXISTS due_date;
```

## Verification

After running a migration, verify the changes:

```sql
-- Check table structure
\d tasks

-- Or use standard SQL
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;
```
