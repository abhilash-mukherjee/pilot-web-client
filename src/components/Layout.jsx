// At the top of Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Container } from '@chakra-ui/react';

export function Layout() {
    // Modify the Layout component's return statement
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}