import { Box, Button, FlatList, Heading, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import CourseItem from '../components/CourseItem';
import { selectSortedCourses } from '../redux/courseSlice';

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
