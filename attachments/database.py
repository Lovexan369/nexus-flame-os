"""
Локальная SQLite + структура, совместимая с PostgreSQL/Supabase.
"""
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, Text
from config import DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(String, index=True)
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    action = Column(String)
    comment = Column(Text, nullable=True)
    temperature = Column(String, default="Холодный")  # Холодный / Тёплый / Горячий
    probability = Column(Float, nullable=True)
    predicted_revenue = Column(Float, nullable=True)
    utm = Column(String, nullable=True)
    is_converted = Column(Boolean, default=False)
    language = Column(String, nullable=True)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def add_lead(
    user_id: str,
    username: str | None,
    first_name: str | None,
    action: str,
    comment: str = "",
    temperature: str = "Холодный",
    utm: str = "",
    language: str = "ru",
    probability: float | None = None,
    predicted_revenue: float | None = None,
):
    async with AsyncSessionLocal() as session:
        lead = Lead(
            user_id=str(user_id),
            username=username,
            first_name=first_name,
            action=action,
            comment=comment[:500] if comment else None,
            temperature=temperature,
            utm=utm or None,
            language=language,
            probability=probability,
            predicted_revenue=predicted_revenue,
        )
        session.add(lead)
        await session.commit()
        return lead
