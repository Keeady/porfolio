
from enum import Enum
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class InquiryType(str, Enum):
    PROJECT = "project"
    GENERAL = "general"


class ContactInquiryCreate(BaseModel):
    type: InquiryType
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=10, max_length=5000)

    project_type: str | None = Field(
        default=None,
        max_length=50,
        alias="projectType",
    )
    budget: str | None = Field(
        default=None,
        max_length=30,
    )

    @model_validator(mode="after")
    def validate_project(self):
        if self.type == InquiryType.PROJECT:
            if not self.project_type:
                raise ValueError("Project type is required")
        else:
            self.project_type = None
            self.budget = None

        return self


class ContactInquiryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class ContactInquiryCreated(BaseModel):
    success: bool
    inquiry: ContactInquiryResponse
