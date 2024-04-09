// Assuming these are the strings for the modules
import { lateralMovementString, grabAndReachoutString, BASE_URL } from '../helpers/strings';

import { useNavigate } from 'react-router-dom';
import {LateralMovementSessionParamsInput} from '../components/LateralMovementSessionParamsInput';
import {GrabAndReachoutSessionParamsInput} from '../components/GrabAndReachoutSessionParamsInput';
import { useSetRecoilState } from 'recoil';
import { curretSessionDataState } from '../state/atoms';
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Select, Heading, VStack, Box, Flex, Card } from '@chakra-ui/react';


export function CreateSessionPage() {
    const navigate = useNavigate();
    const setSessionData = useSetRecoilState(curretSessionDataState);
    const [module, setModule] = useState(lateralMovementString);
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        ailment: "",
    });
    const [sessionParams, setSessionParams] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);

    // Handler for session parameters change
    const handleSessionParamsChange = (newParams) => {
        setSessionParams(newParams);
        console.log(sessionParams);
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const sessionData = {
            module,
            patientDetails: {
                ...patientDetails,
                email: "patientEmail@example.com", // Use dummy email for now
            },
            sessionParams,
        };

        try {
            const response = await fetch(`${BASE_URL}/create-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ sessionData }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create session');
            }

            setSessionData(data.sessionData); // Update Recoil state with the new session
            navigate('/dashboard'); // Navigate back to the dashboard

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Flex w={"100%"} direction={'column'} alignItems={'center'}>
          <Flex alignSelf={'flex-start'}>
          <Button onClick={() => navigate('/dashboard')} colorScheme="teal" variant={'solid'}>Back</Button>
          </Flex>
        <Card p={4}  w={{ base: "full", md: "50%" }}>
          
          <Heading mb={6}>Create New Session</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Patient Name</FormLabel>
                <Input
                  placeholder="Patient Name"
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Ailment</FormLabel>
                <Input
                  placeholder="Ailment"
                  value={patientDetails.ailment}
                  onChange={(e) => setPatientDetails({ ...patientDetails, ailment: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Module</FormLabel>
                <Select
                  placeholder="Select module"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                >
                  <option value={lateralMovementString}>Lateral Movement</option>
                  <option value={grabAndReachoutString}>Grab & Reachout</option>
                </Select>
              </FormControl>
      
              {module === lateralMovementString ? (
                <LateralMovementSessionParamsInput onChange={handleSessionParamsChange} />
              ) : (
                <GrabAndReachoutSessionParamsInput onChange={handleSessionParamsChange} />
              )}
      
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting} // Assuming you have a state to control this
                type="submit"
              >
                Create Session
              </Button>
            </VStack>
          </form>
        </Card>
        </Flex>

      );
}
