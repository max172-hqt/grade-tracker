import { Box, VStack, Text, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { selectCourseWithId, selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import DetailGradeItem from '../components/DetailGradeItem';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectCourseWithId(state, courseId));
  const grades = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));

  if (!course) {
    return null;
  }

  return (
    <Box p={4}>
      <VStack space="2" mb="4">
        <Text fontSize="lg" fontWeight="bold">
          {course.data.name}
        </Text>
        <Text color="coolGray.600">Course Code: {course.data.courseCode}</Text>
      </VStack>
      <ScrollView>
        <VStack space={4}>
          {grades.map((grade) => (
            <DetailGradeItem key={grade.id} grade={grade} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
