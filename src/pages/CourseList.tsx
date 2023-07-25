import { Box, Button, Divider, FlatList, Heading, VStack, HStack } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import CourseItem from '../components/CourseItem';
import { selectSortedCourses } from '../redux/courseSlice';
import { getLetterValue } from '../utils/gradesCalculation';

export default function CourseList({ navigation }) {
  const sortedCourses = useSelector(selectSortedCourses);
  const handleGoToCourseDetail = (id: number) => {
    navigation.navigate('Course Detail', { courseId: id });
  };

  console.log('sortedCourses');
  console.log(sortedCourses);

  const formattedCourses = useMemo(() => {
    if (sortedCourses.length === 0) return sortedCourses;

    if (sortedCourses.length % 2 === 1) {
      return [...sortedCourses, null];
    }
    return sortedCourses;
  }, [sortedCourses]);

  let courseCtr = 0;
  let unitCtr = 0;
  let courseValue = 0;
  let Finalgrade = 0;

  sortedCourses.forEach((course) => {
    if (course?.id !== null) {
      courseCtr += 1;
      unitCtr += course?.data.units;
      console.log('counter:', courseCtr);
      console.log('CourseList course ID:', course?.id);
      console.log('CourseList course Units:', course?.data.units);
      console.log('CourseList letter grades', course?.currLetGrade);

      const letterValue = getLetterValue(course?.currLetGrade);
      courseValue += letterValue * course?.data.units;
      console.log('getLetterValue', getLetterValue(course?.currLetGrade));
      console.log('course Grade:', courseValue);
    }
    Finalgrade = courseValue / unitCtr;
    console.log('units ctr', unitCtr);
  });

  console.log('formattedCourses');
  console.log(formattedCourses);

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
    <Box
      p="4"
      flex="1"
      _dark={{
        bg: 'coolGray.900',
      }}
    >
      <HStack>
        <VStack alignItems={'center'} marginTop={1}>
          <Box
            paddingTop={5}
            paddingLeft={15}
            paddingRight={15}
            paddingBottom={1}
            marginLeft={1}
            marginRight={1}
            marginBottom={2}
            borderRadius={8}
            _light={{
              bg: 'white',
            }}
            _dark={{
              bg: 'coolGray.800',
            }}
          >
            <Icon
              name="line-chart"
              size={50}
              color="green"
              marginTop={1}
              marginBottom={1}
              marginRight={1}
            />
            <HStack marginTop={5}>
              <Icon name="star" size={10} color="green" marginLeft={5} />
              <Icon name="star" size={10} color="green" marginLeft={5} />
              <Icon name="star" size={10} color="green" marginLeft={5} />
            </HStack>
            <Heading
              marginBottom={'1'}
              size="sm"
              fontWeight="bold"
              _dark={{ color: 'coolGray.200' }}
            >
              Overall
            </Heading>
            <Heading
              marginBottom={'5'}
              size="sm"
              fontWeight="bold"
              _dark={{ color: 'coolGray.200' }}
            >
              Progress
            </Heading>
            {/* </HStack> */}
          </Box>
        </VStack>
        <VStack alignItems={'center'} marginTop={1}>
          <Box
            paddingTop={5}
            paddingLeft={15}
            paddingRight={5}
            paddingBottom={1}
            marginLeft={1}
            marginRight={1}
            marginBottom={2}
            marginTop={5}
            borderRadius={8}
            _light={{
              bg: 'white',
            }}
            _dark={{
              bg: 'coolGray.800',
            }}
          >
            <Heading marginBottom={'2'} size="4xl" justifyContent="center">
              {Finalgrade.toFixed(2)}
            </Heading>
            <Heading marginBottom={'1'} size="sm">
              Grade Point Average
            </Heading>
          </Box>
        </VStack>
      </HStack>

      <Divider />
      <FlatList
        columnWrapperStyle={{
          flex: 1,
        }}
        numColumns={2}
        data={formattedCourses}
        renderItem={({ item }) => (
          <CourseItem course={item} handleGoToCourseDetail={handleGoToCourseDetail} />
        )}
        keyExtractor={(item) => (item ? `${item.id}` : 'visual-item')}
      />
    </Box>
  );
}
