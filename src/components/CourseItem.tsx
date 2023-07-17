import { Box, HStack, VStack, Text } from 'native-base';
import type { CourseItemProps } from '../types';
import { TouchableOpacity } from 'react-native';
import type { Grade, GradeData } from '../types';
import {
  getCurrentGradeProgress,
  getEstimateAverageGrade,
  getNextLetterGrade,
  getTotalCourseWeight,
  getLetterGrade,
} from '../utils/gradesCalculation';
import currentLetterGrade from '../components/CourseSummary';

export default function CourseItem({ course, handleGoToCourseDetail }: CourseItemProps) {
  const handleOnPressCourse = () => {
    if (course) {
      handleGoToCourseDetail(course.id);
    }
  };

  if (course === null) {
    return <Box p="4" flex="1" m={1}></Box>;
  }

  // const {
  //   totalWeightCompleted,
  //   totalWeightAchieved,
  //   currentLetterGrade: computedLetterGrade,
  //   allGradesCompleted,
  //   percentage,
  // } = getCurrentGradeProgress(gradeData);

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
      <TouchableOpacity onPress={handleOnPressCourse}>
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
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              Units: {course.data.units}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              Letter Grade: {course.data.letterGrade}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
