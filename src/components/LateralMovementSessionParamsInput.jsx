import React, { useState, useEffect } from 'react';
import { SittingAmplitudeInputs, StandingAmplitudeInputs } from './AmplitudeInputComponents';
import { Button, Box, FormControl, FormLabel, Input, Select, Checkbox, Text, VStack, Heading, IconButton } from '@chakra-ui/react';

const speedMapping = { low: 2, medium: 3, high: 5 };

export function LateralMovementSessionParamsInput({ onChange }) {
  const [posture, setPosture] = useState('standing');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sessionParams, setSessionParams] = useState({
    duration: 60,
    cubeGap: 5,
    speed: 3,
    isStanding: true,
    targetSide: "BOTH",
    rightOffsetCentimeters: 15,
    leftOffsetCentimeters: 15,
    cubeScaleDecimeters: 12,
    spawningDistanceMetres: 12,
    spawnHeightDecimetres: 12,
    zThresholdInMetres: 7,
    environment:0,
  });
  const handleAmplitudeOffsetsUpdate = (updatedOffsets) => {
    console.log(updatedOffsets);
    setSessionParams((prev) => ({
      ...prev,
      ...updatedOffsets
    }));
    // Ensure the updated session parameters are communicated upstream
    onChange({
      ...sessionParams,
      ...updatedOffsets
    });
  };

  useEffect(() => {
    // Call onChange with the default session parameters when the component mounts
    onChange(sessionParams);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    let actualValue = value;

    if (name === 'speed') {
      actualValue = speedMapping[value];
    } else if (name === 'posture') {
      actualValue = value === 'standing';
      setPosture(value); // Update local posture state
    }

    const updatedParams = { ...sessionParams, [name]: actualValue };

    if (name === 'posture') {
      updatedParams.isStanding = actualValue;
    }

    setSessionParams(updatedParams);
    onChange(updatedParams); // Immediately update parent component
  };

  return (

    <Box
      w={{ base: "100%", lg: "100%" }}
      p={8}
      boxShadow="md"
      rounded="lg"
      m="auto"
      mt={{ base: 4, lg: 8 }}
    >
      <FormControl>
        <FormLabel htmlFor="duration">Duration (secs)</FormLabel>
        <Input
          id="duration"
          type="number"
          name="duration"
          min="30"
          value={sessionParams.duration}
          onChange={handleParamChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="targetSide">Target Side</FormLabel>
        <Select
          id="targetSide"
          name="targetSide"
          value={sessionParams.targetSide}
          onChange={handleParamChange}
        >
          <option value="LEFT">Left</option>
          <option value="RIGHT">Right</option>
          <option value="BOTH">Both</option>
        </Select>
      </FormControl>
      
      <FormControl>
        <FormLabel htmlFor="environment">Environment</FormLabel>
        <Select
          id="environment"
          name="environment"
          value={sessionParams.environment}
          onChange={handleParamChange}
        >
          <option value={0}>Black Sky</option>
          <option value={1}>Cludy Night</option>
          <option value={2}>Pink Nebula</option>
          <option value={3}>Green Nebula</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="cubeGap">Cube Gap (secs)</FormLabel>
        <Input
          id="cubeGap"
          type="number"
          name="cubeGap"
          min="0"
          value={sessionParams.cubeGap}
          onChange={handleParamChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="speed">Speed</FormLabel>
        <Select
          id="speed"
          name="speed"
          value={Object.keys(speedMapping).find(key => speedMapping[key] === sessionParams.speed)}
          onChange={handleParamChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="posture">Posture</FormLabel>
        <Select
          id="posture"
          name="posture"
          value={posture}
          onChange={(e) => { setPosture(e.target.value); handleParamChange(e); }}
        >
          <option value="standing">Standing</option>
          <option value="sitting">Sitting</option>
        </Select>
      </FormControl>

      {posture === 'sitting' ? (
        <SittingAmplitudeInputs onUpdate={handleAmplitudeOffsetsUpdate} />
      ) : (
        <StandingAmplitudeInputs onUpdate={handleAmplitudeOffsetsUpdate}/>
      )}

      <FormControl display="flex" alignItems="center">
        <Checkbox isChecked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} mr={2} />
        <FormLabel mb="0">Set Advanced Parameters</FormLabel>
      </FormControl>

      {showAdvanced && (
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="cubeScaleDecimeters">Cube Scale (dm)</FormLabel>
            <Input
              id="cubeScaleDecimeters"
              type="number"
              name="cubeScaleDecimeters"
              min="0"
              value={sessionParams.cubeScaleDecimeters}
              onChange={handleParamChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="spawningDistanceMetres">Spawning Distance (m)</FormLabel>
            <Input
              id="spawningDistanceMetres"
              type="number"
              name="spawningDistanceMetres"
              min="0"
              value={sessionParams.spawningDistanceMetres}
              onChange={handleParamChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="spawnHeightDecimetres">Spawn Height (dm)</FormLabel>
            <Input
              id="spawnHeightDecimetres"
              type="number"
              name="spawnHeightDecimetres"
              min="0"
              value={sessionParams.spawnHeightDecimetres}
              onChange={handleParamChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="zThresholdInMetres">Z Threshold (m)</FormLabel>
            <Input
              id="zThresholdInMetres"
              type="number"
              name="zThresholdInMetres"
              min="0"
              value={sessionParams.zThresholdInMetres}
              onChange={handleParamChange}
            />
          </FormControl>
        </VStack>
      )}
    </Box>
  );

}
