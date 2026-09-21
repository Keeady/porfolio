"""
CORS setup for the FastAPI backend. Needed because ChatWidget.tsx calls
this API directly from the browser (unlike /api/projects, which your
Next.js Server Component calls server-to-server — no CORS needed there).
 
Handles three origins you'll actually hit:
  1. Local Next.js dev server (localhost:3000)
  2. Your production Vercel domain
  3. Vercel PREVIEW deployments, which get random subdomains like
     your-project-git-branch-username.vercel.app — handled via regex
     since you can't list them individually.
"""
 
import json
import os

from fastapi import FastAPI, Depends
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

app = FastAPI()

PRODUCTION_ORIGIN = os.environ.get("FRONTEND_URL", "")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        PRODUCTION_ORIGIN,
    ],
    # Matches any Vercel preview URL 
    allow_origin_regex=r"^https://keeady.*\.vercel\.app$",
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


@app.get("/")
def read_root():
    return {"message": PRODUCTION_ORIGIN}

@app.get("/projects")
async def project_list(service: ProjectService = Depends(get_project_service)):
    results = await service.get_project_list()
    return results

@app.get("/bio")
async def bio_list(service: BioService = Depends(get_bio_service)):
    results = await service.get_bio_list()
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
 
