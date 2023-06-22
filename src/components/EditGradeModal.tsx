import { Modal, Text, Button, Input } from 'native-base';
import type { EditGradeModalProps } from '../types';
import { useState } from 'react';

export default function EditGradeModal({
  grade,
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
    // TODO: Check valid
    setMaxScore(value);
  };

  const handleWeightChange = (value: string) => {
    // TODO: Check valid
    setWeight(value);
  };

  const handleSavePressed = () => {
    setName('');
    setWeight('');
    setMaxScore('');
    onSavePressed(name, maxScore, weight);
  };

  const handleCloseModal = () => {
    setName('');
    setWeight('');
    setMaxScore('');
    onCloseModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.Header>Updating Values</Modal.Header>
        <Modal.Body>
          <Text>Name</Text>
          <Input placeholder={name} w={48} value={name} onChangeText={handleNameChange} />
          <Text>Max Score</Text>
          <Input
            placeholder={maxScore}
            w={24}
            value={maxScore}
            onChangeText={(value) => handleMaxScoreChange(value)}
          />
          <Text>Weight</Text>
          <Input placeholder={weight} value={weight} w={24} onChangeText={handleWeightChange} />
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
