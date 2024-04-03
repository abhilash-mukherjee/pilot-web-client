import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/atoms";

export function HomePage(){
    const auth = useRecoilValue(authState);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Check if user is not logged in
      if (auth.isLoggedIn) {
        // Redirect to the homepage or login page
        navigate('/dashboard');
      }
    }, [auth.isLoggedIn, navigate]); // Dependencies array ensures effect runs on auth state change or component mount
    return(
        <>
        <div>
            Home Page
        </div>
        </>
    )
}