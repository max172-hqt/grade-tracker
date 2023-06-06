import { Box, HStack, VStack, Text } from 'native-base';
import type { CourseItemProps } from '../types';
import { Pressable } from 'react-native';

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
      background="white"
      p="4"
      flex="1"
      m={1}
      borderRadius="8"
      borderWidth="1"
      borderColor="gray.300"
    >
      <Pressable onPress={handleOnPressCourse}>
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="coolGray.800"
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
      </Pressable>
    </Box>
  );
}
