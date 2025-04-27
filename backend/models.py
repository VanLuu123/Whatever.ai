from sqlmodel import SQLModel, Field 
from typing import Optional 
import uuid 

class Message(SQLModel, table=True): 
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()), index=True)
    sender: str
    text: str
