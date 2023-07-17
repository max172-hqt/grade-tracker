import { Box, Button, FlatList, Heading, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CourseItem from '../components/CourseItem';
import { useMemo } from 'react';
import { Grade } from '../types';

export default function CourseList({ navigation }) {
  const courses = useSelector((state: RootState) => state.course.courses);
  const calculateGPA = (courseId: number, grades: Grade[]) => {
    const gradesForCourse = grades.filter((grade) => grade.courseId === courseId);
    if (gradesForCourse.length === 0) {
      return 0;
    }

    const totalWeightedScore = gradesForCourse.reduce((acc, grade) => {
      if (grade.data.actualScore !== null) {
        const gradePercentage =
          (grade.data.actualScore / grade.data.maxScore) * (grade.data.weight / 100);
        return acc + gradePercentage;
      }
      return acc;
    }, 0);

    const totalWeightedScorePercentage = (totalWeightedScore / gradesForCourse.length) * 100;
    return totalWeightedScorePercentage;
  };
  const sortedCourses = useSelector((state: RootState) => {
    if (state.course.sortOrder === 'ALPHABETICAL') {
      return [...courses].sort((a, b) => a.data.name.localeCompare(b.data.name));
    } else if (state.course.sortOrder === 'GPA_HIGH_TO_LOW') {
      const coursesWithGPA = courses.map((course) => ({
        ...course,
        gpa: calculateGPA(course.id, state.course.grades),
      }));

      return [...coursesWithGPA].sort((a, b) => b.gpa - a.gpa);
    } else {
      return courses;
    }
  });
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
        Current Courses
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
