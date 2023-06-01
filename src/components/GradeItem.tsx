import { Box, HStack, Text, IconButton } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { GradeItemProps } from '../types';

export default function GradeItem({
  tempId,
  grade,
  handleUpdateGrade,
  handleDeleteGrade,
  handleAddGrade,
}: GradeItemProps) {
  return (
    <Box>
      <HStack justifyContent="space-between" alignItems="center">
        <Text width="100%" flexShrink={1} textAlign="left">
          {grade.name}
        </Text>
        <IconButton
          colorScheme="indigo"
          variant="unstyled"
          _icon={{
            as: Ionicons,
            name: 'create-outline',
          }}
          onPress={() => console.log('Edit')}
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
    </Box>
  );
}
