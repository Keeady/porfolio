"""
project_repository.py

Repository interface + SQLAlchemy implementation. This is the ONLY layer
that imports SQLAlchemy/the Project model directly — services depend on
the ProjectRepository protocol, never on this concrete class, so the
data layer can be swapped (different DB, a cache, a mock for tests)
without touching business logic.
"""

from typing import Protocol
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.project import Project


class ProjectRepository(Protocol):
    """Interface the service layer depends on."""

    async def get_all(self) -> list[Project]: ...
    async def get_by_id(self, project_id: UUID) -> Project | None: ...


class SqlAlchemyProjectRepository:
    """Concrete implementation backed by Supabase Postgres via SQLAlchemy."""

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> list[Project]:
        result = await self._session.execute(
            select(Project).order_by(Project.created_at.desc())
        )
        return list(result.scalars().all())

    async def get_by_id(self, project_id: UUID) -> Project | None:
        result = await self._session.execute(
            select(Project).where(Project.id == project_id)
        )
        return result.scalar_one_or_none()
