// At the top of Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Container, useBreakpointValue } from '@chakra-ui/react';

export function Layout() {
    const paddingValue = useBreakpointValue({ base: '4', md: '8', lg: '16' });
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