import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function MeetingDetails() {
  const { id } = useParams();

  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    loadMeeting();
  }, []);

  const loadMeeting = async () => {
    try {
      const response = await api.get(`/meeting/${id}`);
      setMeeting(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!meeting) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <h1>
        {meeting.meeting_title || "Untitled Meeting"}
      </h1>

      <h2>Summary</h2>
      <p>{meeting.summary || "No summary available"}</p>

      <h2>Action Items</h2>

      {meeting.action_items?.length ? (
        <ul>
          {meeting.action_items.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> — {item.task}
            </li>
          ))}
        </ul>
      ) : (
        <p>No action items</p>
      )}

      <h2>Decisions</h2>

      {meeting.decisions?.length ? (
        <ul>
          {meeting.decisions.map((item, index) => (
            <li key={index}>
              {item.decision}
            </li>
          ))}
        </ul>
      ) : (
        <p>No decisions</p>
      )}

      <h2>Follow Ups</h2>

      {meeting.follow_ups?.length ? (
        <ul>
          {meeting.follow_ups.map((item, index) => (
            <li key={index}>
              <strong>{item.date}</strong> — {item.action}
            </li>
          ))}
        </ul>
      ) : (
        <p>No follow ups</p>
      )}

      <h2>Risks</h2>

        {meeting.risks?.length ? (
        <ul>
            {meeting.risks.map((item, index) => (
            <li key={index}>
                {item.risk || item}
            </li>
            ))}
        </ul>
        ) : (
        <p>No risks identified</p>
        )}

      <h2>Transcript</h2>

      <div
        style={{
          marginTop: "10px",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          lineHeight: "1.6"
        }}
      >
        {meeting.transcript}
      </div>
    </div>
  );
}

export default MeetingDetails;