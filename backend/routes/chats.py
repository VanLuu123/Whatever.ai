from fastapi import APIRouter, Depends
from database import engine 
from models import Message
from sqlmodel.ext.asyncio.session import AsyncSession
from http import HTTPStatus
from database import get_session
from .service import ChatService
from typing import List

chats_router = APIRouter (
    prefix="/chats"
)
    
@chats_router.post("/", status_code=HTTPStatus.CREATED)
async def create_messages(message:Message, session: AsyncSession = Depends(get_session)):
    chat_service = ChatService(session)
    return await chat_service.create_messages(message)

@chats_router.get("/{session_id}", response_model=List[Message],status_code=HTTPStatus.OK)
async def get_messages(session_id: str, session: AsyncSession = Depends(get_session)):
    messages = await ChatService(session).get_all_messages(session_id)
    return messages