import { useEffect, useState, useRef, useCallback } from 'react';
import { Modal, Input, Button, Box, HStack, Text, IconButton, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { GradeItemProps } from '../types';

export default function GradeItem({
  tempId,
  grade,
  handleUpdateGrade,
  handleDeleteGrade,
  handleAddGrade,
}: // handleEditGradeItem,
// handleAddGradeItem,
GradeItemProps) {
  const [showModal, setShowModal] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [iName, setIName] = useState('');
  const [iMaxScore, setIMaxScore] = useState(0);
  const [iWeight, setIWeight] = useState(0);
  const handleEditGradeItem = (tempId: number, name: string, weight: number, maxScore: number) => {
    console.log('Edit Add Course');
    // console.log(gradeData[id].name);
    console.log(grade.name);
    console.log(grade.weight);
    console.log(grade.maxScore);
    // setCurrIndex(id);
    // setIName(gradeData[id].name);
    // setIMaxScore(gradeData[id].maxScore);
    // setIWeight(gradeData[id].weight);

    setShowModal(!showModal);
  };

  return (
    <Box mb={2} pb={2} borderBottomWidth="1" borderBottomColor="coolGray.300">
      <HStack justifyContent="space-between" alignItems="center">
        <VStack width="100%" flexShrink={1} textAlign="left">
          <Text bold>{grade.name}</Text>
          <HStack space={4}>
            <Text color="coolGray.600">Weight: {grade.weight}%</Text>
            <Text color="coolGray.600">Max Score: {grade.maxScore}</Text>
          </HStack>
        </VStack>
        <IconButton
          colorScheme="indigo"
          variant="unstyled"
          _icon={{
            as: Ionicons,
            name: 'create-outline',
          }}
          // onPress={() => console.log('Edit')}
          onPress={() => handleEditGradeItem(tempId, grade.name, grade.weight, grade.maxScore)}
        />
        <IconButton
          colorScheme="indigo"
          variant="unstyled"
          _icon={{
            as: Ionicons,
            name: 'trash',
          }}
          onPress={() => handleDeleteGrade(tempId)}
        />
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Updating Values</Modal.Header>
          <Modal.Body>
            <Text>Name</Text>
            <Input
              // placeholder={gradeData[currIndex].name.toString()}
              placeholder={grade.name.toString()}
              w={48}
              // value={iName}
              // onChangeText={handleUpdateItemName}
            />
            <Text>Max Score</Text>
            <Input
              // placeholder={gradeData[currIndex].maxScore.toString()}
              placeholder={grade.maxScore.toString()}
              w={24}
              // value={iMaxScore}
              // onChangeText={(value) => handleUpdateItemMaxScore(value)}
            />
            <Text>Weight</Text>
            <Input
              // placeholder={gradeData[currIndex].weight.toString()}
              placeholder={grade.weight.toString()}
              // value={iWeight}
              w={24}
              // onChangeText={handleUpdateItemWeight}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  // handleUpdateGradeData(currIndex);
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
