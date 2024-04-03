import React, { useState } from 'react';
import {BASE_URL} from '../helpers/strings';

export function PausePlayEndButtonContainer({ sessionData, setSessionData}) {
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Pause'); // Dynamic button text based on session status

    const token = localStorage.getItem('token'); // Adjust based on your auth strategy

    // Handles both pause and resume actions
    const handlePauseResume = async () => {
        setIsLoading(true);
        const action = sessionData.status === 'RUNNING' ? 'pause' : 'resume';
        const finalStatus = action === 'pause' ? 'PAUSED' : 'RUNNING';
        const endpoint = `${BASE_URL}/${action}-session`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: sessionData.id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            // Toggle button text based on successful action
            setButtonText(action === 'pause' ? 'Resume' : 'Pause');
            //update session data object immediately in frontend
            const updatedData = {...sessionData};
            updatedData.status = finalStatus;
            setSessionData(updatedData);;
            console.log(finalStatus);
        } catch (error) {
            alert(error.message); // Show error message
        } finally {
            setIsLoading(false);
        }
    };

    const handleEndSession = async () => {
        setIsLoading(true);
        const endpoint = `${BASE_URL}/end-session`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: sessionData.id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            alert(data.message); // Show success message
            setSessionData(null);
            // Optionally, perform additional actions after ending the session, such as redirecting
        } catch (error) {
            alert(error.message); // Show error message
        } finally {
            setIsLoading(false);
        }
    };

    // Determine initial button text based on session status
    useState(() => {
        if (sessionData.status === 'PAUSED') {
            setButtonText('Resume');
        } else if (sessionData.status === 'RUNNING') {
            setButtonText('Pause');
        }
    }, [sessionData.status]);

    return (
        <>
            <button onClick={handlePauseResume} disabled={isLoading || sessionData.status === 'NOT_STARTED'}>
                {isLoading ? 'Loading...' : buttonText}
            </button>
            <button onClick={handleEndSession} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'End Session'}
            </button>
        </>
    );
}