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

    const response = await api.get(
      `/meeting/${id}`
    );

    setMeeting(response.data);
  };

  if (!meeting) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <h1>
        {meeting.meeting_title}
      </h1>

      <h2>Summary</h2>

      <p>{meeting.summary}</p>

      <h2>Action Items</h2>

      <ul>
        {meeting.action_items?.map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <h2>Decisions</h2>

      <ul>
        {meeting.decisions?.map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

      <h2>Risks</h2>

      <ul>
        {meeting.risks?.map(
          (item, index) => (
            <li key={index}>{item}</li>
          )
        )}
      </ul>

    </div>
  );
}

export default MeetingDetails;