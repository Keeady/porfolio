"""
services/project_service.py

Business logic layer. Depends on the ProjectRepository *protocol*,
not the SQLAlchemy implementation — knows nothing about SQL, sessions,
or Supabase specifically.
"""

from uuid import UUID

from models.project import Project
from repositories.project_repository import ProjectRepository


class ProjectService:
    def __init__(self, repository: ProjectRepository):
        self._repository = repository

    async def get_projects(self) -> list[Project]:
        return await self._repository.get_all()

    async def get_project(self, project_id: UUID) -> Project | None:
        return await self._repository.get_by_id(project_id)