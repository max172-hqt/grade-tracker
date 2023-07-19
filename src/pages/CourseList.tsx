import { Box, Button, FlatList, Heading, VStack, Divider } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useMemo, useState, useEffect } from 'react';
import { Course } from '../types';
import CourseItem from '../components/CourseItem';
import { getCurrentGradeProgress } from '../utils/gradesCalculation';
// import { CourseItem } from '../components/CourseItem';

type CourseListProps = {
  courses: Course[];
};

export default function CourseList({ navigation }) {
  const courses = useSelector((state: RootState) => state.course.courses);

  const [overallGPA, setOverallGPA] = useState(0.0); // State to hold the overall GPA

  useEffect(() => {
    // Calculate the overall GPA when the courses change
    const { overallGPA: calculatedGPA } = getCurrentGradeProgress(courses);
    setOverallGPA(calculatedGPA);
  }, [courses]);

  const handleGoToCourseDetail = (id: number) => {
    navigation.navigate('Course Detail', { courseId: id });
  };

  // const { currentLetterGrade } = getCurrentGradeProgress(course.grades, course.id);

  // Add a dummy course if the number of courses is odd
  const formattedCourses = useMemo(() => {
    if (courses.length === 0) return courses;

    if (courses.length % 2 === 1) {
      return [...courses, null];
    }
    return courses;
  }, [courses]);
  console.log('formattedCourses');
  console.log(formattedCourses);

  if (formattedCourses.length === 0) {
    return (
      <VStack flex="1" alignItems="center" justifyContent="center" space="4">
        <Heading color="light.400" fontSize="md">
          You have no courses yet.
        </Heading>
        <Button onPress={() => navigation.navigate('Add Course')}>Add Course</Button>
      </VStack>
    );
  }

  return (
    <Box p="4" flex="1" bg="white">
      <Heading fontSize="xl" pb="3">
        OverAll Progress Overall GPA: {overallGPA.toFixed(2)}{' '}
        {/* Display the overall GPA with 2 decimal places */}
      </Heading>

      <Divider />
      <Heading fontSize="xl" pb="3">
        Current Courses
      </Heading>
      <FlatList
        columnWrapperStyle={{
          flex: 1,
        }}
        numColumns={2}
        data={formattedCourses}
        renderItem={({ item }) => (
          <CourseItem course={item} handleGoToCourseDetail={handleGoToCourseDetail} courseid={0} />
        )}
        keyExtractor={(item) => (item ? `${item.id}` : 'visual-item')}
      />
    </Box>
  );
}
