import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    const response = await api.get("/meetings");
    setMeetings(response.data);
  };

  return (
    <div className="container">

      <h1>MeetingMind AI</h1>

      <div className="meeting-list">

        {meetings.map((meeting) => (

          <Link
            key={meeting.id}
            to={`/meeting/${meeting.id}`}
            className="meeting-card"
          >

            <h3>
              {meeting.meeting_title || "Untitled Meeting"}
            </h3>

            <p>
              Status: {meeting.processing_status}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;