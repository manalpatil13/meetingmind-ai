import json
import re
import requests


def analyze_meeting(transcript):

    prompt = f"""
You are an AI meeting assistant.

Analyze the meeting transcript.

IMPORTANT:
- Return ONLY valid JSON.
- Do not explain anything.
- Do not write text before JSON.
- Do not write text after JSON.
- Never leave summary empty.
- Generate a professional meeting title.
- Title must be 3-8 words.

Examples:
- Sprint Planning Meeting
- Frontend Deployment Review
- Authentication Readiness Discussion
- Version 1 Launch Planning

Return EXACTLY this schema:

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
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()

    raw_text = result["response"]

    print("\n========== LLAMA RESPONSE ==========\n")
    print(raw_text)
    print("\n====================================\n")

    try:
        return json.loads(raw_text)

    except:

        match = re.search(
            r"\{.*\}",
            raw_text,
            re.DOTALL
        )

        if match:

            return json.loads(
                match.group()
            )

        raise Exception(
            "Failed to extract JSON from Llama output."
        )