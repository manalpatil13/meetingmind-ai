import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import api from "../services/api";

function MeetingDetails() {

    const { id } = useParams();

    const [meeting, setMeeting] = useState(null);

    const [showTranscript, setShowTranscript] =
        useState(false);

    useEffect(() => {
        loadMeeting();
    }, []);

    async function loadMeeting() {

        try {

            const response =
                await api.get(`/meeting/${id}`);

            setMeeting(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    if (!meeting) {
        return (
            <AppLayout>
                <p>Loading...</p>
            </AppLayout>
        );
    }

    return (
        <AppLayout>

            <div className="meeting-header">

                <h1 className="meeting-title">
                    {meeting.meeting_title ||
                        "Meeting"}
                </h1>

                <div className="meeting-meta">

                    {meeting.processing_status}

                    {" • "}

                    {meeting.created_at
                        ? new Date(
                            meeting.created_at
                        ).toLocaleDateString()
                        : "Unknown Date"}

                </div>

            </div>

            <div className="summary-block">

                <p>
                    {meeting.summary ||
                        "No summary available."}
                </p>

            </div>

            <div className="insights-grid">

                <section className="insight-card">

                    <div className="section-header action-line">
                        Actions
                        <span>
                            {meeting.action_items?.length || 0}
                        </span>
                    </div>

                    {meeting.action_items?.length ? (

                        meeting.action_items.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="insight-item"
                                >
                                    <strong>
                                        {
                                            item.name ||
                                            item.assignee ||
                                            "Unknown"
                                        }
                                    </strong>

                                    <p>
                                        {item.task}
                                    </p>
                                </div>
                            )
                        )

                    ) : (

                        <p className="empty-text">
                            No actions.
                        </p>

                    )}

                </section>

                <section className="insight-card">

                    <div className="section-header decision-line">
                        Decisions
                        <span>
                            {meeting.decisions?.length || 0}
                        </span>
                    </div>

                    {meeting.decisions?.length ? (

                        meeting.decisions.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="insight-item"
                                >
                                    {item.decision}
                                </div>
                            )
                        )

                    ) : (

                        <p className="empty-text">
                            No decisions.
                        </p>

                    )}

                </section>

                <section className="insight-card">

                    <div className="section-header follow-line">
                        Follow Ups
                        <span>
                            {meeting.follow_ups?.length || 0}
                        </span>
                    </div>

                    {meeting.follow_ups?.length ? (

                        meeting.follow_ups.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="insight-item"
                                >
                                    <strong>
                                        {
                                            item.date ||
                                            "Upcoming"
                                        }
                                    </strong>

                                    <p>
                                        {
                                            item.action ||
                                            item.task
                                        }
                                    </p>
                                </div>
                            )
                        )

                    ) : (

                        <p className="empty-text">
                            No follow ups.
                        </p>

                    )}

                </section>

                <section className="insight-card">

                    <div className="section-header risk-line">
                        Risks
                        <span>
                            {meeting.risks?.length || 0}
                        </span>
                    </div>

                    {meeting.risks?.length ? (

                        meeting.risks.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="insight-item"
                                >
                                    {
                                        item.risk ||
                                        item.text ||
                                        item
                                    }
                                </div>
                            )
                        )

                    ) : (

                        <div className="safe-state">
                            No significant risks identified.
                        </div>

                    )}

                </section>

            </div>

            <div className="transcript-panel">

                <button
                    className="transcript-button"
                    onClick={() =>
                        setShowTranscript(
                            !showTranscript
                        )
                    }
                >
                    {showTranscript
                        ? "Hide Transcript"
                        : "View Transcript"}
                </button>

                {showTranscript && (

                    <div className="transcript-content">
                        {meeting.transcript}
                    </div>

                )}

            </div>

        </AppLayout>
    );
}

export default MeetingDetails;