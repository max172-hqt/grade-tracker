import { Box, HStack, VStack, Text } from 'native-base';
import type { CourseItemProps } from '../types';
import { TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

// import currentLetterGrade from '../components/CourseSummary';
// import CourseSummary from '../components/CourseSummary';

export default function CourseItem({ course, handleGoToCourseDetail }: CourseItemProps) {
  const handleOnPressCourse = () => {
    if (course) {
      handleGoToCourseDetail(course.id);
    }
  };

  if (course === null) {
    return <Box p="4" flex="1" m={1}></Box>;
  }
  console.log('Course item: course in Course Item');
  console.log(course);
  console.log(course.currLetGrade);

  return (
    <Box
      p="4"
      flex="1"
      m={1}
      borderRadius="8"
      _light={{
        bg: 'white',
      }}
      _dark={{
        bg: 'coolGray.800',
      }}
    >
      <TouchableOpacity onPress={handleOnPressCourse}>
        <HStack space={[2, 3]} justifyContent="space-between">
          <VStack>
            <Text
              _dark={{
                color: 'warmGray.50',
              }}
              color="gray.800"
              bold
            >
              {course.data.name}
            </Text>
            <HStack>
              <VStack>
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
              </VStack>
              <VStack justifyContent="center" alignItems="flex-end">
                <Box>
                  <CircularProgress
                    // value={course.currLetGrade}
                    showProgressValue={false}
                    // valueSuffix={`/${grade.data.maxScore}%`}
                    title={course.currLetGrade}
                    titleStyle={{ fontSize: 15 }}
                    // maxValue={grade.data.maxScore}
                    radius={20}
                    activeStrokeWidth={4}
                    inActiveStrokeWidth={2}

                    // activeStrokeColor={gradeColorsHex[getLetterForGrade(grade)]}
                    // inActiveStrokeColor={progressColor}
                  />
                </Box>
              </VStack>
            </HStack>

            {/* <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              Letter Grade: {course.currLetGrade}
            </Text> */}
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
