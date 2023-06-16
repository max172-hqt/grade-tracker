import { Box, VStack, Text, ScrollView, Progress } from 'native-base';
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

  let totalScore = 0;
  grades.forEach((grade) => {
    if (grade.data.actualScore && grade.data.weight) {
      totalScore += grade.data.actualScore * grade.data.weight * 0.01;
    }
  });

  const percentage = (totalScore / 100) * 100;
  const remainingScore = Math.max(50 - totalScore, 0);

  let letterGrade = '';
  if (percentage >= 90) {
    letterGrade = 'A+';
  } else if (percentage >= 80) {
    letterGrade = 'A';
  } else if (percentage >= 75) {
    letterGrade = 'B+';
  } else if (percentage >= 70) {
    letterGrade = 'B';
  } else if (percentage >= 65) {
    letterGrade = 'C+';
  } else if (percentage >= 60) {
    letterGrade = 'C';
  } else if (percentage >= 55) {
    letterGrade = 'D+';
  } else if (percentage >= 50) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
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
            <CourseGradeItem key={grade.id} grade={grade} />
          ))}
        </VStack>
        <Box mt={4} mb={20}>
          <Progress value={percentage} size="lg" colorScheme="teal" />
          <Text mt={2} fontWeight="bold" textAlign="center">
            Current Score: {totalScore.toFixed(2)} / 100 ({percentage.toFixed(2)}
            %)
          </Text>
          {remainingScore > 0 && (
            <Text mt={2} fontWeight="bold" textAlign="center" color="red.500">
              Remaining Score to Pass: {remainingScore.toFixed(2)}
            </Text>
          )}
          <Text mt={2} fontWeight="bold" textAlign="center">
            Letter Grade: {letterGrade}
          </Text>
        </Box>
      </ScrollView>
    </Box>
  );
}
