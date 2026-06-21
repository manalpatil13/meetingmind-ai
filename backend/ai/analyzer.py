import os
import json
import re

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

MODEL_NAME = os.getenv(
    "MODEL_NAME",
    "llama-3.3-70b-versatile"
)


def analyze_meeting(transcript):

    prompt = f"""
Analyze this meeting transcript.

Return ONLY valid JSON.

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

Meeting transcript:

{transcript}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    raw_text = (
        response
        .choices[0]
        .message
        .content
    )

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
                "Invalid AI response."
            )

        data = json.loads(
            match.group()
        )

    if not data.get(
        "meeting_title"
    ):
        data["meeting_title"] = (
            "Meeting Discussion"
        )

    if not data.get(
        "summary"
    ):
        data["summary"] = (
            "Meeting discussion and decisions."
        )

    return data