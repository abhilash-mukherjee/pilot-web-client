import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helpers/strings'; // Ensure this matches your project setup
import { Box, Button, Heading, Text, VStack, Divider, Flex } from '@chakra-ui/react';

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
    <VStack spacing={4} align="stretch" p={5} width={'100%'}>
      <Flex>
      <Button onClick={() => navigate('/dashboard')} colorScheme="teal" variant={'solid'}>Back to Dashboard</Button>
      </Flex>
      <Heading as="h2" size="xl" textAlign="center">Session Details</Heading>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg">Patient Info</Heading>
        <Text>Name: {sessionData.patientName}</Text>
        <Text>Email: {sessionData.patientEmail}</Text>
        <Text>Ailment: {sessionData.ailment}</Text>
        <Text>Date: {new Date(sessionData.date).toLocaleString()}</Text>
        <Text>Status: {sessionData.status}</Text>
        <Text>Module: {sessionData.module}</Text>
      </Box>
      <Divider />
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg">Session Parameters</Heading>
        <Text>Duration: {sessionParams.duration} seconds</Text>
        <Text>Cube Gap: {sessionParams.cubeGap}</Text>
        <Text>Speed: {sessionParams.speed}</Text>
        <Text>Is Standing: {sessionParams.isStanding ? 'Yes' : 'No'}</Text>
        <Text>Target Side: {sessionParams.targetSide}</Text>
        <Text>Right Offset Centimeters: {sessionParams.rightOffsetCentimeters}</Text>
        <Text>Left Offset Centimeters: {sessionParams.leftOffsetCentimeters}</Text>
        <Text>Cube Scale Decimeters: {sessionParams.cubeScaleDecimeters}</Text>
        <Text>Spawning Distance Metres: {sessionParams.spawningDistanceMetres}</Text>
        <Text>Spawn Height Decimetres: {sessionParams.spawnHeightDecimetres}</Text>
        <Text>Z Threshold In Metres: {sessionParams.zThresholdInMetres}</Text>
      </Box>
      <Divider />
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading as="h3" size="lg">Session Metrics</Heading>
        <Text>Score: {sessionMetrics.score}</Text>
        <Text>Left Cubes: {sessionMetrics.leftCubes}</Text>
        <Text>Right Cubes: {sessionMetrics.rightCubes}</Text>
        <Text>Left Dodges: {sessionMetrics.leftDodges}</Text>
        <Text>Right Dodges: {sessionMetrics.rightDodges}</Text>
        <Text>Left Hits: {sessionMetrics.leftHits}</Text>
        <Text>Right Hits: {sessionMetrics.rightHits}</Text>
      </Box>
    </VStack>
  );


}

export default SessionDetails;
