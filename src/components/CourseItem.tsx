import { Box, HStack, VStack, Text } from 'native-base';
import type { CourseItemProps } from '../types';
import { TouchableOpacity } from 'react-native';

export default function CourseItem({ course, handleGoToCourseDetail }: CourseItemProps) {
  const handleOnPressCourse = () => {
    if (course) {
      handleGoToCourseDetail(course.id);
    }
  };

  if (course === null) {
    return <Box p="4" flex="1" m={1}></Box>;
  }

  return (
    <Box
      p="4"
      flex="1"
      m={1}
      borderRadius="8"
      _light={{
        bg: 'white',
      }}
      _dark={{
        bg: 'coolGray.800',
      }}
    >
      <TouchableOpacity onPress={handleOnPressCourse}>
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="gray.800"
              bold
            >
              {course.data.name}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {course.data.courseCode}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
