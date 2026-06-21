import os

from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException,
)

from fastapi.middleware.cors import CORSMiddleware

from services.upload_service import (
    save_uploaded_file,
)

from services.meeting_service import (
    create_meeting,
    update_transcript,
    update_analysis,
    get_all_meetings,
    get_meeting_by_id,
    search_meetings,
)

from ai.transcription import (
    transcribe_audio,
)

from ai.analyzer import (
    analyze_meeting,
)

app = FastAPI(
    title="MeetingMind AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://meetingmind-ai-jade.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {
        "message": "MeetingMind AI API"
    }


@app.get("/meetings")
def get_meetings():

    return get_all_meetings()


@app.get("/meeting/{meeting_id}")
def get_meeting(meeting_id: str):

    meeting = get_meeting_by_id(
        meeting_id
    )

    if not meeting:

        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return meeting


@app.get("/search")
def search(keyword: str):

    return search_meetings(
        keyword
    )


@app.post("/upload")
def upload_audio(
    audio: UploadFile = File(...)
):

    filepath, filename = (
        save_uploaded_file(audio)
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

        updated_meeting = (
            update_analysis(
                meeting["id"],
                analysis
            )
        )

        return {
            "success": True,
            "meeting": updated_meeting
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:

        if os.path.exists(
            filepath
        ):
            os.remove(
                filepath
            )