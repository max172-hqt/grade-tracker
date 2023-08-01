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
}: SetupGradeItemProps) {
  const [showModal, setShowModal] = useState(false);

  const onSavePressed = (name: string, maxScore: number, weight: number) => {
    handleUpdateGrade(tempId, {
      ...grade,
      name,
      maxScore,
      weight,
    });
  };

  return (
    <Box
      mb={2}
      pb={2}
      borderBottomWidth="1"
      borderBottomColor="coolGray.300"
      _dark={{
        borderBottomColor: 'coolGray.500',
      }}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack width="100%" flexShrink={1} textAlign="left" space={2}>
          <Text fontWeight="medium" fontSize="md">
            {grade.name}
          </Text>
          <HStack space={4}>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'coolGray.400',
              }}
            >
              Weight: {grade.weight.toFixed(2)}%
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'coolGray.400',
              }}
            >
              Max Score: {grade.maxScore}
            </Text>
          </HStack>
        </VStack>
        <IconButton
          _icon={{
            as: Ionicons,
            name: 'create-outline',
            color: 'coolGray.500',
            _dark: {
              color: 'coolGray.300',
            },
          }}
          onPress={() => setShowModal(true)}
        />
        <IconButton
          colorScheme="red"
          _icon={{
            as: Ionicons,
            name: 'trash',
          }}
          onPress={() => handleDeleteGrade(tempId)}
        />
      </HStack>
      <EditGradeModal
        grade={grade}
        title="Edit Grade"
        isModalOpen={showModal}
        onCloseModal={() => setShowModal(false)}
        onSavePressed={onSavePressed}
      />
    </Box>
  );
}
