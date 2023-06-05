import { Box, VStack, Text, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { selectCourseWithId, selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import CourseGradeItem from '../components/CourseGradeItem';

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
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {course?.data.name}
      </Text>
      <ScrollView>
        <VStack space={4}>
          {grades.map((grade) => (
            <CourseGradeItem key={grade.id} grade={grade} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
