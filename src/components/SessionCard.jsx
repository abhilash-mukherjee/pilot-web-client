import { Card, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SessionCard({ sessionId, module, patientName, date, ailment }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the session-details page with the session ID
    navigate(`/session-details/${sessionId}`);
  };

  return (
    <Card onClick={handleClick} cursor={'pointer'} padding={'1rem'} bgColor={'#F7FAFC'}>
      <Flex gap={'10px'}>
        <Text fontWeight={'bold'}>Patient Name: </Text><Text >{patientName}</Text>
      </Flex>
      <Flex gap={'10px'}>
        <Text fontWeight={'bold'}>Ailment: </Text><Text >{ailment}</Text>
      </Flex>
      <Flex gap={'10px'}>
        <Text fontWeight={'bold'}>Module: </Text><Text >{module}</Text>
      </Flex>
      <Flex gap={'10px'}>
        <Text fontWeight={'bold'}>Date: </Text><Text >{new Date(date).toLocaleString()}</Text>
      </Flex>
    </Card>
  );
}
