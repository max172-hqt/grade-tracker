import { Button, Heading, VStack, Text, HStack } from 'native-base';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import CourseItem from '../components/CourseItem';
import { selectSortedCourses } from '../redux/courseSlice';
import { getLetterValue } from '../utils/gradesCalculation';
import { ScrollView } from 'react-native-gesture-handler';
import { getGPAColors, getGPAColorsHex } from '../utils/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CourseList({ navigation }) {
  const sortedCourses = useSelector(selectSortedCourses);
  const handleGoToCourseDetail = (id: number) => {
    navigation.navigate('Course Detail', { courseId: id });
  };

  const formattedCourses = useMemo(() => {
    if (sortedCourses.length === 0) return sortedCourses;

    if (sortedCourses.length % 2 === 1) {
      return [...sortedCourses, null];
    }
    return sortedCourses;
  }, [sortedCourses]);

  // Calculate 4.0-based GPA by the current letter grade of all courses
  const gpa = useMemo(() => {
    if (sortedCourses.length === 0) return 0;

    const totalGrade = sortedCourses.reduce(
      (curr, course) => curr + getLetterValue(course.currentLetterGrade) * course.data.units,
      0,
    );

    const totalUnits = sortedCourses.reduce((curr, course) => curr + course.data.units, 0);

    return totalGrade / totalUnits;
  }, [sortedCourses]);

  if (formattedCourses.length === 0) {
    return (
      <VStack
        flex="1"
        alignItems="center"
        justifyContent="center"
        space="4"
        _dark={{
          bg: 'coolGray.900',
        }}
      >
        <Heading color="light.400" fontSize="md">
          You have no courses yet.
        </Heading>
        <Button onPress={() => navigation.navigate('Add Course')}>Add Course</Button>
      </VStack>
    );
  }

  return (
    <VStack
      p="4"
      flex="1"
      _dark={{
        bg: 'coolGray.900',
      }}
    >
      <ScrollView>
        <VStack space={6}>
          <VStack space={2}>
            <Text fontSize="xl" fontWeight="bold">
              Program Overview
            </Text>
            <HStack
              p="4"
              borderRadius="2xl"
              _dark={{
                bg: 'coolGray.800',
              }}
              _light={{
                bg: 'white',
              }}
              alignItems="center"
              space={4}
            >
              <VStack flex={1}>
                <HStack space="2">
                  <Heading fontSize="6xl" fontWeight="bold" color={getGPAColors(gpa)}>
                    {gpa.toFixed(2)}
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
                    / 4.2
                  </Text>
                </HStack>
                <Text
                  color="coolGray.400"
                  _dark={{
                    color: 'coolGray.300',
                  }}
                  fontWeight="medium"
                >
                  Grade Point Average
                </Text>
              </VStack>
              <VStack>
                <Icon
                  name="line-chart"
                  size={50}
                  color={getGPAColorsHex(gpa)}
                  marginTop={1}
                  marginBottom={1}
                  marginRight={1}
                />
                <HStack marginTop={5}>
                  {[...Array(Math.floor(gpa))].map((e, i) => (
                    <Icon
                      name="star"
                      size={10}
                      color={getGPAColorsHex(gpa)}
                      marginLeft={5}
                      key={i}
                    />
                  ))}
                </HStack>
              </VStack>
            </HStack>
          </VStack>
          <VStack space={2} flex="1">
            <Text fontSize="xl" fontWeight="bold">
              Courses
            </Text>
            <VStack space={4}>
              {formattedCourses.map((item) => (
                <CourseItem
                  key={item?.id ?? 'visual-item'}
                  course={item}
                  handleGoToCourseDetail={handleGoToCourseDetail}
                />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
