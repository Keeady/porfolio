from typing import Protocol
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.bio import Bio


class BioRepository(Protocol):
    """Interface the service layer depends on."""

    async def get_all(self) -> list[Bio]: ...


class SqlAlchemyBioRepository:
    """Concrete implementation backed by Supabase Postgres via SQLAlchemy."""

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> list[Bio]:
        result = await self._session.execute(select(Bio))
        return list(result.scalars().all())
