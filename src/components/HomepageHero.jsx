import { Box, Button, Flex, Heading, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import backgroundImage from '../assets/bgimage.png';
import { useNavigate } from "react-router-dom";
export function Hero() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative" // Set position to relative to use absolute positioning for the overlay
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >

      {/* Responsive handling */}
      <style>
        {`
            @media (orientation: portrait) {
              .css-0 {
                background-size: auto 100vh;
              }
            }
  
            @media (orientation: landscape) {
              .css-0 {
                background-size: cover;
              }
            }
          `}
      </style>
      <HeroContent />
    </Flex>
  );
}

function HeroContent() {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      h="100%"
      w="100%"
      p={{ base: 4, md: 8 }}
    >
      <Flex w='100%' justifyContent={'space-between'}>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          letterSpacing="wider"
          color="white"
        >
          penguin labs
        </Text>
        <Flex justifySelf={'flex-end'}>
                        <Button onClick={() => navigate('/login')} variant="solid" colorScheme="whiteAlpha">
                            Login
                        </Button>
                        <Button onClick={() => navigate('/signup')} colorScheme="whiteAlpha" ml={4}>
                            Signup
                        </Button>
                    </Flex>
      </Flex>
      <VStack flex={1} justifyContent={'center'}>

        <Text
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight={600}
          textAlign="center"
          color="white"
          maxW={{ base: '90%', md: '70%' }} // to ensure the text doesn't stretch too wide on larger screens
        >
          Innovating Physical Rehab with Immersive Tech
        </Text>

        <Text
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight={400}
          textAlign="center"
          color="white"
          maxW={{ base: '90%', md: '70%' }}
        >
          We're building the best biofeedback-driven immersive rehabilitation programmes
        </Text>

        <Box pt={4}>
          <Button
            as={Link} 
            href="mailto:contact@penguinlabs.in"
            size={{ base: 'sm', md: 'md' }}
            bgColor={"rgba(0, 0, 0, 0.35)"}
            boxShadow="lg"
            color={"white"}
            p={6}
            _hover={{ bgColor: "rgba(224, 224, 224, 0.35)" }}
          >
            <Text mr={1} fontSize={'large'}>Get In Touch</Text> <ArrowForwardIcon />
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
}