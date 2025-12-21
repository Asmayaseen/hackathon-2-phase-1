"""Conversation service - Business logic for chat/conversation operations."""

from sqlmodel import Session, select
from models import Conversation, Message
from datetime import datetime
from typing import List, Optional


class ConversationService:
    """Service class for conversation-related business logic."""

    @staticmethod
    def create_conversation(db: Session, user_id: str) -> Conversation:
        """Create a new conversation."""
        conversation = Conversation(
            user_id=user_id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation

    @staticmethod
    def get_conversation(db: Session, user_id: str, conversation_id: int) -> Optional[Conversation]:
        """Get a conversation by ID."""
        statement = select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id
        )
        return db.exec(statement).first()

    @staticmethod
    def get_or_create_conversation(db: Session, user_id: str, conversation_id: Optional[int] = None) -> Conversation:
        """Get existing conversation or create new one."""
        if conversation_id:
            conversation = ConversationService.get_conversation(db, user_id, conversation_id)
            if conversation:
                return conversation

        # Create new conversation
        return ConversationService.create_conversation(db, user_id)

    @staticmethod
    def add_message(
        db: Session,
        conversation_id: int,
        user_id: str,
        role: str,
        content: str,
    ) -> Message:
        """Add a message to a conversation."""
        message = Message(
            conversation_id=conversation_id,
            user_id=user_id,
            role=role,  # "user" or "assistant"
            content=content,
            created_at=datetime.utcnow(),
        )
        db.add(message)
        db.commit()
        db.refresh(message)

        # Update conversation's updated_at
        statement = select(Conversation).where(Conversation.id == conversation_id)
        conversation = db.exec(statement).first()
        if conversation:
            conversation.updated_at = datetime.utcnow()
            db.add(conversation)
            db.commit()

        return message

    @staticmethod
    def get_messages(
        db: Session,
        conversation_id: int,
        limit: int = 10
    ) -> List[Message]:
        """Get recent messages from a conversation."""
        statement = (
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.desc())
            .limit(limit)
        )
        messages = db.exec(statement).all()
        # Return in chronological order (oldest first)
        return list(reversed(messages))

    @staticmethod
    def list_conversations(db: Session, user_id: str, limit: int = 20) -> List[Conversation]:
        """List user's conversations."""
        statement = (
            select(Conversation)
            .where(Conversation.user_id == user_id)
            .order_by(Conversation.updated_at.desc())
            .limit(limit)
        )
        return list(db.exec(statement).all())

    @staticmethod
    def delete_conversation(db: Session, user_id: str, conversation_id: int) -> bool:
        """Delete a conversation and all its messages."""
        conversation = ConversationService.get_conversation(db, user_id, conversation_id)
        if not conversation:
            return False

        # Delete all messages first
        statement = select(Message).where(Message.conversation_id == conversation_id)
        messages = db.exec(statement).all()
        for message in messages:
            db.delete(message)

        # Delete conversation
        db.delete(conversation)
        db.commit()
        return True
