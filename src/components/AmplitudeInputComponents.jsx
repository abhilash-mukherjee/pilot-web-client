import React, { useState, useEffect } from 'react';
import { halfHeadWidthCentimeters, trunkHeightCentimetres } from '../helpers/constants';
import { FormControl, FormLabel, Input, VStack, Select } from '@chakra-ui/react';

const degreesToCentimeters = (degrees, radius) => {
    const radians = (degrees * Math.PI) / 180;
    return radius * radians; // Arc length formula (θ in radians)
  };
  
  const calculateOffsetsSitting = (leftAmplitude, rightAmplitude) => {
    const trunkHeight = trunkHeightCentimetres;
    const leftAmplitudeCms = degreesToCentimeters(leftAmplitude, trunkHeight);
    const rightAmplitudeCms = degreesToCentimeters(rightAmplitude, trunkHeight);
    const leftOffsetCms = -1 * rightAmplitudeCms + halfHeadWidthCentimeters;
    const rightOffsetCms = -1 * leftAmplitudeCms + halfHeadWidthCentimeters;
    return { leftOffsetCentimeters: leftOffsetCms, rightOffsetCentimeters: rightOffsetCms };
  };
  
const calculateOffsetsStandingg = (leftAmplitude, rightAmplitude) => {
  const leftOffsetCms = -1 * rightAmplitude + halfHeadWidthCentimeters;
  const rightOffsetCms = -1 * leftAmplitude + halfHeadWidthCentimeters;
  return { leftOffsetCentimeters: leftOffsetCms, rightOffsetCentimeters: rightOffsetCms };
};

const amplitudeMappingStanding = {
    low: 10,
    medium: 25,
    high: 50,
  };

export function StandingAmplitudeInputs({ onUpdate }) {
    const [leftAmplitude, setLeftAmplitude] = useState('low'); // Now using keys from amplitudeMapping
    const [rightAmplitude, setRightAmplitude] = useState('low');
  
    useEffect(() => {
      // Convert selected options to centimeters using amplitudeMapping
      const leftAmplitudeCm = amplitudeMappingStanding[leftAmplitude];
      const rightAmplitudeCm = amplitudeMappingStanding[rightAmplitude];
  
      // Calculate and update offsets when amplitudes change
      const { leftOffsetCentimeters, rightOffsetCentimeters } = calculateOffsetsStandingg(
        leftAmplitudeCm,
        rightAmplitudeCm
      );
      onUpdate({ leftOffsetCentimeters, rightOffsetCentimeters });
    }, [leftAmplitude, rightAmplitude]);
  
    return (
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="leftAmplitude">Left Side Amplitude</FormLabel>
          <Select
            id="leftAmplitude"
            name="leftAmplitude"
            value={leftAmplitude}
            onChange={(e) => setLeftAmplitude(e.target.value)}
          >
            <option value="low">Low (10 cm)</option>
            <option value="medium">Medium (25 cm)</option>
            <option value="high">High (50 cm)</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="rightAmplitude">Right Side Amplitude</FormLabel>
          <Select
            id="rightAmplitude"
            name="rightAmplitude"
            value={rightAmplitude}
            onChange={(e) => setRightAmplitude(e.target.value)}
          >
            <option value="low">Low (10 cm)</option>
            <option value="medium">Medium (25 cm)</option>
            <option value="high">High (50 cm)</option>
          </Select>
        </FormControl>
      </VStack>
    );
  }

  const amplitudeDegreeMapping = {
    low: 5,
    medium: 10,
    high: 15,
  };
  
  export function SittingAmplitudeInputs({ onUpdate }) {
    const [leftAmplitudeKey, setLeftAmplitudeKey] = useState('low'); // Store the key (low, medium, high)
    const [rightAmplitudeKey, setRightAmplitudeKey] = useState('low');
  
    useEffect(() => {
      // Convert selected keys to degrees using amplitudeDegreeMapping
      const leftAmplitudeDegrees = amplitudeDegreeMapping[leftAmplitudeKey];
      const rightAmplitudeDegrees = amplitudeDegreeMapping[rightAmplitudeKey];
  
      // Calculate and update offsets when amplitudes change
      // Assuming calculateOffsetsStanding should be calculateOffsetsSitting or similar, 
      // and should correctly handle degrees input rather than cm as shown previously.
      const { leftOffsetCentimeters, rightOffsetCentimeters } = calculateOffsetsSitting(
        leftAmplitudeDegrees, 
        rightAmplitudeDegrees
      );
      onUpdate({ leftOffsetCentimeters, rightOffsetCentimeters });
    }, [leftAmplitudeKey, rightAmplitudeKey]);
  
    return (
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="leftAmplitude">Left Side Amplitude</FormLabel>
          <Select
            id="leftAmplitude"
            name="leftAmplitude"
            value={leftAmplitudeKey}
            onChange={(e) => setLeftAmplitudeKey(e.target.value)}
          >
            <option value="low">Low (5°)</option>
            <option value="medium">Medium (10°)</option>
            <option value="high">High (15°)</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="rightAmplitude">Right Side Amplitude</FormLabel>
          <Select
            id="rightAmplitude"
            name="rightAmplitude"
            value={rightAmplitudeKey}
            onChange={(e) => setRightAmplitudeKey(e.target.value)}
          >
            <option value="low">Low (5°)</option>
            <option value="medium">Medium (10°)</option>
            <option value="high">High (15°)</option>
          </Select>
        </FormControl>
      </VStack>
    );
  }