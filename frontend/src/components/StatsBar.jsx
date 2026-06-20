function StatsBar({
    meetings,
    actions,
    risks
}) {
    return (
        <div className="stats-bar">

            <div className="stat-item">
                <span className="stat-value">
                    {meetings}
                </span>
                <span className="stat-label">
                    Meetings
                </span>
            </div>

            <div className="stat-item">
                <span className="stat-value">
                    {actions}
                </span>
                <span className="stat-label">
                    Open Actions
                </span>
            </div>

            <div className="stat-item">
                <span className="stat-value risk">
                    {risks}
                </span>
                <span className="stat-label">
                    Risks Flagged
                </span>
            </div>

        </div>
    );
}

export default StatsBar;