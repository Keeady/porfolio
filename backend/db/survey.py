from datetime import datetime, timezone
import uuid

from sqlalchemy import JSON, String, Text, DateTime, Uuid, func, BigInteger
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class QuestionnaireSubmission(Base):
    __tablename__ = "questionnaire_submissions"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    questionnaire_id: Mapped[str] = mapped_column(String(64), index=True)
    # Timestamp reported by the browser vs. when the server actually received it.
    submitted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    received_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    # [{"question_id": ..., "selected": [...], "text": ...}, ...]
    answers: Mapped[list[dict]] = mapped_column(JSON)
