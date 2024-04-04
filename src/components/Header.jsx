import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchUserDetails } from '../helpers/methods';
import { authState } from '../state/atoms';
import { Button, Flex, Text, useBreakpointValue, Box, Grid, GridItem } from '@chakra-ui/react';

export function Header() {
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();
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
        <Grid
            as="nav"
            wrap="wrap"
            paddingBlock="0.7rem"
            paddingInline="1rem"
            bg="teal.500"
            color="white"
            templateColumns='repeat(2, 1fr)'
            position={'sticky'}
            top="0"
            zIndex="sticky"
        >
            <GridItem colSpan={1} alignSelf={'center'}><Text justifySelf={'flex-start'} fontWeight="bold" fontSize={"larger"}>Penguin Labs</Text></GridItem>
            <GridItem colSpan={1} justifySelf={'flex-end'}>
                {auth.isLoggedIn ? (
                    <Flex gap={'10px'} justifySelf={'flex-end'}>
                        <Text fontWeight="bold" alignSelf={'center'}>
                            {auth.userDetails.name}
                        </Text>
                        <Button onClick={handleLogout} variant="outline" colorScheme="whiteAlpha">
                            Logout
                        </Button>
                    </Flex>
                ) : (
                    <Flex justifySelf={'flex-end'}>
                        <Button onClick={() => navigate('/login')} variant="solid" colorScheme="whiteAlpha">
                            Login
                        </Button>
                        <Button onClick={() => navigate('/signup')} colorScheme="whiteAlpha" ml={4}>
                            Signup
                        </Button>
                    </Flex>
                )}
            </GridItem>
        </Grid>
    );
}
