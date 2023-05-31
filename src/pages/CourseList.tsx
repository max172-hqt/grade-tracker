import { Box, FlatList, Heading } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CourseItem from '../components/CourseItem';
import { useMemo } from 'react';

export default function CourseList() {
  const courses = useSelector((state: RootState) => state.course.courses);

  // Add a dummy course if the number of courses is odd
  const formattedCourses = useMemo(() => {
    if (courses.length % 2 === 1) {
      return [...courses, null];
    }
    return courses;
  }, [courses]);

  return (
    <Box p="4" flex="1">
      <Heading fontSize="xl" pb="3">
        Current Courses
      </Heading>
      <FlatList
        columnWrapperStyle={{
          flex: 1,
        }}
        numColumns={2}
        data={formattedCourses}
        renderItem={({ item }) => <CourseItem course={item} />}
        keyExtractor={(item) => (item ? `${item.id}` : 'visual-item')}
      />
    </Box>
  );
}
