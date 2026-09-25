"""
writing_repository.py

Repository interface + SQLAlchemy implementation. This is the ONLY layer
that imports SQLAlchemy/the Writing model directly — services depend on
the WritingRepository protocol, never on this concrete class, so the
data layer can be swapped (different DB, a cache, a mock for tests)
without touching business logic.
"""

from typing import Protocol
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from db.writing import Writing


class WritingRepository(Protocol):
    """Interface the service layer depends on."""

    async def get_all(self) -> list[Writing]: ...
    async def get_by_id(self, project_id: UUID) -> Writing | None: ...


class SqlAlchemyWritingRepository:
    """Concrete implementation backed by Supabase Postgres via SQLAlchemy."""

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> list[Writing]:
        result = await self._session.execute(
            select(Writing).order_by(Writing.created_at.desc())
        )
        return list(result.scalars().all())

    async def get_by_id(self, post_id: UUID) -> Writing | None:
        result = await self._session.execute(
            select(Writing).where(Writing.id == post_id).options(selectinload(Writing.bodies))
        )
        return result.scalar_one_or_none()
