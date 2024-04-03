import React, { useEffect, useState } from 'react';
import {BASE_URL} from '../helpers/strings';
import { isEqual } from 'lodash'; // Consider using lodash's isEqual for deep comparison
import { PausePlayEndButtonContainer } from './PausePlayButtonContainer';
import { useRecoilState } from 'recoil';
import { curretSessionDataState } from '../state/atoms';

export function CurrentSessionContainer() {
    const [sessionData, setSessionData] = useRecoilState(curretSessionDataState);
    const [initialLoad, setInitialLoad] = useState(true); // Track the initial loading

    const fetchCurrentSession = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/current-session`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Session fetch failed');
            }

            const newData = await response.json();

            // Only update state if the new data is different to minimize re-renders
            if (!isEqual(newData.sessionData, sessionData) || !newData.sessionData) {
                console.log("updated");
                setSessionData(newData.sessionData);
            }

        } catch (error) {
            console.error(error);
            // Optionally handle error state here
        } finally {
            if (initialLoad) setInitialLoad(false);
        }
    };

    useEffect(() => {
        fetchCurrentSession();
        const interval = setInterval(fetchCurrentSession, 3000);
        return () => clearInterval(interval);
    }, []);

    // Render logic remains the same
    if (initialLoad) return <div>Loading current session...</div>;
    if (!sessionData) return <div>No current session found</div>;

    return (
        <>
            <div>Current Session Container</div>
            <div>
                <PausePlayEndButtonContainer sessionData={sessionData}  setSessionData={setSessionData}/>
                <h2>Session Details</h2>
                <p>Date: {sessionData.date ? new Date(sessionData.date).toLocaleString() : 'N/A'}</p>
                <p>Status: {sessionData.status || 'N/A'}</p>
                <p>Module: {sessionData.module || 'N/A'}</p>
                <p>Patient Name: {sessionData.patientName || 'N/A'}</p>
                <p>Ailment: {sessionData.ailment || 'N/A'}</p>
                <p>Patient Email: {sessionData.patientEmail || 'N/A'}</p>
            </div>
        </>
        
    );
}
