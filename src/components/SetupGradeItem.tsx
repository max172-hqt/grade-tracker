import { useState } from 'react';
import { Box, HStack, Text, IconButton, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { SetupGradeItemProps } from '../types';
import EditGradeModal from './EditGradeModal';

export default function SetupGradeItem({
  tempId,
  grade,
  handleUpdateGrade,
  handleDeleteGrade,
  handleAddGrade,
}: // handleEditGradeItem,
// handleAddGradeItem,
SetupGradeItemProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSaveChanges = (name: string, maxScore: string, weight: string) => {
    console.log({ name, maxScore, weight });
    setShowModal(false);
    handleUpdateGrade(tempId, {
      ...grade,
      name,
      maxScore: Number(maxScore),
      weight: Number(weight),
    });
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
          onPress={() => setShowModal(true)}
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
      <EditGradeModal
        grade={grade}
        isModalOpen={showModal}
        handleCloseModal={() => setShowModal(false)}
        handleSaveChanges={handleSaveChanges}
      />
    </Box>
  );
}
