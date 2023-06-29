import { Modal, Text, Button, Input, VStack } from 'native-base';
import type { EditGradeModalProps } from '../types';
import { useState } from 'react';
import { Alert } from 'react-native';
import {
  EMPTY_DESCRIPTION,
  MUST_BE_GREATER_THAN_ZEO_GRADE_INPUT,
  MUST_BE_LESS_THAN_100,
  MUST_BE_LETTERS_AND_NUMBERS,
  NOT_A_NUMBER_INPUT,
} from '../utils/errorMessages';

export default function EditGradeModal({
  grade,
  title,
  isModalOpen,
  onCloseModal,
  onSavePressed,
}: EditGradeModalProps) {
  const [name, setName] = useState(grade?.name ?? '');
  const [maxScore, setMaxScore] = useState(grade?.maxScore.toString() ?? '');
  const [weight, setWeight] = useState(grade?.weight.toString() ?? '');

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleMaxScoreChange = (value: string) => {
    setMaxScore(value);
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
  };

  const handleSavePressed = () => {
    const inputMaxScore = parseFloat(maxScore);
    const inputWeight = parseFloat(weight);

    if (isNaN(inputWeight) || isNaN(inputMaxScore)) {
      Alert.alert('Error', NOT_A_NUMBER_INPUT);
      return;
    }

    if (inputWeight <= 0 || inputMaxScore <= 0) {
      Alert.alert('Invalid Input', MUST_BE_GREATER_THAN_ZEO_GRADE_INPUT);
      return;
    }

    if (inputWeight >= 100) {
      Alert.alert('Invalid Input', MUST_BE_LESS_THAN_100);
      return;
    }

    if (!isNaN(+name)) {
      // Grade cannot be empty or contains numeric
      Alert.alert('Invalid Input', EMPTY_DESCRIPTION);
      return;
    }

    if (!/[0-9a-zA-Z]/.test(name)) {
      Alert.alert('Invalid Input', MUST_BE_LETTERS_AND_NUMBERS);
      return;
    }

    onSavePressed(name, inputMaxScore, inputWeight);

    // Set to new value or empty if the form did not previously tie to a grade
    setName(grade ? name : '');
    setWeight(grade ? weight : '');
    setMaxScore(grade ? maxScore : '');
    onCloseModal();
  };

  const handleCloseModal = () => {
    onCloseModal();
    // Reset to previous value
    setName(grade?.name ?? '');
    setWeight(grade?.weight.toString() ?? '');
    setMaxScore(grade?.maxScore.toString() ?? '');
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <VStack space="2">
            <VStack space="1">
              <Text>Name</Text>
              <Input placeholder={name} w={48} value={name} onChangeText={handleNameChange} />
            </VStack>
            <VStack space="1">
              <Text>Max Score</Text>
              <Input
                placeholder={maxScore}
                w={24}
                value={maxScore}
                onChangeText={(value) => handleMaxScoreChange(value)}
              />
            </VStack>
            <VStack space="1">
              <Text>Weight</Text>
              <Input placeholder={weight} value={weight} w={24} onChangeText={handleWeightChange} />
            </VStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button onPress={handleSavePressed}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
