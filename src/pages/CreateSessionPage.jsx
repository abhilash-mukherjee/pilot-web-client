import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { curretSessionDataState } from '../state/atoms'; // Adjust the import path as necessary
import { BASE_URL } from '../helpers/strings'; // Ensure this matches your project structure
import { halfHeadLengthCentimeters } from '../helpers/constants';

export function CreateSessionPage() {
  const navigate = useNavigate();
  const setSessionData = useSetRecoilState(curretSessionDataState);
  const [formData, setFormData] = useState({
    module: "LATERAL_MOVEMENT",
    patientDetails: {
      email: "defalt@email.com",
      name: "",
      ailment: "Stroke"
    },
    sessionParams: {
      duration: 60,
      cubeGap: 5,
      speed: 3,
      isStanding: false,
      targetSide: "BOTH",
      rightOffsetCentimeters: 5,
      leftOffsetCentimeters: 5,
      cubeScaleDecimeters: 12,
      spawningDistanceMetres: 12,
      spawnHeightDecimetres: 12,
      zThresholdInMetres: 7
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.section === "patientDetails") {
      setFormData(prevState => ({
        ...prevState,
        patientDetails: {
          ...prevState.patientDetails,
          [name]: value
        }
      }));
    } else if (dataset.section === "sessionParams") {
      setFormData(prevState => ({
        ...prevState,
        sessionParams: {
          ...prevState.sessionParams,
          [name]: parseFloat(value) || value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`${BASE_URL}/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionData: formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create session');
      }

      setSessionData(data.sessionData);
      navigate('/dashboard');

    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}>Back</button>
      <h1>Create New Session</h1>
      <form onSubmit={handleSubmit}>
        {/* Patient Details Inputs */}
        <div>
          <div>Patient Name</div>
          <input
            name="name"
            value={formData.patientDetails.name}
            onChange={handleChange}
            data-section="patientDetails"
            placeholder="Patient Name"
            required
          />
          <div>Patient Email</div>
          <input
            name="email"
            value={formData.patientDetails.email}
            onChange={handleChange}
            data-section="patientDetails"
            placeholder="Patient Email"
            required
          />
          <div>Patient Ailment</div>

          <input
            name="ailment"
            value={formData.patientDetails.ailment}
            onChange={handleChange}
            data-section="patientDetails"
            placeholder="Patient Ailment"
            required
          />
        </div>

        {/* Session Params Inputs */}
        <h2>Session Parameters</h2>
        <div>Session Duration (mins)</div>

        <div>
          <input
            type="number"
            name="duration"
            value={formData.sessionParams.duration}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Duration (in seconds)"
            required
          />
          <div>Cube Gap (secs)</div>

          <input
            type="number"
            name="cubeGap"
            value={formData.sessionParams.cubeGap}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Cube Gap"
            required
          />
          <div>Cube Speed (1-10)</div>
          <input
            type="number"
            name="speed"
            value={formData.sessionParams.speed}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Speed"
            required
          />
          <div>Player Posture</div>
          <select
            name="isStanding"
            value={formData.sessionParams.isStanding}
            onChange={handleChange}
            data-section="sessionParams"
            required
          >
            <option value={true}>Standing</option>
            <option value={false}>Sitting</option>
          </select>
          <div>Target Side</div>

          <select
            name="targetSide"
            value={formData.sessionParams.targetSide}
            onChange={handleChange}
            data-section="sessionParams"
            required
          >
            <option value="LEFT">Left</option>
            <option value="RIGHT">Right</option>
            <option value="BOTH">Both</option>
          </select>
          <div>Right Offset (cms)</div>
          <input
            type="number"
            name="rightOffsetCentimeters"
            value={formData.sessionParams.rightOffsetCentimeters}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Right Offset (cms)"
            required
          />
          <div>Left Offset (cm)</div>

          <input
            type="number"
            name="leftOffsetCentimeters"
            value={formData.sessionParams.leftOffsetCentimeters}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Left Offset (cm)"
            required
          />
          <div>Cube Scale Decimeters</div>

          <input
            type="number"
            name="cubeScaleDecimeters"
            value={formData.sessionParams.cubeScaleDecimeters}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Cube Scale (dm)"
            required
          />
          <div>Spawnning Distance (metres)</div>

          <input
            type="number"
            name="spawningDistanceMetres"
            value={formData.sessionParams.spawningDistanceMetres}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Spawning Distance (m)"
            required
          />
          <div>Spawnning Height (Deci Metres)</div>
          <input
            type="number"
            name="spawnHeightDecimetres"
            value={formData.sessionParams.spawnHeightDecimetres}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Spawn Height (dm)"
            required
          />
          <div>Z Threshold (metres)</div>
          <input
            type="number"
            name="zThresholdInMetres"
            value={formData.sessionParams.zThresholdInMetres}
            onChange={handleChange}
            data-section="sessionParams"
            placeholder="Z Threshold (m)"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create Session'}
        </button>
      </form>
    </div>
  );
}