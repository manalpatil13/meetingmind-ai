import {
    FiHome,
    FiBarChart2,
    FiSettings,
    FiUser
} from "react-icons/fi";

import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div>

                <div className="logo">
                    MeetingMind AI
                </div>

                <nav>

                    <Link
                        to="/"
                        className="nav-item"
                    >
                        <FiHome />
                        Meetings
                    </Link>

                    <Link
                        to="/analytics"
                        className="nav-item"
                    >
                        <FiBarChart2 />
                        Analytics
                    </Link>

                    <Link
                        to="/settings"
                        className="nav-item"
                    >
                        <FiSettings />
                        Settings
                    </Link>

                </nav>

            </div>

            <div className="user-card">

                <FiUser />

                <div>

                    <strong>
                        Manal Patil
                    </strong>

                    <p>
                        AI Engineer
                    </p>

                </div>

            </div>

        </aside>

    );
}

export default Sidebar;