import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atoms";
import '../App.css'
import { Box, Button, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import backgroundImage from '../assets/bgimage.png';

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
      height="auto" 
      width="100%" 
      alignItems="center" 
      justifyContent="center"
      justifySelf={'center'}
      alignSelf={'center'}
      id='test990023'
      flexDir={'column'}
    >
      <Hero />
    </Flex>
  );
}




function Hero() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative" // Set position to relative to use absolute positioning for the overlay
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay */}
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="rgba(0, 0, 0, 0.45)" // Black with 45% opacity
      />

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

function HeroContent(){
  return (
    <>
    <Flex>
      <Text>penguin labs</Text>
    </Flex>
    </>
  )
}