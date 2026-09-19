"""
db/session.py

Async SQLAlchemy engine + session factory, pointed at Supabase Postgres
via the connection pooler (not the direct connection).

Get your connection string from:
  Supabase Dashboard -> Project Settings -> Database -> Connection string
  -> select "Transaction" mode pooler (port 6543) for serverless.

Set DATABASE_URL in your .env (local) and in Vercel Project Settings ->
Environment Variables (production), formatted for asyncpg:

  DATABASE_URL=postgresql+asyncpg://postgres.xxxxx:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres

NOTE: asyncpg + pgbouncer transaction-mode pooling requires disabling the
prepared-statement cache (statement_cache_size=0), handled below via
connect_args.
"""

import os
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

DATABASE_URL = os.environ["POSTGRES_URL"]

engine = create_async_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    connect_args={
        "statement_cache_size": 0,  # required for pgbouncer transaction mode
        "prepared_statement_cache_size": 0,
    },
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db_session():
    """FastAPI dependency: yields a request-scoped async session."""
    async with AsyncSessionLocal() as session:
        yield session