from datetime import datetime, timezone
import uuid

from db.survey import QuestionnaireSubmission
from repositories.survey_repository import QuestionnaireSubmissionRepository
from schemas.survey_questionnaire import QuestionnaireSubmissionCreate


class QuestionnaireSubmissionService:
    def __init__(self, repository: QuestionnaireSubmissionRepository) -> None:
        self.repository = repository
 
    async def create_submission(
        self, payload: QuestionnaireSubmissionCreate
    ) -> QuestionnaireSubmission:
        submission = QuestionnaireSubmission(
            id=str(uuid.uuid4()),
            questionnaire_id=payload.questionnaire_id,
            submitted_at=payload.submitted_at,
            received_at=datetime.now(timezone.utc),
            answers=[answer.model_dump() for answer in payload.answers],
        )

        return await self.repository.create(submission)
