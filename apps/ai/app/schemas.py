from typing import List, Literal, Optional

from pydantic import BaseModel


class ChatMessageIn(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessageIn]] = []


class ChatResponse(BaseModel):
    reply: str