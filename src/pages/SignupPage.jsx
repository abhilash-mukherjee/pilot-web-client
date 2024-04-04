import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helpers/strings';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/atoms';
import { fetchUserDetails } from '../helpers/methods';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack, Heading } from '@chakra-ui/react';

export function SignupPage() {
  // State for input fields
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNo: ''
  });

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setAuth = useSetRecoilState(authState)
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
    if (!formData.name || !formData.email || !formData.password || !formData.mobileNo) {
      setErrorMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
        setErrorMessage(data.message || 'Signup failed. Please try again.');
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
      m="auto" // Centrally align the Box in the viewport
      mt={{ base: 4, md: '10vh' }} // Adds a top margin, more on larger screens
    >
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
        Signup
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
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
          <FormControl id="mobileNo" isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              type="text"
              name="mobileNo"
              placeholder="Enter your mobile number"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </FormControl>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
            loadingText="Signing up"
            width="full"
          >
            Signup
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
