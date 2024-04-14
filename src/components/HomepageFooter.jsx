import { Box, Flex, Text, Link, IconButton, useMediaQuery } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';

export function Footer() {
  const [isLargerScreen] = useMediaQuery('(min-width: 600px)');

  return (
    <Box bgColor="#4D4E4E" color="white" p={4} w={'100%'}>
      <Flex
        direction={{ base: 'column', md: 'row' }} // Column on small screens, row on medium and above
        align="center"
        justify={{ base: 'flex-start', md: 'center' }} // Start alignment on small screens, center on medium and above
        gap={{ base: 0, md: 8 }}
      >
        <Flex align="center">
          <IconButton
            as="a"
            href="mailto:contact@penguinlabs.in"
            icon={<EmailIcon color="white" />} // Set icon color to white
            aria-label="Email"
            bgColor="transparent"
            _hover={{ bg: 'gray.600' }}
          />
          <Text>contact@penguinlabs.in</Text>
        </Flex>

        <Flex align="center">
          <IconButton
            as="a"
            href="tel:+918240533450"
            icon={<PhoneIcon color="white" />} // Set icon color to white
            aria-label="Phone"
            bgColor="transparent"
            _hover={{ bg: 'gray.600' }}
          />
          <Text>+91-8240533450</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
