from typing import Protocol
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from db.contact import ContactInquiry


class ContactInquiryRepository(Protocol):
    """Interface the service layer depends on."""

    async def create(self) -> list[ContactInquiry]: ...


class SqlAlchemyContactInquiryRepository:
    """Concrete implementation backed by Supabase Postgres via SQLAlchemy."""

    def __init__(self, session: AsyncSession):
        self._session = session

    def create(self, inquiry: ContactInquiry) -> ContactInquiry:
        self.db.add(inquiry)
        self.db.flush()
        return inquiry
