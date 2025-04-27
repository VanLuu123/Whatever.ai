import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
from dotenv import load_dotenv
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import SQLModel

load_dotenv()
database_key = os.environ.get("URL_DATABASE")

URL_DATABASE=database_key

engine:AsyncEngine = create_async_engine(URL_DATABASE, echo=True)

async def get_session(): 
    async with AsyncSession(engine) as session:
        yield session
        
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)