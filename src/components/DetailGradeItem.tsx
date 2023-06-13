import { Box, VStack, HStack, Text, Modal, Button, Input } from 'native-base';
import { Alert } from 'react-native';
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateActualGrade } from '../redux/courseSlice';
import { DetailGradeItemProps } from '../types/index';
import { updateGradeActualScore } from '../database/localdb';
import { getWeightedPercentage } from '../utils/gradesCalculation';
import { getLetterGrade } from '../utils/gradesCalculation';

function DetailGradeItem({ grade, showWeighted }: DetailGradeItemProps) {
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

    if (inputGrade < 0) {
      Alert.alert('Error', 'The entered grade must be greater than or equal to 0');
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

  const weightedGrade = useMemo(() => {
    if (grade.data.actualScore !== null) {
      const ans = ((grade.data.actualScore ?? 0) / grade.data.maxScore) * grade.data.weight;
      return ans.toFixed(2);
    }
    return '';
  }, [grade]);

  const letterGrade = useMemo(() => {
    if (grade.data.actualScore !== null) {
      return 'Grade: ' + getLetterGrade((grade.data.actualScore / grade.data.maxScore) * 100);
    }
    return '';
  }, [grade]);

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal}>
        <Box key={grade.id} bg="white" p={4} borderRadius="md">
          <HStack alignItems="center">
            <VStack flex="1" space="2">
              <Text fontWeight="bold" fontSize="md">
                {grade.data.name}:
              </Text>
              <Text color="coolGray.600" fontWeight="bold">
                Weight: {grade.data.weight.toString()}%
              </Text>
            </VStack>
            <VStack space="2">
              <HStack space={2}>
                <Text fontWeight="bold">
                  {showWeighted ? weightedGrade : grade.data.actualScore?.toString()}
                </Text>
                <Text color="coolGray.600">/</Text>
                <Text>
                  {showWeighted ? `${grade.data.weight}%` : grade.data.maxScore.toString()}
                </Text>
              </HStack>
              {showWeighted && (
                <Text alignSelf="flex-end" fontWeight="bold" color="coolGray.600">
                  {letterGrade}
                </Text>
              )}
            </VStack>
          </HStack>
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
}

export default DetailGradeItem;
