import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SessionCard({ sessionId, module, patientName, date, ailment }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the session-details page with the session ID
    navigate(`/session-details/${sessionId}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', border: '2px solid black'}}>
      <div>{patientName}</div>
      <div>{ailment}</div>
      <div>{module}</div>
      <div>{new Date(date).toLocaleString()}</div>
    </div>
  );
}
