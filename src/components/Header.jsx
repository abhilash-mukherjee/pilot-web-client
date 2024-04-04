import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchUserDetails } from '../helpers/methods';
import { authState } from '../state/atoms';
import { Button, Flex, Text, useBreakpointValue, Box } from '@chakra-ui/react';

export function Header() {
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const justifyContent = useBreakpointValue({ base: 'center', md: 'space-between' });

    useEffect(() => {
        const initializeAuthState = async () => {
            try {
                if (!localStorage.getItem("token")) return;
                const userDetails = await fetchUserDetails(localStorage.getItem("token"));
                if (userDetails) {
                    setAuth({ isLoggedIn: true, token: localStorage.getItem('token'), userDetails });
                } else {
                    // Handle case where userDetails is null, indicating the token might be invalid or expired
                    // Optionally clear the token from local storage and update auth state to reflect logged out status
                    localStorage.removeItem('token');
                    setAuth({ isLoggedIn: false, token: null, userDetails: {} });
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                // Handle the error, e.g., by logging out the user
                localStorage.removeItem('token');
                setAuth({ isLoggedIn: false, token: null, userDetails: {} });
                navigate('/login'); // Optionally redirect the user to the login page
            }
        };
        if (!auth.isLoggedIn) {
            initializeAuthState();
        }
    }, [auth.isLoggedIn, setAuth]);

    const handleLogout = () => {
        setAuth({ isLoggedIn: false, token: null, userDetails: {} });
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the home page
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="right"
            wrap="wrap"
            padding="0.5rem"
            bg="teal.500"
            color="white"
            direction={flexDirection}
        >
            <Box >
                {auth.isLoggedIn ? (
                    <Flex gap={'10px'} alignItems={'center'}>
                        <Text fontSize="lg" fontWeight="bold">
                            {auth.userDetails.name}
                        </Text>
                        <Button size={buttonSize} onClick={handleLogout} variant="outline" colorScheme="whiteAlpha">
                            Logout
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        <Button size={buttonSize} onClick={() => navigate('/login')} variant="solid" colorScheme="whiteAlpha">
                            Login
                        </Button>
                        <Button size={buttonSize} onClick={() => navigate('/signup')} colorScheme="whiteAlpha" ml={4}>
                            Signup
                        </Button>
                    </Flex>
                )}
            </Box>
        </Flex>
    );
}
