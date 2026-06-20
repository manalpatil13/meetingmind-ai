import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";
import api from "../services/api";

import StatsBar from "../components/StatsBar";
import MeetingRow from "../components/MeetingRow";

function Dashboard() {

    const [meetings, setMeetings] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadMeetings();
    }, []);

    async function loadMeetings() {
        try {
            const response =
                await api.get("/meetings");

            setMeetings(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    const filtered = meetings.filter(
        meeting => {

            const title =
                meeting.meeting_title || "";

            const summary =
                meeting.summary || "";

            return (
                title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                summary
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        }
    );

    const totalActions =
        meetings.reduce(
            (sum, m) =>
                sum +
                (m.action_items?.length || 0),
            0
        );

    const totalRisks =
        meetings.reduce(
            (sum, m) =>
                sum +
                (m.risks?.length || 0),
            0
        );

    return (
        <AppLayout>

            <div className="dashboard-header">

                <div>

                    <h1 className="page-title">
                        Meetings
                    </h1>

                    <p className="page-subtitle">
                        Every meeting, structured.
                    </p>

                </div>

                <button className="upload-button">
                    Upload Recording
                </button>

            </div>

            <StatsBar
                meetings={meetings.length}
                actions={totalActions}
                risks={totalRisks}
            />

            <input
                className="dashboard-search"
                placeholder="Search meetings..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <div className="meeting-list">

                {filtered.length === 0 ? (

                    <div className="empty-state">

                        <h2>
                            No meetings found
                        </h2>

                        <p>
                            Upload a recording to
                            see it structured here.
                        </p>

                    </div>

                ) : (

                    filtered.map(meeting => (
                        <MeetingRow
                            key={meeting.id}
                            meeting={meeting}
                        />
                    ))

                )}

            </div>

        </AppLayout>
    );
}

export default Dashboard;