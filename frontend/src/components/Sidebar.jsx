import {
    FiHome,
    FiBarChart2,
    FiSettings,
    FiUser
} from "react-icons/fi";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div>

                <div className="logo">
                    MeetingMind
                </div>

                <nav>

                    <a className="nav-item">
                        <FiHome />
                        Meetings
                    </a>

                    <a className="nav-item">
                        <FiBarChart2 />
                        Analytics
                    </a>

                    <a className="nav-item">
                        <FiSettings />
                        Settings
                    </a>

                </nav>

            </div>

            <div className="user-card">

                <FiUser />

                <div>
                    <strong>Manal Patil</strong>
                    <p>AI Engineer</p>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;