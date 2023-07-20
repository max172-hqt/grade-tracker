import { Box, Button, FlatList, Heading, VStack } from 'native-base';
import { useSelector } from 'react-redux';
// import { useSelector } from 'reduxjs/toolkit';
import { useMemo } from 'react';
import CourseItem from '../components/CourseItem';
import { selectGradesForCourseWithIdMemoized, selectSortedCourses } from '../redux/courseSlice';
import {
  getCurrentGradeProgress,
  calculateGPAFromLetterGrade,
  calculateGPA,
  getLetterGrade,
  getLetterGradeFromTotalWeightedScore,
} from '../utils/gradesCalculation'; // Import the GPA calculation functions

export default function CourseList({ navigation }) {
  const sortedCourses = useSelector(selectSortedCourses);

  console.log(sortedCourses);

  // Function to fetch grades data for a specific course from the Redux store
  const fetchGradesDataByCourseId = (courseId) => {
    return useSelector((state) => selectGradesForCourseWithIdMemoized(state, courseId));
  };

  // Ensure that the 'grades' property is included for each course
  const coursesWithGrades = useMemo(() => {
    return sortedCourses.map((course) => ({
      ...course,
      // grades: [] /* Fetch the grades data for each course and add it here */,
      grades: fetchGradesDataByCourseId(course.id), // Fetch the grades data for each course and add it here
    }));
  }, [sortedCourses]);

  // Fetch the actual grades data for each course and update the 'grades' property
  coursesWithGrades.forEach((course, index) => {
    // Assuming that you have a function to fetch grades data by courseId
    const gradesData = fetchGradesDataByCourseId(course.id);
    coursesWithGrades[index].grades = gradesData;
  });

  // // Function to fetch grades data for a specific course from the Redux store
  // const fetchGradesDataByCourseId = (courseId) => {
  //   // Replace 'yourSelectorHere' with the actual selector to fetch grades data for a course
  //   const gradesData = useSelector(yourSelectorHere);
  //   // Assuming that you have a function to filter grades data by courseId
  //   return gradesData.filter((grade) => grade.courseId === courseId);
  // };

  const handleGoToCourseDetail = (id: number) => {
    navigation.navigate('Course Detail', { courseId: id });
  };

  // Function to calculate the overall GPA
  const calculateOverallGPA = (courses) => {
    let totalGPA = 0.0;
    let totalUnits = 0;

    courses.forEach((course) => {
      const letterGrade = course.data.letterGrade;
      const courseUnits = course.data.units;
      const grades = course.grades; // Access the grades property of the course

      console.log('letterGrade', letterGrade);
      console.log('courseUnits', courseUnits);
      console.log('grades', grades);

      if (letterGrade) {
        const courseGPA = calculateGPAFromLetterGrade(letterGrade);
        // const courseGPA = getLetterGradeFromTotalWeightedScore(letterGrade);

        totalGPA += courseGPA * courseUnits;
        totalUnits += courseUnits;
      }
    });

    if (totalUnits === 0) return 0.0;
    return totalGPA / totalUnits;
  };

  const formattedCourses = useMemo(() => {
    if (sortedCourses.length === 0) return sortedCourses;

    if (sortedCourses.length % 2 === 1) {
      return [...sortedCourses, null];
    }
    return sortedCourses;
  }, [sortedCourses]);

  // Calculate the overall GPA when the courses change
  const overallGPA = calculateOverallGPA(sortedCourses);
  console.log('overallGPA', overallGPA);

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
      <Heading color="light.400" fontSize="md">
        Overall Progress: Overall GPA: {overallGPA.toFixed(2)}
      </Heading>
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
