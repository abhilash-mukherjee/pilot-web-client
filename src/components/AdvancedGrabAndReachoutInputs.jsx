import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    IconButton,
    useToast,
    Select,
    Flex,
    Text
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export function AdvancedGrabAndReachoutInputs({ sessionParams, setSessionParams }) {
    const toast = useToast();

    const handleBoxChange = (index, field, value) => {
        const updatedBoxes = [...sessionParams.boxes];
        updatedBoxes[index] = { ...updatedBoxes[index], [field]: value };
        setSessionParams({ ...sessionParams, boxes: updatedBoxes });
    };

    const handleSphereChange = (index, field, value) => {
        const updatedSpheres = [...sessionParams.spheres];
        updatedSpheres[index] = { ...updatedSpheres[index], [field]: value };
        setSessionParams({ ...sessionParams, spheres: updatedSpheres });
    };

    const addBox = () => {
        const newBox = { boxX: 0, boxZ: 0, label: "", colorLight: "#FFFFFF", colorDark: "#000000" };
        setSessionParams({ ...sessionParams, boxes: [...sessionParams.boxes, newBox] });
        toast({
            title: "Box added",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    const addSphere = () => {
        const newSphere = { spawnCentreX: 0, spawnCentreZ: 0, zoneWidth: 0.2, color: "#FFFFFF", label: "" };
        setSessionParams({ ...sessionParams, spheres: [...sessionParams.spheres, newSphere] });
        toast({
            title: "Sphere added",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    const removeBox = (index) => {
        const updatedBoxes = [...sessionParams.boxes];
        updatedBoxes.splice(index, 1);
        setSessionParams({ ...sessionParams, boxes: updatedBoxes });
    };

    const removeSphere = (index) => {
        const updatedSpheres = [...sessionParams.spheres];
        updatedSpheres.splice(index, 1);
        setSessionParams({ ...sessionParams, spheres: updatedSpheres });
    };

    return (
        <Box pt={10}>
            <FormControl mb={4}>
                <FormLabel>Target Hand</FormLabel>
                <Select
                    value={sessionParams.targetHand}
                    onChange={(e) => setSessionParams({ ...sessionParams, targetHand: e.target.value })}
                >
                    <option value="LEFT">Left</option>
                    <option value="RIGHT">Right</option>
                </Select>
            </FormControl>
            <Flex flexDirection={'column'} w={'100%'} gap={10}>
                <Text fontSize={'1.2rem'} fontWeight={'500'}>Boxes</Text>
                {sessionParams.boxes.map((box, index) => (
                    <VStack key={`box-${index}`} spacing={2} alignItems="stretch" bgColor={'#f7fafc'} borderRadius={8} p={10}>
                        <HStack>
                            <FormControl>
                                <FormLabel>Box X Position</FormLabel>
                                <Input type="number" value={box.boxX} onChange={(e) => handleBoxChange(index, 'boxX', parseFloat(e.target.value))} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Box Z Position</FormLabel>
                                <Input type="number" value={box.boxZ} onChange={(e) => handleBoxChange(index, 'boxZ', parseFloat(e.target.value))} />
                            </FormControl>
                            <IconButton
                                aria-label="Remove box"
                                icon={<DeleteIcon />}
                                onClick={() => removeBox(index)}
                            />
                        </HStack>
                        <FormControl>
                            <FormLabel>Label</FormLabel>
                            <Input value={box.label} onChange={(e) => handleBoxChange(index, 'label', e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Color Light</FormLabel>
                            <Input type="color" value={box.colorLight} onChange={(e) => handleBoxChange(index, 'colorLight', e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Color Dark</FormLabel>
                            <Input type="color" value={box.colorDark} onChange={(e) => handleBoxChange(index, 'colorDark', e.target.value)} />
                        </FormControl>
                    </VStack>
                ))}
            </Flex>
            <Button onClick={addBox} leftIcon={<AddIcon />} colorScheme="blue" my={2} mb={10}>
                Add Box
            </Button>

            <Flex flexDirection={'column'} w={'100%'} gap={10} mt={10}>
                <Text fontSize={'1.2rem'} fontWeight={'500'}>Spheres</Text>
                {sessionParams.spheres.map((sphere, index) => (
                    <VStack key={`sphere-${index}`} spacing={2} alignItems="stretch" bgColor={'#f7fafc'} borderRadius={8} p={10}>
                        <HStack>
                            <FormControl>
                                <FormLabel>Sphere Spawn Centre X</FormLabel>
                                <Input type="number" value={sphere.spawnCentreX} onChange={(e) => handleSphereChange(index, 'spawnCentreX', parseFloat(e.target.value))} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Sphere Spawn Centre Z</FormLabel>
                                <Input type="number" value={sphere.spawnCentreZ} onChange={(e) => handleSphereChange(index, 'spawnCentreZ', parseFloat(e.target.value))} />
                            </FormControl>
                            <IconButton
                                aria-label="Remove sphere"
                                icon={<DeleteIcon />}
                                onClick={() => removeSphere(index)}
                            />
                        </HStack>
                        <FormControl>
                            <FormLabel>Zone Width</FormLabel>
                            <Input type="number" value={sphere.zoneWidth} onChange={(e) => handleSphereChange(index, 'zoneWidth', parseFloat(e.target.value))} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Color</FormLabel>
                            <Input type="color" value={sphere.color} onChange={(e) => handleSphereChange(index, 'color', e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Label</FormLabel>
                            <Input value={sphere.label} onChange={(e) => handleSphereChange(index, 'label', e.target.value)} />
                        </FormControl>
                    </VStack>
                ))}
            </Flex>
            <Button onClick={addSphere} leftIcon={<AddIcon />} colorScheme="green" my={2}>
                Add Sphere
            </Button>
        </Box>
    );
}
