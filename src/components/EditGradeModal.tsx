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
    const inputName = name;

    if (isNaN(inputWeight) || isNaN(inputMaxScore)) {
      Alert.alert('Error', 'Input value must be numeric. Please try again.');
      return;
    } else if (Math.sign(inputWeight) === -1 || Math.sign(inputMaxScore) === -1) {
      Alert.alert('Invalid Input', 'Negative number is not allowed.');
      return;
    } else if (inputMaxScore === 0 || inputWeight === 0) {
      Alert.alert('Invalid Input', ' Zero value is not allowed.');
      return;
    }

    if (!isNaN(+inputName)) {
      Alert.alert('Invalid Input', 'Name should describe the component and not numeric only');
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
              <Input
                placeholder={weight}
                value={weight}
                w={24}
                onChangeText={handleWeightChange}
                maxLength={2}
              />
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
