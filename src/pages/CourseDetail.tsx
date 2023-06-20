import { VStack, Text, ScrollView, HStack, Heading, Progress, Box } from 'native-base';
import { useSelector } from 'react-redux';
import { selectCourseWithId, selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import DetailGradeItem from '../components/DetailGradeItem';
import { useState } from 'react';
import { Switch } from 'react-native';
import {
  getCurrentGradeProgress,
  getEstimateAverageGrade,
  getPreLetterGrade,
} from '../utils/gradesCalculation';

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

  const {
    totalWeightCompleted,
    totalWeightAchieved,
    currentLetterGrade,
    percentage,
    allGradesCompleted,
  } = getCurrentGradeProgress(grades);
  const estimateAverageGrade = getEstimateAverageGrade(grades);
  const preLetterGrade = getPreLetterGrade(currentLetterGrade);

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
        <Box mt={4} mb={15}>
          {grades.some((grade) => grade.data.actualScore !== null) && (
            <>
              <Progress value={totalWeightAchieved} size="lg" colorScheme="teal" />
              <Text mt={2} fontWeight="bold" textAlign="center">
                Current Score: {totalWeightAchieved.toFixed(2)} / {totalWeightCompleted.toFixed(2)}{' '}
                ({percentage !== 0 ? percentage.toFixed(2) + '%' : 'N/A'})
              </Text>
              <Text mt={2} fontWeight="bold" textAlign="center">
                Current performance: {currentLetterGrade}
              </Text>
              {!allGradesCompleted && (
                <>
                  {currentLetterGrade !== 'A+' && (
                    <Text mt={2} fontWeight="bold" textAlign="center">
                      Average score to achieve {preLetterGrade.preLetter}:{' '}
                      {estimateAverageGrade[preLetterGrade.preLetter] !== -1
                        ? estimateAverageGrade[preLetterGrade.preLetter]?.toFixed(2)
                        : 'N/A'}
                      %
                    </Text>
                  )}
                  <Text mt={2} fontWeight="bold" textAlign="center">
                    Average score to maintain {currentLetterGrade}:{' '}
                    {estimateAverageGrade[currentLetterGrade] !== -1
                      ? estimateAverageGrade[currentLetterGrade]?.toFixed(2)
                      : 'N/A'}
                    %
                  </Text>
                </>
              )}
            </>
          )}
        </Box>
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
        </ScrollView>
      </VStack>
    </VStack>
  );
}
