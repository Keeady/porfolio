
from typing import Protocol
from sqlalchemy.ext.asyncio import AsyncSession
from db.survey import QuestionnaireSubmission


class QuestionnaireSubmissionRepository(Protocol):
    async def create(self) -> QuestionnaireSubmission: ...
    
class SqlAlchemyQuestionnaireSubmissionRepository: 
    def __init__(self, session: AsyncSession):
        self._session = session
 
    async def create(self, submission: QuestionnaireSubmission) -> QuestionnaireSubmission:
        self._session.add(submission)
        await self._session.commit()
        return submission
