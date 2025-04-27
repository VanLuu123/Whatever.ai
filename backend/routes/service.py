from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from models import Message

class ChatService:
    def __init__(self, session: AsyncSession):
        self.session = session 
        
    async def get_all_messages(self, session_id:str):
        statement = select(Message).where(Message.session_id == session_id)
        result = await self.session.exec(statement)
        return result.all()
    
    async def create_messages(self, message:Message)->Message:
        self.session.add(message)
        await self.session.commit()
        await self.session.refresh(message)
        print("Saving message:", message.text, message.sender, message.session_id)
        return message