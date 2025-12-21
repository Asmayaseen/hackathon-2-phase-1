"""
Migration script to add tool_calls column to messages table
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("ERROR: DATABASE_URL not found in environment variables")
    exit(1)

engine = create_engine(DATABASE_URL)

print("Adding tool_calls column to messages table...")

with engine.connect() as conn:
    try:
        # Add tool_calls column
        conn.execute(text("""
            ALTER TABLE messages
            ADD COLUMN IF NOT EXISTS tool_calls TEXT
        """))
        conn.commit()
        print("✅ Successfully added tool_calls column to messages table")
    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()

print("Migration complete!")
