import { Box, Divider, HStack, Heading, Text, VStack } from 'native-base';
import type { Course, Grade } from '../types';
import {
  getCurrentGradeProgress,
  getEstimateAverageGrade,
  getNextLetterGrade,
  getTotalCourseWeight,
} from '../utils/gradesCalculation';
import CircularProgress from 'react-native-circular-progress-indicator';
import { gradeColors } from '../utils/colors';

export default function CourseSummary({ grades, course }: { grades: Grade[]; course: Course }) {
  const {
    totalWeightCompleted,
    totalWeightAchieved,
    currentLetterGrade,
    allGradesCompleted,
    percentage,
  } = getCurrentGradeProgress(grades);

  const estimateAverageGrade = getEstimateAverageGrade(grades);

  const nextLetterGrade = getNextLetterGrade(currentLetterGrade);

  const averageNextLetter =
    nextLetterGrade && estimateAverageGrade[nextLetterGrade] !== -1
      ? estimateAverageGrade[nextLetterGrade].toFixed(2) + '%'
      : 'N/A';

  const avarageMaintainLetter =
    currentLetterGrade != 'F' && estimateAverageGrade[currentLetterGrade] !== -1
      ? estimateAverageGrade[currentLetterGrade].toFixed(2) + '%'
      : 'N/A';

  return (
    <Box
      p="4"
      borderRadius="2xl"
      _dark={{
        bg: 'coolGray.800',
      }}
      _light={{
        bg: 'white',
      }}
    >
      <VStack mb={2}>
        <Text fontWeight="bold" fontSize="lg" isTruncated>
          {course.data.name}
        </Text>
        <Text
          color="coolGray.400"
          _dark={{
            color: 'coolGray.300',
          }}
          fontWeight="medium"
          isTruncated
        >
          Code: {course.data.courseCode}
        </Text>
        <Text
          color="coolGray.400"
          _dark={{
            color: 'coolGray.300',
          }}
          fontWeight="medium"
        >
          Units: {course.data.units}
        </Text>
      </VStack>
      <HStack alignItems="center" mb={4}>
        <VStack flex="1">
          <HStack space="2">
            <Heading fontSize="6xl" fontWeight="bold" color={gradeColors[currentLetterGrade]}>
              {currentLetterGrade}
            </Heading>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'coolGray.400',
              }}
              alignSelf="flex-end"
              position="relative"
              bottom={4}
              fontWeight="medium"
            >
              {totalWeightAchieved.toFixed(2)} / {Math.min(100, totalWeightCompleted).toFixed(0)} (
              {percentage.toFixed(2)}%)
            </Text>
          </HStack>
          <Text
            color="coolGray.400"
            _dark={{
              color: 'coolGray.300',
            }}
            fontWeight="medium"
          >
            Overall Performance
          </Text>
        </VStack>
        <VStack justifyContent="center" alignItems="flex-end">
          <Box flex="1" pt="2" alignSelf="center">
            <CircularProgress
              value={totalWeightCompleted}
              showProgressValue={false}
              title={`${totalWeightCompleted.toFixed(2)}`}
              titleStyle={{ fontSize: 16 }}
              maxValue={getTotalCourseWeight(grades)}
              radius={30}
              activeStrokeWidth={4}
              inActiveStrokeWidth={2}
            />
          </Box>
          <Text
            color="coolGray.400"
            _dark={{
              color: 'coolGray.300',
            }}
            fontWeight="medium"
          >
            % Completion
          </Text>
        </VStack>
      </HStack>

      {!allGradesCompleted && (
        <>
          <Divider />

          <VStack mt={4}>
            <Text
              color="coolGray.400"
              _dark={{
                color: 'coolGray.300',
              }}
              fontWeight="medium"
              textAlign="center"
            >
              You will need an avarage of
            </Text>
            <HStack flex="1">
              {currentLetterGrade !== 'A+' && (
                <VStack flex="1" justifyContent="center" space={2} alignItems="center" padding={4}>
                  <Heading fontWeight="bold">{averageNextLetter}</Heading>
                  <Text>to achieve {nextLetterGrade}</Text>
                </VStack>
              )}
              {currentLetterGrade !== 'F' && (
                <VStack flex="1" justifyContent="center" space={2} alignItems="center" padding={4}>
                  <Heading fontWeight="bold">{avarageMaintainLetter}</Heading>
                  <Text>to maintain {currentLetterGrade}</Text>
                </VStack>
              )}
            </HStack>
            <Text
              color="coolGray.400"
              fontWeight="medium"
              textAlign="center"
              _dark={{
                color: 'coolGray.300',
              }}
            >
              for the remaining of the course
            </Text>
          </VStack>
        </>
      )}
    </Box>
  );
}
