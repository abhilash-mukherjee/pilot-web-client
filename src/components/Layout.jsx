import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Container, useBreakpointValue } from '@chakra-ui/react';

export function Layout() {
    const { pathname } = useLocation();
    const paddingValue = useBreakpointValue({ base: '4', md: '8', lg: '16' });

    // Check if the current path is not the root
    if (pathname !== '/') {
        return (
            <>
                <Header />
                <Container
                    maxW="full" // Ensures the container can expand to the full width
                    minH="100vh" // Sets the minimum height to 100% of the viewport height
                    p={paddingValue} // Responsive padding based on the current breakpoint
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Outlet />
                </Container>
            </>
        );
    }

    // Return a minimal layout for the root path
    return (
            <Outlet />
    );
}
