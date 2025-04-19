import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_logic import get_cafe_recommendation
from pydantic import BaseModel
from typing import List, Literal
from google_places import get_place_details
from sse_starlette.sse import EventSourceResponse

class Message(BaseModel):
    text:str
    sender: Literal["user", "ai"]
    
class ChatRequest(BaseModel):
    chatmessages: List[Message]

app = FastAPI()

origins = [
    "http://localhost:3000"
]
#only allows this specified URL's to make requests to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers =["*"],
)
# POST endpoint that extracts full chat histroy for LangChain Prompt formatting
@app.post("/recommend")
def recommend(request_body: ChatRequest = "hi"):
    chat_history = [
        (msg.sender, msg.text)
        for msg in request_body.chatmessages
    ]
    return EventSourceResponse(get_cafe_recommendation(chat_history), media_type="text/event-stream")
    #place_data = get_place_details(recommendation)

#Initializes uvicorn to run backend on localhost:8000 
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
