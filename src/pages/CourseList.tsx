import { Box, Button, Divider, FlatList, Heading, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import CourseItem from '../components/CourseItem';
import { selectSortedCourses } from '../redux/courseSlice';
// import { gradeColors } from '../utils/colors';
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

  // form.forEach((grade) => {
  //   if (grade.data.actualScore !== null && grade.data.weight !== null) {
  //     totalWeightAchieved += (grade.data.actualScore / grade.data.maxScore) * grade.data.weight;
  //     totalWeightCompleted += grade.data.weight;
  //   } else {
  //     allGradesCompleted = false;
  //   }
  // });
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

      // overAllGrade += getLetterValue(course?.currLetGrade) * course?.data.units;
      const letterValue = getLetterValue(course?.currLetGrade);
      courseValue += letterValue * course?.data.units;
      console.log('getLetterValue', getLetterValue(course?.currLetGrade));
      console.log('course Grade:', courseValue);
    }
    Finalgrade = courseValue / unitCtr;
    // console.log('Final:', FinalGrade);
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
      <Heading size="lg" fontWeight="bold" _dark={{ color: 'coolGray.200' }}>
        Overall Progress: {Finalgrade.toFixed(2)}
      </Heading>
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
