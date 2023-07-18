import { VStack, Text, ScrollView, HStack, Heading } from 'native-base';
import { useSelector } from 'react-redux';
import {
  selectCourseWithIdMemoized,
  selectGradesForCourseWithIdMemoized,
} from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import DetailGradeItem from '../components/DetailGradeItem';
import { useState } from 'react';
import { Switch } from 'react-native';
import CourseSummary from '../components/CourseSummary';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {
  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectCourseWithIdMemoized(state, courseId));
  const grades = useSelector((state: RootState) =>
    selectGradesForCourseWithIdMemoized(state, courseId),
  );
  const [showWeighted, setShowWeighted] = useState(false);

  const handleToggleShowWeighted = () => {
    setShowWeighted(!showWeighted);
  };

  if (!course) {
    return null;
  }

  return (
    <VStack
      flex="1"
      _dark={{
        bg: 'coolGray.900',
      }}
    >
      <VStack space="2" p="4">
        <Heading size="lg" fontWeight="bold" _dark={{ color: 'coolGray.200' }}>
          {course.data.name}
        </Heading>
        <Text _dark={{ color: 'coolGray.200' }} fontSize="md" fontWeight="medium">
          Course Code: {course.data.courseCode}
        </Text>
      </VStack>
      <ScrollView>
        <VStack p={4} space={2}>
          <HStack>
            <Text fontSize="xl" fontWeight="bold" flex="1">
              Summary
            </Text>
          </HStack>
          <CourseSummary grades={grades} />
        </VStack>
        <VStack p={4} space={2} flex="1">
          <HStack>
            <Text fontSize="xl" fontWeight="bold" flex="1">
              Grades
            </Text>
            <HStack alignItems="center" space="2">
              <Text fontWeight="bold" color="gray.500">
                Show Weighted
              </Text>
              <Switch value={showWeighted} onValueChange={handleToggleShowWeighted} />
            </HStack>
          </HStack>
          <VStack space={4} flex="1">
            {grades.map((grade) => (
              <DetailGradeItem key={grade.id} grade={grade} showWeighted={showWeighted} />
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
