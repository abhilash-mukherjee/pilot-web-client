import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { curretSessionDataState } from '../state/atoms'; // Adjust the import path as necessary
import { SessionCard } from './SessionCard'; // Adjust the import path as necessary
import {BASE_URL} from '../helpers/strings'; // Ensure this matches your project structure
import { Box, Flex, Text } from '@chakra-ui/react';

export function SessionHolder() {
    const [sessions, setSessions] = useState([]);
    const currentSession = useRecoilValue(curretSessionDataState);
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/sessions`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch sessions');
                }

                const data = await response.json();
                // Filter sessions to include only those with status 'ENDED'
                const endedSessions = data.sessions.filter(session => session.status === 'ENDED');
                setSessions(endedSessions);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchSessions();
    }, [currentSession]); // Re-fetch sessions when currentSession changes

    return (
        <Box w={'100%'} borderTop={'1px solid grey'} marginTop={'10px'} paddingTop={'1rem'}>
            <Text fontSize={'x-large'} fontWeight={'bold'}>Previous Sessions</Text>
            <Flex flexDirection={'column'} gap={'1rem'} marginTop={'1rem'}>
            {sessions.map((session) => (
                <SessionCard 
                    key={session._id}
                    sessionId={session._id}
                    module={session.module}
                    patientName={session.patientName}
                    date={session.date}
                    ailment={session.ailment}
                />
            ))}
            </Flex>
        </Box>
    );
}
