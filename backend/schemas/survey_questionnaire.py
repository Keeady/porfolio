 


from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, field_validator

ShortStr = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=100)]
 
 
class Answer(BaseModel):
    question_id: Annotated[str, StringConstraints(min_length=1, max_length=64)]
    selected: list[ShortStr] = Field(default_factory=list, max_length=20)
    text: Annotated[str, StringConstraints(strip_whitespace=True, max_length=2000)] | None = None
 
    @field_validator("selected")
    @classmethod
    def no_duplicate_choices(cls, v: list[str]) -> list[str]:
        if len(set(v)) != len(v):
            raise ValueError("duplicate selections")
        return v

class QuestionnaireSubmissionCreate(BaseModel):
    questionnaire_id: Annotated[str, StringConstraints(min_length=1, max_length=64)]
    submitted_at: datetime
    answers: list[Answer] = Field(min_length=1, max_length=100)
 
    @field_validator("answers")
    @classmethod
    def unique_questions(cls, v: list[Answer]) -> list[Answer]:
        ids = [a.question_id for a in v]
        if len(set(ids)) != len(ids):
            raise ValueError("each question may only be answered once")
        return v
 
 
class QuestionnaireSubmissionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
 
    questionnaire_id: str
    submitted_at: datetime
    received_at: datetime
 
 
class QuestionnaireSubmissionCreated(BaseModel):
    success: bool
    submission: QuestionnaireSubmissionResponse
