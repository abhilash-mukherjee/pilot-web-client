import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atoms";
import '../App.css'
import { Box, Button, Flex, Heading, Text, useColorModeValue, VStack, Grid, GridItem, Icon } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import backgroundImage from '../assets/bgimage.png';
import { Hero } from "../components/HomepageHero";
import { About } from "../components/About";
import { Footer } from "../components/HomepageFooter";

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

      overflowX={'hidden'}
      alignItems="center"
      justifyContent="center"
      justifySelf={'center'}
      alignSelf={'center'}
      id='test990023'
      flexDir={'column'}
    >
      <Hero />
      {/* <About /> */}
      {/* <Footer /> */}
    </Flex>
  );
}
