import React, { useState, useEffect } from 'react';
import { halfHeadWidthCentimeters, trunkHeightCentimetres } from '../helpers/constants';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const degreesToCentimeters = (degrees, radius) => {
    const radians = (degrees * Math.PI) / 180;
    return radius * radians; // Arc length formula (θ in radians)
  };
  
  const calculateOffsetsStanding = (leftAmplitude, rightAmplitude) => {
    const trunkHeight = trunkHeightCentimetres;
    const leftAmplitudeCms = degreesToCentimeters(leftAmplitude, trunkHeight);
    const rightAmplitudeCms = degreesToCentimeters(rightAmplitude, trunkHeight);
    const leftOffsetCms = -1 * rightAmplitudeCms + halfHeadWidthCentimeters;
    const rightOffsetCms = -1 * leftAmplitudeCms + halfHeadWidthCentimeters;
    return { leftOffsetCentimeters: leftOffsetCms, rightOffsetCentimeters: rightOffsetCms };
  };
  
const calculateOffsetsSitting = (leftAmplitude, rightAmplitude) => {
  const leftOffsetCms = -1 * rightAmplitude + halfHeadWidthCentimeters;
  const rightOffsetCms = -1 * leftAmplitude + halfHeadWidthCentimeters;
  return { leftOffsetCentimeters: leftOffsetCms, rightOffsetCentimeters: rightOffsetCms };
};

export function StandingAmplitudeInputs({ onUpdate }) {
  const [leftAmplitude, setLeftAmplitude] = useState(0);
  const [rightAmplitude, setRightAmplitude] = useState(0);

  useEffect(() => {
    // Calculate and update offsets when amplitudes change
    const { leftOffsetCentimeters, rightOffsetCentimeters } = calculateOffsetsSitting(
        parseFloat(leftAmplitude) || 0, 
        parseFloat(rightAmplitude) || 0
        );
    onUpdate({ leftOffsetCentimeters, rightOffsetCentimeters });
  }, [leftAmplitude, rightAmplitude]);

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel htmlFor="leftAmplitude">Left Side Amplitude (cm)</FormLabel>
        <Input
          id="leftAmplitude"
          type="number"
          name="leftAmplitude"
          value={leftAmplitude}
          onChange={(e) => setLeftAmplitude(e.target.value === '' ? '' : parseFloat(e.target.value))}
          onBlur={(e) => {setLeftAmplitude(parseFloat(e.target.value) || 0)}}
          min="0"
          placeholder="Left Side Amplitude in cm"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="rightAmplitude">Right Side Amplitude (cm)</FormLabel>
        <Input
          id="rightAmplitude"
          type="number"
          name="rightAmplitude"
          value={rightAmplitude}
          onChange={(e) => setRightAmplitude(e.target.value === '' ? '' : parseFloat(e.target.value))}
          onBlur={(e) => {setRightAmplitude(parseFloat(e.target.value) || 0)}}
          min={0}
          placeholder="Right Side Amplitude in cm"
        />
      </FormControl>
    </VStack>
  );
}

export function SittingAmplitudeInputs({ onUpdate }) {
    const [leftAmplitude, setLeftAmplitude] = useState(0); // in degrees
    const [rightAmplitude, setRightAmplitude] = useState(0); // in degrees
  
    useEffect(() => {
      // Calculate and update offsets when amplitudes or trunk height change
      const { leftOffsetCentimeters, rightOffsetCentimeters } = calculateOffsetsStanding(
        parseFloat(leftAmplitude) || 0, 
        parseFloat(rightAmplitude) || 0    );
      onUpdate({ leftOffsetCentimeters, rightOffsetCentimeters });
    }, [leftAmplitude, rightAmplitude]);
  
    return (
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="leftAmplitude">Left Side Amplitude (degrees)</FormLabel>
          <Input
            id="leftAmplitude"
            type="number"
            name="leftAmplitude"
            value={leftAmplitude}
            onChange={(e) => setLeftAmplitude(e.target.value === '' ? '' : parseFloat(e.target.value))}
            onBlur={(e) => {setLeftAmplitude(parseFloat(e.target.value) || 0)}}
            min="0"
            max="90"
            placeholder="Left Side Amplitude in degrees"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="rightAmplitude">Right Side Amplitude (degrees)</FormLabel>
          <Input
            id="rightAmplitude"
            type="number"
            name="rightAmplitude"
            value={rightAmplitude}
            onChange={(e) => setRightAmplitude(e.target.value === '' ? '' : parseFloat(e.target.value))}
            onBlur={(e) => {setRightAmplitude(parseFloat(e.target.value) || 0)}}
            min="0"
            max="90"
            placeholder="Right Side Amplitude in degrees"
          />
        </FormControl>
        
      </VStack>
    );
}
