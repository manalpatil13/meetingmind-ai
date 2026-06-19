from fastapi import FastAPI, HTTPException

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