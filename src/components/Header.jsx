import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchUserDetails } from '../helpers/methods';
import { authState } from '../state/atoms';


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
    }, [auth.isLoggedIn, setAuth]); // Dependency array ensures effect runs once or when auth.isLoggedIn changes

    const handleLogout = () => {
        setAuth({ isLoggedIn: false, token: null, userDetails: {} });
        localStorage.removeItem('token');
        navigate('/'); // Redirect to the home page
    };

    return (
        <div>
            {auth.isLoggedIn ? (
                <>
                    <span>Welcome, {auth.userDetails.name}!</span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/signup')}>Signup</button>
                </>
            )}
        </div>
    );
}
