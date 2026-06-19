from database import supabase


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