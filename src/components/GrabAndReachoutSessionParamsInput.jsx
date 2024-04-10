import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Button,
  HStack,
  Text
} from '@chakra-ui/react';
import { grabAndReachoutPresets } from '../helpers/sessionParamsPresets';
import { AdvancedGrabAndReachoutInputs } from './AdvancedGrabAndReachoutInputs';
import { extractHandDirection } from '../helpers/methods';

export function GrabAndReachoutSessionParamsInput({ onChange }) {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [sessionParams, setSessionParams] = useState({
    targetHand: "RIGHT",
    reps: 10,
    module: "Sideways", // Assume "Sideways" is the default
    // Initial presets based on default module
    ...grabAndReachoutPresets["Sideways-RIGHT"]
  });

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    console.log("inside handle params change. ", name, value)
    setSessionParams((prev) => ({
      ...prev,
      [name]: value
    }));

    // For module change, update presets based on the selected module
    if (name === 'module') {
      const moduleData = grabAndReachoutPresets[value] || {};
      console.log("******", moduleData);
      setSessionParams((prev) => ({
        ...prev,
        boxes: moduleData.boxes,
        spheres: moduleData.spheres,
        targetHand: extractHandDirection(value)
      }));
    }
    console.log("session params inside handle change.", sessionParams)
  };

  // Invoke onChange every time sessionParams changes
  useEffect(() => {
    onChange(sessionParams);
    console.log(sessionParams);
  }, [sessionParams]);

  return (
    <Box>
      <Checkbox isChecked={advancedMode} onChange={(e) => setAdvancedMode(e.target.checked)}>
        Advanced Mode
      </Checkbox>
      {!advancedMode ? (
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Reps</FormLabel>
            <Input type="number" name="reps" value={sessionParams.reps} min={1} onChange={handleParamChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Module</FormLabel>
            <Select name="module" value={sessionParams.module} onChange={handleParamChange}>
              {/* Render options dynamically based on available presets */}
              {Object.keys(grabAndReachoutPresets).map((module) => (
                <option key={module} value={module}>{module}</option>
              ))}
            </Select>
          </FormControl>
        </VStack>
      ) : <AdvancedGrabAndReachoutInputs sessionParams={sessionParams} setSessionParams={setSessionParams} />}
    </Box>
  );
}
