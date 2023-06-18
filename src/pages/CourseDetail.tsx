import { VStack, Text, ScrollView, HStack, Heading, Progress, Box } from 'native-base';
import { useSelector } from 'react-redux';
import { selectCourseWithId, selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import DetailGradeItem from '../components/DetailGradeItem';
import { useState } from 'react';
import { Switch } from 'react-native';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectCourseWithId(state, courseId));
  const grades = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));
  const [showWeighted, setShowWeighted] = useState(false);

  const handleToggleShowWeighted = () => {
    setShowWeighted(!showWeighted);
  };

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
    <VStack flex="1">
      <VStack
        space="2"
        p="4"
        bg={{
          linearGradient: {
            colors: ['violet.800', 'lightBlue.300'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        {/* TODO: Customize color based on the current grade */}
        <Heading size="md" fontWeight="bold" color="white">
          {course.data.name}
        </Heading>
        <Text color="coolGray.200" fontSize="md" fontWeight="bold">
          Course Code: {course.data.courseCode}
        </Text>
      </VStack>
      <VStack p={4} space={4} flex="1">
        <HStack>
          <Text fontSize="xl" fontWeight="bold" flex="1">
            Grades
          </Text>
          <HStack alignItems="center" space="2">
            <Text fontWeight="bold" color="gray.500">
              Show Weighted
            </Text>
            <Switch value={showWeighted} onValueChange={handleToggleShowWeighted} />
          </HStack>
        </HStack>
        <ScrollView>
          <VStack space={4} flex="1">
            {grades.map((grade) => (
              <DetailGradeItem key={grade.id} grade={grade} showWeighted={showWeighted} />
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
      </VStack>
    </VStack>
  );
}
