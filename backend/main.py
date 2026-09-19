from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from repositories.project_repository import SqlAlchemyProjectRepository
from services.projects.project_service import ProjectService
from db.session import get_db_session

app = FastAPI()

def get_project_service(
    session: AsyncSession = Depends(get_db_session),
) -> ProjectService:
    repository = SqlAlchemyProjectRepository(session)
    return ProjectService(repository)

@app.get("/")
def read_root():
    return {"message": "Hello World!"}

@app.get("/projects")
async def project_list(service: ProjectService = Depends(get_project_service)):
    results = await service.get_project_list()
    return results
