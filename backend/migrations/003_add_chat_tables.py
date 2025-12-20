"""
Migration: Add chat tables for Phase III
Created: December 2025
Author: Evolution of Todo Project

This migration adds Conversation and Message tables to support
the AI chatbot feature in Phase III.
"""

from sqlmodel import SQLModel, create_engine, text
from models import Conversation, Message
import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def upgrade():
    """
    Apply migration: Add conversations and messages tables

    Steps:
    1. Check if conversations table exists
    2. Check if messages table exists
    3. Create both tables if they don't exist
    4. Create necessary indexes
    """
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL environment variable not set")
        sys.exit(1)

    engine = create_engine(DATABASE_URL, echo=False)

    # Check if tables already exist
    with engine.connect() as conn:
        # Check conversations table
        result_conv = conn.execute(text(
            "SELECT EXISTS (SELECT 1 FROM information_schema.tables "
            "WHERE table_name = 'conversations')"
        ))
        conversations_exists = result_conv.scalar()

        # Check messages table
        result_msg = conn.execute(text(
            "SELECT EXISTS (SELECT 1 FROM information_schema.tables "
            "WHERE table_name = 'messages')"
        ))
        messages_exists = result_msg.scalar()

        if conversations_exists and messages_exists:
            print("✓ Migration already applied: conversations and messages tables exist")
            return

    # Create tables using raw SQL to avoid foreign key issues
    print("Creating chat tables...")

    with engine.connect() as conn:
        # Create conversations table
        conn.execute(text("""
            CREATE TABLE conversations (
                id SERIAL PRIMARY KEY,
                user_id TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        """))
        conn.execute(text("CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id)"))

        # Create messages table
        conn.execute(text("""
            CREATE TABLE messages (
                id SERIAL PRIMARY KEY,
                conversation_id INTEGER NOT NULL REFERENCES conversations(id),
                user_id TEXT NOT NULL,
                role VARCHAR(20) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        """))
        conn.execute(text("CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id)"))
        conn.execute(text("CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id)"))

        conn.commit()

    # Verify creation
    with engine.connect() as conn:
        result = conn.execute(text(
            "SELECT table_name FROM information_schema.tables "
            "WHERE table_name IN ('conversations', 'messages') "
            "ORDER BY table_name"
        ))
        created_tables = [row[0] for row in result]

    print(f"✓ Migration applied successfully!")
    print(f"  Created tables: {', '.join(created_tables)}")

    # Show indexes
    with engine.connect() as conn:
        result = conn.execute(text(
            "SELECT indexname FROM pg_indexes "
            "WHERE tablename IN ('conversations', 'messages') "
            "ORDER BY indexname"
        ))
        indexes = [row[0] for row in result]

    print(f"  Created indexes: {len(indexes)} indexes")
    for idx in indexes:
        print(f"    - {idx}")


def downgrade():
    """
    Rollback migration: Remove conversations and messages tables

    Steps:
    1. Drop messages table (first, due to foreign key)
    2. Drop conversations table
    3. Verify deletion
    """
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL environment variable not set")
        sys.exit(1)

    engine = create_engine(DATABASE_URL, echo=False)

    print("Rolling back chat tables migration...")

    # Drop tables in reverse order (messages first due to FK)
    Message.__table__.drop(engine, checkfirst=True)
    print("  ✓ Dropped messages table")

    Conversation.__table__.drop(engine, checkfirst=True)
    print("  ✓ Dropped conversations table")

    print("✓ Migration rolled back successfully!")


if __name__ == "__main__":
    """
    Run migration from command line.

    Usage:
        python backend/migrations/003_add_chat_tables.py          # Apply migration
        python backend/migrations/003_add_chat_tables.py downgrade # Rollback migration
    """
    if len(sys.argv) > 1 and sys.argv[1] == "downgrade":
        print("\n=== Rolling Back Migration ===\n")
        downgrade()
    else:
        print("\n=== Applying Migration ===\n")
        upgrade()

    print("")
