import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_logic import get_cafe_recommendation
from pydantic import BaseModel
from typing import List, Literal

class Message(BaseModel):
    text:str
    sender: Literal["user", "ai"]
    
class ChatRequest(BaseModel):
    chatmessages: List[Message]

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers =["*"],
)

@app.post("/recommend")
async def recommend(request_body: ChatRequest):
    last_user_message = ""
    for msg in reversed(request_body.chatmessages):
        if msg.sender == "user":
            last_user_message = msg.text
            break

    recommendation = get_cafe_recommendation(last_user_message)
    return {"recommendation": recommendation}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
