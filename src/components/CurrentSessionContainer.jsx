import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../helpers/strings';
import { isEqual } from 'lodash'; // Consider using lodash's isEqual for deep comparison
import { PausePlayEndButtonContainer } from './PausePlayButtonContainer';
import { useRecoilState } from 'recoil';
import { curretSessionDataState } from '../state/atoms';
import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react';

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
                if (!newData.sessionData) newData.sessionData = null;
                console.log("updated", newData.sessionData);
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

    const metricsRowSpan = useBreakpointValue({ base: 1, md: 1, lg: 2 });
    const metricColumnSpan = useBreakpointValue({ base: 2, md: 2, lg: 1 });
    const headerColumnSpan = useBreakpointValue({ base: 4, md: 4, lg: 2 });
    const btnHoldeColumnSpan = useBreakpointValue({ base: 4, md: 4, lg: 2 });

    // Render logic remains the same
    if (initialLoad) return (
        <Grid width={'100%'} bgColor={'#E6FFFA'} margin={'1rem'} borderRadius={'16px'} p='1rem' templateColumns={`repeat(4, 1fr)`} templateRows={`repeat(3, 1fr)`} alignItems={'center'}>
            <Text>Loading current session...</Text>
        </Grid>
    )
    if (!sessionData) return (
        <Grid width={'100%'} bgColor={'#E6FFFA'} margin={'1rem'} borderRadius={'16px'} p='1rem' templateColumns={`repeat(4, 1fr)`} templateRows={`repeat(3, 1fr)`} textAlign={'center'} justifyContent={'center'}>
            <GridItem rowSpan={3} colSpan={4}>
                <Text fontSize={'large'} fontWeight={'bold'}>No Current Session</Text>
            </GridItem>
        </Grid>
    )


    return (
        <>
            <Grid width={'100%'} bgColor={'#E6FFFA'} margin={'1rem'} borderRadius={'16px'} p='1rem' templateColumns={`repeat(4, 1fr)`} templateRows={`repeat(3, 1fr)`}>
                <GridItem rowSpan={1} colSpan={headerColumnSpan}>
                    <Text fontSize={'x-large'} fontWeight={'bold'} textAlign={'center'}>Current Session</Text>
                </GridItem>
                <GridItem rowSpan={1} colSpan={btnHoldeColumnSpan}>
                    <PausePlayEndButtonContainer sessionData={sessionData} setSessionData={setSessionData} />
                </GridItem>
                <GridItem rowSpan={metricsRowSpan} colSpan={metricColumnSpan} alignSelf={'center'} justifySelf={'center'}>
                    <Text fontWeight={500}>{sessionData.patientName || 'N/A'}</Text>
                </GridItem>
                <GridItem rowSpan={metricsRowSpan} colSpan={metricColumnSpan} alignSelf={'center'} justifySelf={'center'}>
                    <Text fontWeight={500}>{sessionData.status || 'N/A'}</Text>
                </GridItem>
                <GridItem rowSpan={metricsRowSpan} colSpan={metricColumnSpan} alignSelf={'center'} justifySelf={'center'}>
                    <Text fontWeight={500}>{sessionData.module || 'N/A'}</Text>
                </GridItem>
                <GridItem rowSpan={metricsRowSpan} colSpan={metricColumnSpan} alignSelf={'center'} justifySelf={'center'}>
                    <Text fontWeight={500}>{sessionData.date ? new Date(sessionData.date).toLocaleString() : 'N/A'}</Text>
                </GridItem>

            </Grid>
        </>

    );
}
