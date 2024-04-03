import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../helpers/strings'; // Ensure this matches your project setup

function SessionDetails() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionDetails, setSessionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSessionDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/session-details?id=${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }

        const data = await response.json();
        setSessionDetails(data);
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId, token]);

  if (isLoading) return <div>Loading session details...</div>;
  if (!sessionDetails) return <div>No session details found.</div>;

  const { sessionData, sessionParams, sessionMetrics } = sessionDetails;

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <h2>Session Details</h2>
      <div>
        <h3>Patient Info</h3>
        <p>Name: {sessionData.patientName}</p>
        <p>Email: {sessionData.patientEmail}</p>
        <p>Ailment: {sessionData.ailment}</p>
        <p>Date: {new Date(sessionData.date).toLocaleString()}</p>
        <p>Status: {sessionData.status}</p>
        <p>Module: {sessionData.module}</p>
      </div>
      <div>
        <h3>Session Parameters</h3>
        <p>Duration: {sessionParams.duration} seconds</p>
        <p>Cube Gap: {sessionParams.cubeGap}</p>
        <p>Speed: {sessionParams.speed}</p>
        <p>Is Standing: {sessionParams.isStanding ? 'Yes' : 'No'}</p>
        <p>Target Side: {sessionParams.targetSide}</p>
        <p>Right Offset Centimeters: {sessionParams.rightOffsetCentimeters}</p>
        <p>Left Offset Centimeters: {sessionParams.leftOffsetCentimeters}</p>
        <p>Cube Scale Decimeters: {sessionParams.cubeScaleDecimeters}</p>
        <p>Spawning Distance Metres: {sessionParams.spawningDistanceMetres}</p>
        <p>Spawn Height Decimetres: {sessionParams.spawnHeightDecimetres}</p>
        <p>Z Threshold In Metres: {sessionParams.zThresholdInMetres}</p>
      </div>
      <div>
        <h3>Session Metrics</h3>
        <p>Score: {sessionMetrics.score}</p>
        <p>Left Cubes: {sessionMetrics.leftCubes}</p>
        <p>Right Cubes: {sessionMetrics.rightCubes}</p>
        <p>Left Dodges: {sessionMetrics.leftDodges}</p>
        <p>Right Dodges: {sessionMetrics.rightDodges}</p>
        <p>Left Hits: {sessionMetrics.leftHits}</p>
        <p>Right Hits: {sessionMetrics.rightHits}</p>
      </div>
    </div>
  );
}

export default SessionDetails;
