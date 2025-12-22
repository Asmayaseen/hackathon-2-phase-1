"""
Migration: Add tags column to tasks table
"""
import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("ERROR: DATABASE_URL not found in .env file")
    exit(1)

engine = create_engine(DATABASE_URL)

print("Adding tags column to tasks table...")

with engine.connect() as conn:
    try:
        # Add tags column as TEXT[] (PostgreSQL array)
        conn.execute(text("ALTER TABLE tasks ADD COLUMN IF NOT EXISTS tags TEXT[]"))
        conn.commit()
        print("✅ Successfully added tags column!")
    except Exception as e:
        print(f"❌ Error: {e}")
        conn.rollback()

print("Migration complete!")
