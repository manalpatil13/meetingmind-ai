import os
from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File
)

from fastapi.middleware.cors import CORSMiddleware

from services.upload_service import save_uploaded_file

from services.meeting_service import (
    create_meeting,
    get_all_meetings,
    get_meeting_by_id,
    search_meetings,
    update_transcript,
    update_analysis
)

from ai.transcription import transcribe_audio
from ai.analyzer import analyze_meeting

app = FastAPI(
    title="MeetingMind AI",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


@app.get("/transcript/{meeting_id}")
def transcript(meeting_id: str):

    meeting = get_meeting_by_id(meeting_id)

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return {
        "transcript": meeting["transcript"]
    }


@app.get("/analysis/{meeting_id}")
def analysis(meeting_id: str):

    meeting = get_meeting_by_id(meeting_id)

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return {
        "summary": meeting["summary"],
        "action_items": meeting["action_items"],
        "decisions": meeting["decisions"],
        "follow_ups": meeting["follow_ups"],
        "risks": meeting["risks"]
    }


@app.get("/search")
def search(q: str):
    return search_meetings(q)


@app.post("/upload")
def upload_audio(
    audio: UploadFile = File(...)
):

    filepath, filename = save_uploaded_file(
        audio
    )

    try:

        meeting = create_meeting(
            filename
        )

        transcript = transcribe_audio(
            filepath
        )

        update_transcript(
            meeting["id"],
            transcript
        )

        analysis = analyze_meeting(
            transcript
        )

        final_record = update_analysis(
            meeting["id"],
            analysis
        )

        return {
            "success": True,
            "meeting": final_record
        }

    finally:

        if os.path.exists(filepath):
            os.remove(filepath)


@app.post("/analyze")
def analyze_existing(
    meeting_id: str
):

    meeting = get_meeting_by_id(
        meeting_id
    )

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    analysis = analyze_meeting(
        meeting["transcript"]
    )

    result = update_analysis(
        meeting_id,
        analysis
    )

    return result