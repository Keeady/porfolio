import json
import os

from fastapi import FastAPI, Depends, Response
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.ext.asyncio import AsyncSession
from repositories.project_repository import SqlAlchemyProjectRepository
from services.projects.project_service import ProjectService
from db.session import get_db_session
from services.bio.bio_service import BioService
from repositories.bio_repository import SqlAlchemyBioRepository
from fastapi.responses import StreamingResponse
from services.ai.agent_service import AgentService
from services.ai.chat_service import ChatRequest
from services.posts.writing_service import WritingService
from repositories.writing_repository import SqlAlchemyWritingRepository

app = FastAPI()

PRODUCTION_ORIGIN = os.environ.get("FRONTEND_URL", "")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        PRODUCTION_ORIGIN,
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


def get_project_service(
    session: AsyncSession = Depends(get_db_session),
) -> ProjectService:
    repository = SqlAlchemyProjectRepository(session)
    return ProjectService(repository)

def get_bio_service(
    session: AsyncSession = Depends(get_db_session),
) -> BioService:
    repository = SqlAlchemyBioRepository(session)
    return BioService(repository)

def get_agent_service(session: AsyncSession = Depends(get_db_session)) -> AgentService:
    repository = SqlAlchemyProjectRepository(session)
    project_service = ProjectService(repository)
    return AgentService(project_service)

def get_writing_service(session: AsyncSession = Depends(get_db_session),
) -> WritingService:
    repository = SqlAlchemyWritingRepository(session)
    return WritingService(repository)


@app.get("/")
def read_root():
    return {"message": "Hello World!"}

@app.get("/projects")
async def project_list(response: Response, service: ProjectService = Depends(get_project_service)):
    results = await service.get_project_list()
    response.headers["Vercel-Cache-Tag"] = "projects"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.get("/bio")
async def bio_list(response: Response, service: BioService = Depends(get_bio_service)):
    results = await service.get_bio_list()
    response.headers["Vercel-Cache-Tag"] = "bio"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.post("/chat")
async def chat(
    body: ChatRequest,
    agent_service: AgentService = Depends(get_agent_service)):
    async def event_stream():
        async for chunk in agent_service.stream_response(body.message):
            yield f"data: {json.dumps({'text': chunk})}\n\n"
        yield "data: [DONE]\n\n"
 
    return StreamingResponse(event_stream(), media_type="text/event-stream")
 
@app.get("/writings")
async def writing_list(
    response: Response,
    service: WritingService = Depends(get_writing_service)):
    results = await service.get_writing_list()
    response.headers["Vercel-Cache-Tag"] = "writings"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.get("/writings/{post_id}")
async def writing_by_id(response: Response, post_id: int, service: WritingService = Depends(get_writing_service)):
    results = await service.get_writing(post_id)
    response.headers["Vercel-Cache-Tag"] = "writings_" + post_id
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results
