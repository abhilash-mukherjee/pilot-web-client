import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helpers/strings';
import { fetchUserDetails } from '../helpers/methods';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/atoms';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, useBreakpointValue, Heading } from '@chakra-ui/react';

export function LoginPage() {
  const navigate = useNavigate();
  // State for input fields
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for submission status and error messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setAuth = useSetRecoilState(authState);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        const userDetails = await fetchUserDetails(data.token);
        if (userDetails) {
          setAuth({ isLoggedIn: true, token: data.token, userDetails }); // Update Recoil auth state
          navigate('/dashboard');
        } else {
          setErrorMessage('Failed to load user details.');
        }
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <Box
            w={{ base: "full", md: "50%" }}
            p={8}
            boxShadow="md"
            rounded="lg"
        >
            <Heading as="h2" size="lg" textAlign="center" mb={6}>
                Login
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {errorMessage && <Text color="red.500">{errorMessage}</Text>}
                    <Button
                        type="submit"
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        loadingText="Logging in"
                        width="full"
                    >
                        Login
                    </Button>
                </VStack>
            </form>
        </Box>
);
}
