import { Box, Button, FlatList, Heading, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CourseItem from '../components/CourseItem';
import { useMemo } from 'react';

export default function CourseList({ navigation }) {
  const courses = useSelector((state: RootState) => state.course.courses);

  const handleGoToCourseDetail = (id: number) => {
    navigation.navigate('Course Detail', { courseId: id });
  };

  // Add a dummy course if the number of courses is odd
  const formattedCourses = useMemo(() => {
    if (courses.length === 0) return courses;

    if (courses.length % 2 === 1) {
      return [...courses, null];
    }
    return courses;
  }, [courses]);

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
    <Box
      p="4"
      flex="1"
      _dark={{
        bg: 'coolGray.900',
      }}
    >
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
