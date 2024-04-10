import { BASE_URL } from "./strings";
import { halfHeadWidthCentimeters } from './constants';

// Assuming a simple arc length formula: Length = Theta * Radius
// Theta must be in radians for JavaScript Math functions
const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
const calculateOffsetCms = (amplitudeDegrees, trunkHeightCms) => {
  return trunkHeightCms * degreesToRadians(amplitudeDegrees);
};

export const calculateOffsets = (leftAmplitude, rightAmplitude, trunkHeightCms) => {
  const leftOffsetCms = calculateOffsetCms(leftAmplitude, trunkHeightCms) - halfHeadWidthCentimeters;
  const rightOffsetCms = calculateOffsetCms(rightAmplitude, trunkHeightCms) + halfHeadWidthCentimeters;
  return { leftOffsetCms, rightOffsetCms };
};
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
  
  export function extractHandDirection(key) {
    if (key.endsWith("RIGHT")) {
        return "RIGHT";
    } else if (key.endsWith("LEFT")) {
        return "LEFT";
    } else {
        return "Unknown"; // or null, depending on how you want to handle keys that don't match
    }
}