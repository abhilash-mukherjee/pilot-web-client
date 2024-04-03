import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState, curretSessionDataState } from '../state/atoms'; // Ensure paths are correct
import { CurrentSessionContainer } from "../components/CurrentSessionContainer";
import {BASE_URL} from '../helpers/strings'; // Ensure this path matches your project structure
import { SessionHolder } from '../components/SessionHolder';

export function DashboardPage() {
  const auth = useRecoilValue(authState);
  const sessionData = useRecoilValue(curretSessionDataState);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not logged in
    if (!auth.isLoggedIn) {
      navigate('/');
    }
  }, [auth.isLoggedIn, navigate]);

  const handleCreateSession = async () => {
    if (sessionData !== null) {
      // Check with user before ending the current session
      const endSession = window.confirm("An active session is running. End it and create a new session?");
      if (endSession) {
        // User confirmed to end the session, proceed with ending session
        try {
          const response = await fetch(`${BASE_URL}/end-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.token}`, // Assuming authState contains the token
            },
            body: JSON.stringify({ id: sessionData.id }), // Assuming sessionData contains the id
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to end session');
          }
          alert(data.message); // Notify user of success
        } catch (error) {
          alert(`Error: ${error.message}`); // Notify user of error
        } finally {
          navigate('/create-session'); // Navigate regardless of the API call outcome
        }
      }
      // If user cancels, do nothing
    } else {
      // No active session, navigate directly
      navigate('/create-session');
    }
  };

  return (
    <>
      <div>
        DashboardPage
        <button onClick={handleCreateSession}>Create New Session</button>
        <CurrentSessionContainer />
        <SessionHolder />
      </div>
    </>
  );
}
