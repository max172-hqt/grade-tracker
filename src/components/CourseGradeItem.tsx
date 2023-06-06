import React from 'react';
import { Box, VStack, HStack, Text, Modal, Button, Input } from 'native-base';
import { Alert } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateActualGrade } from '../redux/courseSlice';
import { Grade } from '../types/index';
import { updateGradeActualScore } from '../database/localdb';

interface CourseGradeItemProps {
  grade: Grade;
}

const CourseGradeItem: React.FC<CourseGradeItemProps> = ({ grade }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedActualGrade, setUpdatedActualGrade] = useState(grade.data.actualScore?.toString());
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!updatedActualGrade) return;

    const inputGrade = parseFloat(updatedActualGrade);

    if (inputGrade > grade.data.maxScore) {
      Alert.alert('Error', 'The entered grade exceeds the maximum score!');
      return;
    }

    if (isNaN(inputGrade)) {
      Alert.alert('Error', 'Input grade is not valid. Please try again.');
      return;
    }

    try {
      const inputGradeString = inputGrade.toFixed(2);
      setUpdatedActualGrade(inputGradeString);
      await updateGradeActualScore(grade.id, +inputGradeString);
      dispatch(updateActualGrade({ gradeId: grade.id, actualScore: +inputGradeString }));
      setIsModalOpen(false);
    } catch (error) {
      console.log('Failed to update grade', error);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal}>
        <Box key={grade.id} bg="white" p={4} borderRadius="md" shadow={2}>
          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">{grade.data.name}:</Text>
              <HStack space={2} alignItems="center">
                <Text fontWeight="bold">{grade.data.actualScore?.toString()}</Text>
                <Text color="coolGray.600">/</Text>
                <Text>{grade.data.maxScore.toString()}</Text>
              </HStack>
            </HStack>
            <HStack>
              <Text color="coolGray.600">Weight: {grade.data.weight.toString()}</Text>
              <Text color="coolGray.600">%</Text>
            </HStack>
          </VStack>
        </Box>
      </TouchableOpacity>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Grade</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Input Grade"
              value={updatedActualGrade?.toString() ?? ''}
              onChangeText={(text) => setUpdatedActualGrade(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button onPress={handleSaveChanges}>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CourseGradeItem;
