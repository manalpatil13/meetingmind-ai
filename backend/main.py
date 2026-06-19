from fastapi import FastAPI, HTTPException
from fastapi import UploadFile, File
from services.upload_service import save_uploaded_file

from services.meeting_service import (
    get_all_meetings,
    get_meeting_by_id,
    create_meeting
)

from services.meeting_service import (
    get_all_meetings,
    get_meeting_by_id
)

app = FastAPI(
    title="MeetingMind AI"
)


@app.get("/")
def root():
    return {
        "project": "MeetingMind AI",
        "status": "running"
    }


@app.get("/meetings")
def meetings():

    return get_all_meetings()


@app.get("/meeting/{meeting_id}")
def meeting(meeting_id: str):

    result = get_meeting_by_id(meeting_id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return result

@app.post("/upload")
def upload_audio(
    audio: UploadFile = File(...)
):

    filepath, filename = save_uploaded_file(audio)

    meeting = create_meeting(filename)

    return {
        "success": True,
        "meeting": meeting
    }