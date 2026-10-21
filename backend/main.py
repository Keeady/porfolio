import json
import os

from fastapi import FastAPI, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.ext.asyncio import AsyncSession
from schemas.contact_inquiry import ContactInquiryCreated
from repositories.project_repository import SqlAlchemyProjectRepository
from repositories.contact_repository import SqlAlchemyContactInquiryRepository
from services.projects.project_service import ProjectService
from db.session import get_db_session
from services.bio.bio_service import BioService
from repositories.bio_repository import SqlAlchemyBioRepository
from fastapi.responses import StreamingResponse
from services.ai.agent_service import AgentService
from services.ai.chat_service import ChatRequest
from services.posts.writing_service import WritingService
from repositories.writing_repository import SqlAlchemyWritingRepository
from fastapi import Depends, FastAPI, status
from schemas.contact_inquiry import (
    ContactInquiryCreate,
    ContactInquiryCreated,
    ContactInquiryResponse,
)
from services.contact.contact_inquiry import (
    ContactInquiryService,
)
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from core.rate_limiter import limiter

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

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
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

def get_contact_inquiry_service(
    session: AsyncSession = Depends(get_db_session),
) -> ContactInquiryService:
    repository = SqlAlchemyContactInquiryRepository(session)
    return ContactInquiryService(repository)


@app.get("/")
@limiter.limit("10/minute")
def read_root(request: Request):
    return {"message": "Hello World!"}

@app.get("/projects")
@limiter.limit("5/minute")
async def project_list(
    request: Request,
    response: Response, 
    service: ProjectService = Depends(get_project_service)
):
    results = await service.get_project_list()
    response.headers["Vercel-Cache-Tag"] = "projects"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.get("/bio")
@limiter.limit("5/minute")
async def bio_list(
    request: Request,
    response: Response, 
    service: BioService = Depends(get_bio_service)
):
    results = await service.get_bio_list()
    response.headers["Vercel-Cache-Tag"] = "bio"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.post("/chat")
@limiter.limit("1/minute;3/hour;10/day")
async def chat(
    request: Request,
    body: ChatRequest,
    agent_service: AgentService = Depends(get_agent_service)
):
    async def event_stream():
        async for chunk in agent_service.stream_response(body.message):
            yield f"data: {json.dumps({'text': chunk})}\n\n"
        yield "data: [DONE]\n\n"
 
    return StreamingResponse(event_stream(), media_type="text/event-stream")
 
@app.get("/writings")
@limiter.limit("5/minute")
async def writing_list(
    request: Request,
    response: Response,
    service: WritingService = Depends(get_writing_service)
):
    results = await service.get_writing_list()
    response.headers["Vercel-Cache-Tag"] = "writings"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.get("/writings/{post_id}")
@limiter.limit("5/minute")
async def writing_by_id(
    request: Request,
    response: Response, 
    post_id: int, 
    service: WritingService = Depends(get_writing_service)
):
    results = await service.get_writing(post_id)
    response.headers["Vercel-Cache-Tag"] = f"writings_{post_id}"
    response.headers["Vercel-CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    response.headers["CDN-Cache-Control"] = "s-maxage=86400, stale-while-revalidate=3600, stale-if-error=3600"
    return results

@app.post(
    "/contact",
    response_model=ContactInquiryCreated,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("1/minute;3/hour;10/day")
async def create_contact_inquiry(
    request: Request,
    payload: ContactInquiryCreate,
    service: ContactInquiryService = Depends(
        get_contact_inquiry_service
    ),
):
    inquiry = await service.create_inquiry(payload)

    return ContactInquiryCreated(
        success=True,
        inquiry=ContactInquiryResponse.model_validate(inquiry),
    )