import React, { useState, useEffect } from 'react';
import { halfHeadWidthCentimeters } from '../helpers/constants';
import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

// External method for amplitude to offset conversion
const calculateOffsets = (leftAmplitude, rightAmplitude) => {
  const leftOffsetCms = -1 * rightAmplitude + halfHeadWidthCentimeters;
  const rightOffsetCms = -1 * leftAmplitude + halfHeadWidthCentimeters;
  return { leftOffsetCentimeters: leftOffsetCms, rightOffsetCentimeters: rightOffsetCms };
};

export function StandingAmplitudeInputs({ onUpdate }) {
  const [leftAmplitude, setLeftAmplitude] = useState(0);
  const [rightAmplitude, setRightAmplitude] = useState(0);

  useEffect(() => {
    // Calculate and update offsets when amplitudes change
    const { leftOffsetCentimeters, rightOffsetCentimeters } = calculateOffsets(leftAmplitude, rightAmplitude);
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
          onChange={(e) => setLeftAmplitude(parseFloat(e.target.value) || 0)}
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
          onChange={(e) => setRightAmplitude(parseFloat(e.target.value) || 0)}
          min="0"
          placeholder="Right Side Amplitude in cm"
        />
      </FormControl>
    </VStack>
  );
}

export function SittingAmplitudeInputs() {
    return (
        <>
        Sitting Amplitude input
        </>
    )
}
