import { Box, Button, Flex, Heading, Text, useColorModeValue, VStack, Grid, GridItem, Icon } from "@chakra-ui/react";
export function About() {
    return (
      <>
        <Flex w={'100%'} flexDir={'column'} alignItems={'center'} paddingBlock={8} paddingInline={{ base: 4, md: 8, lg: 8 }} gap={6} marginBottom={50}>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700}>About our Tech</Text>
          <Grid 
            templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }} 
            gap={6} 
            w={'100%'}
          >
            <GridItem colSpan={{ base: 1, lg: 1 }}>
              <AboutCard title={'Hello World'} description={'This is sample description'} IconComponent={VRHeadsetIcon}/>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 1 }}>
              <AboutCard title={'Hello World'} description={'This is sample description'} IconComponent={VRHeadsetIcon}/>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 1 }}>
              <AboutCard title={'Hello World'} description={'This is sample description'} IconComponent={VRHeadsetIcon}/>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 1 }}>
              <AboutCard title={'Hello World'} description={'This is sample description'} IconComponent={VRHeadsetIcon}/>
            </GridItem>
          </Grid>
        </Flex>
      </>
    )
  }
  
  function AboutCard({title,description, IconComponent}){
    return (
      <>
        <Flex borderRadius={'16px'} bgColor={'#F1F5F9'} w={'100%'} h={250} flexDir={'column'} p={4} alignItems={'center'}>
          <IconComponent h={100} w={100}/>
          <Text fontWeight={'bold'} fontSize={'xl'}>{title}</Text>
          <Text>{description}</Text>
        </Flex>
      </>
    )
  }
  
  const VRHeadsetIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M21,13.5V12c0-3.31-2.69-6-6-6h-1V5c0-1.1-0.9-2-2-2h-2C8.9,3,8,3.9,8,5v1H7C3.69,6,1,8.69,1,12v1.5C1,15.33,2.67,17,4.5,17
        l-1.29,1.29C3.11,18.47,3,18.72,3,19v1c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-1c0-0.28-0.11-0.53-0.29-0.71L4.5,17H7v3
        c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-3h4v3c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-3h2.5l-1.29,1.29
        C15.11,18.47,15,18.72,15,19v1c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-1c0-0.28-0.11-0.53-0.29-0.71L19.5,17
        C21.33,17,23,15.33,23,13.5H21z M12,5h0V4h0v1H12z M12,19h-4v-2h4V19z M12,15H8V8h4V15z"
      />
    </Icon>
  );
  
  
  