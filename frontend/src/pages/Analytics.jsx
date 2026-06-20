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

        try {

            const response =
                await api.get("/meetings");

            setMeetings(
                response.data
            );

        } catch (error) {
            console.error(error);
        }
    }

    const totalMeetings =
        meetings.length;

    const totalActions =
        meetings.reduce(
            (sum, m) =>
                sum +
                (m.action_items?.length || 0),
            0
        );

    const totalDecisions =
        meetings.reduce(
            (sum, m) =>
                sum +
                (m.decisions?.length || 0),
            0
        );

    const totalRisks =
        meetings.reduce(
            (sum, m) =>
                sum +
                (m.risks?.length || 0),
            0
        );

    const assigneeCounts = {};

    meetings.forEach(meeting => {

        meeting.action_items?.forEach(item => {

            const person =
                item.name ||
                item.assignee ||
                "Unknown";

            assigneeCounts[person] =
                (assigneeCounts[person] || 0) + 1;
        });
    });

    const decisionList = [];

    meetings.forEach(meeting => {

        meeting.decisions?.forEach(item => {

            if (item.decision) {
                decisionList.push(
                    item.decision
                );
            }
        });
    });

    const riskList = [];

    meetings.forEach(meeting => {

        meeting.risks?.forEach(item => {

            if (item.risk) {
                riskList.push(
                    item.risk
                );
            }
        });
    });

    return (

        <AppLayout>

            <h1 className="page-title">
                Analytics
            </h1>

            <p className="page-subtitle">
                Meeting intelligence across your workspace.
            </p>

            <div className="analytics-grid">

                <div className="analytics-card">
                    <span>Total Meetings</span>
                    <h2>{totalMeetings}</h2>
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

            <div className="insights-layout">

                <div className="analytics-panel">

                    <h3>
                        Action Owners
                    </h3>

                    {
                        Object.keys(
                            assigneeCounts
                        ).length === 0 ? (

                            <p className="empty-text">
                                No actions found.
                            </p>

                        ) : (

                            Object.entries(
                                assigneeCounts
                            ).map(
                                ([name, count]) => (

                                    <div
                                        key={name}
                                        className="analytics-row"
                                    >
                                        <span>
                                            {name}
                                        </span>

                                        <strong>
                                            {count}
                                        </strong>
                                    </div>
                                )
                            )

                        )
                    }

                </div>

                <div className="analytics-panel">

                    <h3>
                        Recent Decisions
                    </h3>

                    {
                        decisionList.length === 0 ? (

                            <p className="empty-text">
                                No decisions found.
                            </p>

                        ) : (

                            decisionList.map(
                                (decision, index) => (

                                    <div
                                        key={index}
                                        className="analytics-item"
                                    >
                                        {decision}
                                    </div>
                                )
                            )

                        )
                    }

                </div>

                <div className="analytics-panel">

                    <h3>
                        Risks
                    </h3>

                    {
                        riskList.length === 0 ? (

                            <div className="safe-state">
                                No risks identified.
                            </div>

                        ) : (

                            riskList.map(
                                (risk, index) => (

                                    <div
                                        key={index}
                                        className="risk-item"
                                    >
                                        {risk}
                                    </div>
                                )
                            )

                        )
                    }

                </div>

            </div>

        </AppLayout>

    );
}

export default Analytics;