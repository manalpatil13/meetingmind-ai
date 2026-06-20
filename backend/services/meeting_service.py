from database import supabase


def create_meeting(filename):

    response = (
        supabase
        .table("meetings")
        .insert({
            "filename": filename,
            "processing_status": "uploaded"
        })
        .execute()
    )

    return response.data[0]


def get_all_meetings():

    response = (
        supabase
        .table("meetings")
        .select("*")
        .order("created_at", desc=True)
        .execute()
    )

    return response.data


def get_meeting_by_id(meeting_id):

    response = (
        supabase
        .table("meetings")
        .select("*")
        .eq("id", meeting_id)
        .execute()
    )

    if response.data:
        return response.data[0]

    return None


def search_meetings(keyword):

    response = (
        supabase
        .table("meetings")
        .select("*")
        .or_(
            f"meeting_title.ilike.%{keyword}%,summary.ilike.%{keyword}%,transcript.ilike.%{keyword}%"
        )
        .execute()
    )

    return response.data


def update_transcript(
    meeting_id,
    transcript
):

    response = (
        supabase
        .table("meetings")
        .update({
            "transcript": transcript,
            "processing_status": "transcribed"
        })
        .eq("id", meeting_id)
        .execute()
    )

    return response.data[0]


def update_analysis(
    meeting_id,
    analysis
):

    response = (
        supabase
        .table("meetings")
        .update({
            "meeting_title":
                analysis["meeting_title"],

            "summary":
                analysis["summary"],

            "action_items":
                analysis["action_items"],

            "decisions":
                analysis["decisions"],

            "follow_ups":
                analysis["follow_ups"],

            "risks":
                analysis["risks"],

            "processing_status":
                "completed"
        })
        .eq("id", meeting_id)
        .execute()
    )

    return response.data[0]