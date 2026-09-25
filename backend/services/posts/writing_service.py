"""
services/writing_service.py

Business logic layer. Depends on the WritingRepository *protocol*,
not the SQLAlchemy implementation — knows nothing about SQL, sessions,
or Supabase specifically.
"""

from uuid import UUID

from db.writing import Writing
from repositories.writing_repository import WritingRepository


class WritingService:
    def __init__(self, repository: WritingRepository):
        self._repository = repository

    async def get_writing_list(self) -> list[Writing]:
        return await self._repository.get_all()

    async def get_writing(self, post_id: UUID) -> Writing | None:
        return await self._repository.get_by_id(post_id)
