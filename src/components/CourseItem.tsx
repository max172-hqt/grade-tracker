import { Box, HStack, VStack, Text, useColorModeValue } from 'native-base';
import type { CourseItemProps } from '../types';
import { TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { gradeColorsHex, themeColors } from '../utils/colors';
import { selectGradesForCourseWithIdMemoized } from '../redux/courseSlice';
import { getCurrentGradeProgress } from '../utils/gradesCalculation';

export default function CourseItem({ course, handleGoToCourseDetail }: CourseItemProps) {
  if (course === null) {
    return <Box p="4" flex="1" m={1}></Box>;
  }

  const handleOnPressCourse = () => {
    if (course) {
      handleGoToCourseDetail(course.id);
    }
  };

  const grades = useSelector((state: RootState) =>
    selectGradesForCourseWithIdMemoized(state, course?.id),
  );
  const { currentLetterGrade, totalWeightCompleted } = getCurrentGradeProgress(grades);
  const progressColor = useColorModeValue('#e7e5e4', themeColors.dark.text);

  return (
    <TouchableOpacity onPress={handleOnPressCourse}>
      <Box
        p="4"
        borderRadius="2xl"
        _light={{
          bg: 'white',
        }}
        _dark={{
          bg: 'coolGray.800',
        }}
      >
        <HStack>
          <VStack flex="1">
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="gray.800"
              bold
              fontSize="lg"
              maxW="5/6"
              isTruncated
            >
              {course.data.name}
            </Text>
            <HStack>
              <VStack>
                <Text
                  color="coolGray.400"
                  _dark={{
                    color: 'coolGray.300',
                  }}
                  fontWeight="medium"
                  maxW="5/6"
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
                  Number of Units: {course.data.units}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack justifyContent="center" alignItems="center">
            <Box>
              <CircularProgress
                value={totalWeightCompleted}
                showProgressValue={false}
                maxValue={100}
                title={currentLetterGrade}
                titleStyle={{ fontSize: 20 }}
                radius={30}
                activeStrokeWidth={4}
                inActiveStrokeWidth={2}
                activeStrokeColor={gradeColorsHex[currentLetterGrade]}
                inActiveStrokeColor={progressColor}
              />
            </Box>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
