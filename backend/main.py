from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_logic import get_cafe_recommendation
from pydantic import BaseModel
from typing import List
from sse_starlette.sse import EventSourceResponse
from database import init_db
from contextlib import asynccontextmanager
from routes.chats import chats_router
from models import Message

    
class ChatRequest(BaseModel):
    chatmessages: List[Message]
    
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db() #starts database on startup
    yield
    
    pass
    
app = FastAPI(lifespan=lifespan)

origins = [
    "https://whatever-ai-gamma.vercel.app"
]
#only allows this specified URL's to make requests to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers =["*"],
)

app.include_router(chats_router)

# POST endpoint that extracts full chat histroy for LangChain Prompt formatting
@app.post("/recommend")
async def recommend(request_body: ChatRequest):
    chat_history = [
        (msg.sender, msg.text)
        for msg in request_body.chatmessages
    ]
    return EventSourceResponse(get_cafe_recommendation(chat_history), media_type="text/event-stream")

@app.get("/")
def root():
    return{"status": "Backend live"}
    
    

#Initializes uvicorn to run backend on localhost:10000 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)