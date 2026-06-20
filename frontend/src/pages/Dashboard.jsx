import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";
import api from "../services/api";

import StatsBar from "../components/StatsBar";
import MeetingRow from "../components/MeetingRow";
import UploadModal from "../components/UploadModal";

function Dashboard() {

    const [meetings, setMeetings] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [showUpload, setShowUpload] =
        useState(false);

    useEffect(() => {
        loadMeetings();
    }, []);

    async function loadMeetings() {

        const response =
            await api.get("/meetings");

        setMeetings(
            response.data
        );
    }

    const filtered =
        meetings.filter(meeting => {

            const title =
                meeting.meeting_title || "";

            const summary =
                meeting.summary || "";

            return (
                title.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                summary.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        });

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

                <button
                    className="upload-button"
                    onClick={() =>
                        setShowUpload(true)
                    }
                >
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

                {filtered.map(meeting => (

                    <MeetingRow
                        key={meeting.id}
                        meeting={meeting}
                    />

                ))}

            </div>

            <UploadModal
                open={showUpload}
                onClose={() =>
                    setShowUpload(false)
                }
                onSuccess={loadMeetings}
            />

        </AppLayout>
    );
}

export default Dashboard;