import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

class ContactInquiry(DeclarativeBase):
    __tablename__ = "contact_inquiries"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False)
    type: Mapped[str] = mapped_column(String(20), nullable=False)

    project_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )
    budget: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    message: Mapped[str] = mapped_column(Text, nullable=False)

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="new",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
