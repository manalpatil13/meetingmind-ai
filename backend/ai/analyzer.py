import os
import json
import re
import requests


def analyze_meeting(transcript):

    prompt = f"""
Analyze the following meeting transcript.

Return ONLY valid JSON.

Format:

{{
    "summary": "",
    "action_items": [],
    "decisions": [],
    "follow_ups": [],
    "risks": []
}}

Transcript:

{transcript}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False,
            "format": "json"
        }
    )

    if response.status_code != 200:
        raise Exception(
            f"Ollama request failed: {response.text}"
        )

    result = response.json()

    response_text = result.get("response", "")

    print("\n========== OLLAMA RESPONSE ==========")
    print(response_text)
    print("=====================================\n")

    try:
        return json.loads(response_text)

    except json.JSONDecodeError:

        match = re.search(
            r"\{.*\}",
            response_text,
            re.DOTALL
        )

        if match:
            try:
                return json.loads(match.group())
            except json.JSONDecodeError:
                pass

        raise Exception(
            f"Could not parse JSON from Ollama response:\n\n{response_text}"
        )