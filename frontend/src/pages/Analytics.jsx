import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";
import api from "../services/api";

function Analytics() {

    const [meetings, setMeetings] =
        useState([]);

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

    const totalActions =
        meetings.reduce(
            (sum, meeting) =>
                sum +
                (meeting.action_items?.length || 0),
            0
        );

    const totalRisks =
        meetings.reduce(
            (sum, meeting) =>
                sum +
                (meeting.risks?.length || 0),
            0
        );

    const totalDecisions =
        meetings.reduce(
            (sum, meeting) =>
                sum +
                (meeting.decisions?.length || 0),
            0
        );

    return (
        <AppLayout>

            <h1 className="page-title">
                Analytics
            </h1>

            <p className="page-subtitle">
                Structured intelligence across all meetings.
            </p>

            <div className="analytics-grid">

                <div className="analytics-card">
                    <span>Total Meetings</span>
                    <h2>{meetings.length}</h2>
                </div>

                <div className="analytics-card">
                    <span>Actions</span>
                    <h2>{totalActions}</h2>
                </div>

                <div className="analytics-card">
                    <span>Decisions</span>
                    <h2>{totalDecisions}</h2>
                </div>

                <div className="analytics-card risk-card">
                    <span>Risks</span>
                    <h2>{totalRisks}</h2>
                </div>

            </div>

        </AppLayout>
    );
}

export default Analytics;