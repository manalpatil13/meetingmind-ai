import { Link } from "react-router-dom";

function MeetingRow({ meeting }) {

    const actions =
        meeting.action_items?.length || 0;

    const decisions =
        meeting.decisions?.length || 0;

    const followups =
        meeting.follow_ups?.length || 0;

    const risks =
        meeting.risks?.length || 0;

    return (
        <Link
            to={`/meeting/${meeting.id}`}
            className="meeting-row"
        >

            <div className="meeting-main">

                <h3>
                    {meeting.meeting_title ||
                        "Untitled Meeting"}
                </h3>

                <p>
                    {meeting.summary ||
                        "No summary available"}
                </p>

            </div>

            <div className="meeting-signals">

                <span
                    className="signal action"
                    title="Actions"
                >
                    {actions}
                </span>

                <span
                    className="signal decision"
                    title="Decisions"
                >
                    {decisions}
                </span>

                <span
                    className="signal follow"
                    title="Follow Ups"
                >
                    {followups}
                </span>

                <span
                    className="signal risk"
                    title="Risks"
                >
                    {risks}
                </span>

            </div>

        </Link>
    );
}

export default MeetingRow;