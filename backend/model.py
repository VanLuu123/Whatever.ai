from sqlmodel import SQLModel, Field
from typing import Optional

class ChatMessage(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    session_id: str 
    sender: str 
    text: str