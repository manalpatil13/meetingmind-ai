from pydantic import BaseModel
from typing import Optional


class Meeting(BaseModel):
    filename: str
    meeting_title: Optional[str] = None
    transcript: Optional[str] = None
    summary: Optional[str] = None
    processing_status: Optional[str] = "pending"