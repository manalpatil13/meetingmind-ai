import os
import json
import re
import requests

from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv(
    "OLLAMA_URL",
    "http://localhost:11434"
)

MODEL_NAME = os.getenv(
    "MODEL_NAME",
    "llama3"
)


def analyze_meeting(transcript):

    prompt = f"""
You are an expert meeting assistant.

Analyze this meeting transcript.

IMPORTANT:
- Return ONLY JSON.
- Never leave meeting_title empty.
- Never leave summary empty.
- Create a title between 3 and 8 words.
- Create a summary between 1 and 3 sentences.

Example titles:
- Sprint Planning Meeting
- Version 1 Launch Review
- Frontend Deployment Discussion
- Authentication Readiness Meeting

Return EXACTLY:

{{
    "meeting_title": "",
    "summary": "",
    "action_items": [
        {{
            "name": "",
            "task": ""
        }}
    ],
    "decisions": [
        {{
            "decision": ""
        }}
    ],
    "follow_ups": [
        {{
            "date": "",
            "action": ""
        }}
    ],
    "risks": [
        {{
            "risk": ""
        }}
    ]
}}

Transcript:

{transcript}
"""

    response = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()

    raw_text = result["response"]

    print("\n===== RAW AI OUTPUT =====\n")
    print(raw_text)
    print("\n=========================\n")

    try:
        data = json.loads(raw_text)

    except:

        match = re.search(
            r"\{.*\}",
            raw_text,
            re.DOTALL
        )

        if not match:
            raise Exception(
                "No JSON found."
            )

        data = json.loads(
            match.group()
        )

    if not data.get("meeting_title"):
        data["meeting_title"] = (
            "Meeting Discussion"
        )

    if not data.get("summary"):
        data["summary"] = (
            "The meeting discussed progress, action items, decisions, and next steps."
        )

    return data