import { Box, VStack, HStack, Text, Modal, Button, Input } from 'native-base';
import { Alert } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateActualGrade } from '../redux/courseSlice';
import { DetailGradeItemProps } from '../types/index';
import { updateGradeActualScore } from '../database/localdb';
import { getLetterForGrade, getWeighted } from '../utils/gradesCalculation';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  EMPTY_GRADE_INPUT,
  EXCEED_MAX_GRADE,
  GENERIC_INVALID_GRADE_INPUT,
  NEGATIVE_GRADE_INPUT,
} from '../utils/errorMessages';

function DetailGradeItem({ grade, showWeighted }: DetailGradeItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualScore, setActualScore] = useState(grade.data.actualScore?.toString());
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    if (actualScore === undefined || actualScore.length === 0) {
      Alert.alert('Error', EMPTY_GRADE_INPUT);
      return;
    }

    const inputGrade = parseFloat(actualScore);

    if (inputGrade > grade.data.maxScore) {
      Alert.alert('Error', EXCEED_MAX_GRADE);
      return;
    }

    if (inputGrade < 0) {
      Alert.alert('Error', NEGATIVE_GRADE_INPUT);
      return;
    }

    if (isNaN(inputGrade)) {
      Alert.alert('Error', GENERIC_INVALID_GRADE_INPUT);
      return;
    }

    try {
      const inputGradeString = inputGrade.toFixed(2);
      setActualScore(inputGradeString);
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
        <Box key={grade.id} bg="white" p={4} borderRadius="2xl">
          <HStack>
            <VStack flex="1" space="2">
              <Text fontWeight="bold" fontSize="md">
                {grade.data.name}:
              </Text>
              <Text color="coolGray.400" fontWeight="medium">
                Weight: {grade.data.weight.toString()}%
              </Text>
            </VStack>
            <VStack space="2" justifyContent="center">
              <HStack space={2} justifyContent="center">
                <Text fontWeight="bold">
                  {showWeighted ? getWeighted(grade) : grade.data.actualScore?.toString() ?? '-'}
                </Text>
                <Text color="coolGray.600">/</Text>
                <Text>
                  {showWeighted ? `${grade.data.weight}%` : grade.data.maxScore.toString()}
                </Text>
              </HStack>
              <Box alignSelf="flex-end">
                <CircularProgress
                  value={grade.data.actualScore ?? 0}
                  showProgressValue={false}
                  valueSuffix={`/${grade.data.maxScore}%`}
                  title={getLetterForGrade(grade)}
                  titleStyle={{ fontSize: 20 }}
                  maxValue={grade.data.maxScore}
                  radius={30}
                  activeStrokeWidth={4}
                  inActiveStrokeWidth={2}
                />
              </Box>
            </VStack>
          </HStack>
        </Box>
      </TouchableOpacity>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Enter Grade
            </Text>
            <Text>
              {grade.data.name}. Max Score: {grade.data.maxScore}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Enter Grade"
              value={actualScore?.toString() ?? ''}
              onChangeText={(text) => setActualScore(text)}
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
}

export default DetailGradeItem;
