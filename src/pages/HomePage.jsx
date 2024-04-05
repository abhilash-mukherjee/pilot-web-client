import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atoms";
import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export function HomePage() {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (auth.isLoggedIn) {
      navigate('/dashboard');
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <Flex 
      height="80vh" 
      width="100%" 
      alignItems="center" 
      justifyContent="center"
      justifySelf={'center'}
      alignSelf={'center'}
      id='test990023'
    >
      <Box 
        width={{ base: "90%", md: "70%", lg: "50%" }} 
        p={4}
      >
        <Heading 
          mb={4} 
          color="teal"
        >
          Neuro Rehab Made Seamless & Engaging
        </Heading>
        <Text 
          mb={8} 
          color={useColorModeValue('gray.600', 'gray.200')}
          fontSize={'1.35rem'}
        >
          Penguin labs builds the best in class solutions to streamline neuro rehabs, 
          make it more scalable and engaging.
        </Text>
        <Flex 
          gap={4} 
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={'center'}
        >
          <Button 
            colorScheme="teal" 
            variant="solid" 
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
          <Button 
            colorScheme="teal" 
            variant="outline" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
