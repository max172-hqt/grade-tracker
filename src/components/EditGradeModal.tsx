import { Modal, Text, Button, Input, VStack } from 'native-base';
import type { EditGradeModalProps } from '../types';
import { useState } from 'react';
import { Alert } from 'react-native';

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
    setName(value.trim());
  };

  const handleMaxScoreChange = (value: string) => {
    setMaxScore(value.trim());
  };

  const handleWeightChange = (value: string) => {
    setWeight(value.trim());
  };

  const handleSavePressed = () => {
    const inputMaxScore = parseFloat(maxScore);
    const inputWeight = parseFloat(weight);

    if (isNaN(inputWeight) || isNaN(inputMaxScore)) {
      Alert.alert('Error', 'Input value must be numeric. Please try again.');
      return;
    }

    if (Math.sign(inputWeight) === -1 || Math.sign(inputMaxScore) === -1) {
      Alert.alert('Invalid Input', 'Negative number is not allowed.');
      return;
    }
    if (inputMaxScore === 0 || inputWeight === 0) {
      Alert.alert('Invalid Input', ' Zero value is not allowed.');
      return;
    }

    if (!isNaN(+name)) {
      Alert.alert('Invalid Input', 'Please provide short description for the component');
      return;
    }

    if (inputWeight >= 100) {
      Alert.alert('Invalid Input', 'Grade  weight component must be less than 100');
      return;
    }

    if (!/[0-9a-zA-Z]/.test(name)) {
      Alert.alert('Invalid Input', 'Only number and letters are accepted for Name');
      return;
    }

    onSavePressed(name, inputMaxScore, inputWeight);
    // Reset the value
    setName(grade ? name : '');
    setWeight(grade ? weight : '');
    setMaxScore(grade ? maxScore : '');
    onCloseModal();
  };

  const handleCloseModal = () => {
    onCloseModal();
    // Reset the value
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
