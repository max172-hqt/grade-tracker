import { Box, VStack, Text, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import CourseGradeItem from '../components/CourseGradeItem';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));

  return (
    <Box p={2} mb={10}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {course.length > 0 ? `Course #${course[courseId].courseId}` : ''}
      </Text>
      <ScrollView>
        <VStack space={4}>
          {course.map((grade) => (
            <CourseGradeItem key={grade.id} grade={grade} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
