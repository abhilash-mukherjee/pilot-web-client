import { BASE_URL } from "./strings";

export const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const data = await response.json();
      return data.userDetails;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };
  