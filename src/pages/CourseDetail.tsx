import { Box, HStack, VStack, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));
  console.log(course);
  return (
    <Box p="4">
      <VStack space="4">
        {course.map((grade) => (
          <Box key={grade.id} bg="white" p="4" borderRadius="md" shadow={2}>
            <HStack justifyContent="space-between">
              <HStack>
                <Box fontWeight="bold">{grade.data.name}</Box>
                <Text> : </Text>
                <Box>{grade.data.actualScore}</Box>
              </HStack>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Weight: {grade.data.weight}%
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
