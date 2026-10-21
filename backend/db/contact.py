from datetime import datetime, timezone

from sqlalchemy import String, Text, DateTime, func, BigInteger
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"

    id: Mapped[BigInteger] = mapped_column(
        BigInteger,
        primary_key=True,
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
