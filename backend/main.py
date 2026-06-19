from fastapi import FastAPI
from database import supabase

app = FastAPI(
    title="MeetingMind AI"
)

@app.get("/")
def root():
    return {
        "status": "running"
    }

@app.get("/test-db")
def test_db():

    data = supabase.table(
        "meetings"
    ).select("*").limit(1).execute()

    return {
        "success": True,
        "records": len(data.data)
    }