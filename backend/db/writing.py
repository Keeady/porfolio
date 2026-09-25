"""
db/writing.py

SQLAlchemy ORM model — mirrors the "writings" table in Supabase.
Only the data access layer (repositories) should import this model;
services and routes work with plain data (dicts/Pydantic schemas) instead,
so the ORM stays swappable.
"""

import uuid
from datetime import datetime

from sqlalchemy import ARRAY, DateTime, String, Text, Integer, ForeignKey, BigInteger
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class WritingBody(Base):
    __tablename__ = "bodies"

    id: Mapped[BigInteger] = mapped_column(
        BigInteger, primary_key=True
    )
    header: Mapped[str] = mapped_column(String(200), nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    url: Mapped[str] = mapped_column(String(500), nullable=True)
    content_type: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )
    writing_id: Mapped[BigInteger] = mapped_column(BigInteger, ForeignKey("writings.id"), nullable=False)

    writing: Mapped["Writing"] = relationship("Writing", back_populates="bodies")

class Writing(Base):
    __tablename__ = "writings"

    id: Mapped[BigInteger] = mapped_column(
        BigInteger, primary_key=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    tags: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=datetime.utcnow
    )
    bodies: Mapped[list["WritingBody"]] = relationship(
        back_populates="writing",
        order_by="WritingBody.created_at",
        lazy="raise",
    )

