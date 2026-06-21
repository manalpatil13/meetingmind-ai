import os
import json
import re

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL_NAME = os.getenv(
    "MODEL_NAME",
    "llama-3.1-8b-instant"
)


def analyze_meeting(transcript):

    prompt = f"""
You are an expert meeting assistant.

Analyze the following meeting transcript.

Return ONLY valid JSON.

Return EXACTLY this structure:

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

Rules:
- Never leave title empty.
- Never leave summary empty.
- Use concise titles.
- Use arrays.

Transcript:

{transcript}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": "You only return JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        response_format={
            "type": "json_object"
        }
    )

    content = (
        response
        .choices[0]
        .message
        .content
    )

    return json.loads(content)