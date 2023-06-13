import { Box, VStack, Text, ScrollView, HStack, Switch, Heading } from 'native-base';
import { useSelector } from 'react-redux';
import { selectCourseWithId, selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import DetailGradeItem from '../components/DetailGradeItem';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectCourseWithId(state, courseId));
  const grades = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));

  if (!course) {
    return null;
  }

  return (
    <VStack flex="1">
      <VStack
        space="2"
        p="4"
        bg={{
          linearGradient: {
            colors: ['violet.800', 'lightBlue.300'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        {/* TODO: Customize color based on the current grade */}
        <Heading size="md" fontWeight="bold" color="white">
          {course.data.name}
        </Heading>
        <Text color="coolGray.200" fontSize="md" fontWeight="bold">
          Course Code: {course.data.courseCode}
        </Text>
      </VStack>
      <VStack p={4} space={4} flex="1">
        <HStack>
          <Text fontSize="xl" fontWeight="bold" flex="1">
            Grades
          </Text>
          <HStack alignItems="center">
            <Text>Show Weighted</Text>
            <Switch size="sm" />
          </HStack>
        </HStack>
        <ScrollView>
          <VStack space={4} flex="1">
            {grades.map((grade) => (
              <DetailGradeItem key={grade.id} grade={grade} />
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  );
}
