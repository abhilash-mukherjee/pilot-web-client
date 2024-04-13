import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atoms";
import '../App.css'
import { Box, Button, Flex, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import {ArrowForwardIcon} from '@chakra-ui/icons'
import backgroundImage from '../assets/bgimage.png';
import { Hero } from "../components/HomepageHero";

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
