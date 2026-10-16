from uuid import UUID
from db.contact import ContactInquiry
from repositories.contact_repository import ContactInquiryRepository
from schemas.contact_inquiry import ContactInquiryCreate

class ContactInquiryService:
    def __init__(self, repository: ContactInquiryRepository):
        self._repository = repository

    def create_inquiry(
        self,
        payload: ContactInquiryCreate,
    ) -> ContactInquiry:
        inquiry = ContactInquiry(
            name=payload.name.strip(),
            email=str(payload.email),
            type=payload.type.value,
            project_type=payload.project_type,
            budget=payload.budget,
            message=payload.message.strip(),
            status="new",
        )

        try:
            created = self.repository.create(inquiry)

            self.db.commit()
            self.db.refresh(created)

            return created

        except Exception:
            self.db.rollback()
            raise
