from fastapi import FastAPI

app = FastAPI(
    title="MeetingMind AI",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "status": "running",
        "project": "MeetingMind AI"
    }