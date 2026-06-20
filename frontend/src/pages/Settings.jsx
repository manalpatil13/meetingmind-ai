import AppLayout from "../layouts/AppLayout";

function Settings() {

    return (

        <AppLayout>

            <h1 className="page-title">
                Settings
            </h1>

            <p className="page-subtitle">
                Configure your MeetingMind workspace.
            </p>

            <div className="settings-grid">

                <div className="settings-card">

                    <h2>
                        AI Model
                    </h2>

                    <p>
                        Current model
                    </p>

                    <div className="setting-value">
                        Llama 3
                    </div>

                </div>

                <div className="settings-card">

                    <h2>
                        Transcription
                    </h2>

                    <p>
                        Provider
                    </p>

                    <div className="setting-value">
                        Groq Whisper
                    </div>

                </div>

                <div className="settings-card">

                    <h2>
                        Database
                    </h2>

                    <p>
                        Storage
                    </p>

                    <div className="setting-value">
                        Supabase
                    </div>

                </div>

                <div className="settings-card">

                    <h2>
                        Application
                    </h2>

                    <p>
                        Version
                    </p>

                    <div className="setting-value">
                        MeetingMind AI v1.0
                    </div>

                </div>

            </div>

            <div className="about-card">

                <h2>
                    About MeetingMind
                </h2>

                <p>
                    MeetingMind AI transforms raw meeting audio
                    into structured intelligence using AI.
                </p>

                <ul>

                    <li>
                        FastAPI Backend
                    </li>

                    <li>
                        Supabase Database
                    </li>

                    <li>
                        Groq Whisper Transcription
                    </li>

                    <li>
                        Llama 3 Meeting Intelligence
                    </li>

                    <li>
                        React Frontend
                    </li>

                </ul>

            </div>

        </AppLayout>

    );
}

export default Settings;