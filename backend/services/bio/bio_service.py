from uuid import UUID
from db.bio import Bio
from repositories.bio_repository import BioRepository


class BioService:
    def __init__(self, repository: BioRepository):
        self._repository = repository

    async def get_bio_list(self) -> list[Bio]:
        return await self._repository.get_all()
