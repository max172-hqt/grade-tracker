import { Box, HStack, VStack, Text, Input, ScrollView } from 'native-base';
import { useSelector } from 'react-redux';
import { selectGradesForCourseWithId } from '../redux/courseSlice';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActualGrade, updateMaxGrade, updateGradeWeight } from '../redux/courseSlice';

type CourseDetailRouteProp = RouteProp<Record<string, { courseId: number }>, 'Course Detail'>;

type Props = {
  route: CourseDetailRouteProp;
};

export default function CourseDetail({ route }: Props) {

  const { courseId } = route.params;
  const course = useSelector((state: RootState) => selectGradesForCourseWithId(state, courseId));
  const dispatch = useDispatch();
  const [actualScores, setActualScores] = useState<number[]>(course.map(grade => grade.data.actualScore ?? 0));
  const [maxScores, setMaxScores] = useState<number[]>(course.map(grade => grade.data.maxScore ?? 0));
  const [weights, setWeights] = useState<number[]>(course.map(grade => grade.data.weight ?? 0));

  useEffect(() => {
    console.log(course);
  }, [course]);

  const handleActualScoreChange = (id: number, value: number) => {
    if (!isNaN(value)) {
      const gradeId = course[id].id;
      dispatch(updateActualGrade({ gradeId: gradeId, actualScore: value }));
      setActualScores(prevScores => {
        const newScores = [...prevScores];
        newScores[id] = value;
        return newScores;
      });
    }
  };

  const handleMaxScoreChange = (id: number, value: number) => {
    if (!isNaN(value)) {
      const gradeId = course[id].id;
      dispatch(updateMaxGrade({ gradeId: gradeId, maxScore: value }));
      setMaxScores(preMaxScores => {
        const newMaxScores = [...preMaxScores];
        newMaxScores[id] = value;
        return newMaxScores;
      });
    }
  }

  const handleWeightChange = (id: number, value: number) => {
    if (!isNaN(value)) {
      const gradeId = course[id].id;
      dispatch(updateGradeWeight({ gradeId: gradeId, weight: value }));
      setWeights(preWeights => {
        const newWeights = [...preWeights];
        newWeights[id] = value;
        return newWeights;
      })
    }
  }

  return (
    <Box p={2} mb={10}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {course.length > 0 ? `Course #${course[courseId].courseId}` : ''}
      </Text>
      <ScrollView>
        <VStack space={4}>
          {course.map((grade, index) => {
            const currentIndex = index;
            return (
              <Box key={grade.id} bg="white" p={4} borderRadius="md" shadow={2}>
                <VStack space={2}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                      {grade.data.name}:
                    </Text>
                    <HStack space={2} alignItems="center">
                      <Input
                        value={actualScores[currentIndex].toString()}
                        keyboardType="numeric"
                        textAlign="center"
                        w={24}
                        //I know value need to be number type. When I use parseFloat(value) instead of 'value', it will have an issue on the interface.
                        //This works fine
                        onChangeText={value => handleActualScoreChange(currentIndex, value)}
                      />
                      <Text fontSize="xl" color="gray.600">/</Text>
                      <Input
                        value={maxScores[currentIndex].toString()}
                        keyboardType="numeric"
                        textAlign="center"
                        w={24}
                        onChangeText={value => handleMaxScoreChange(currentIndex, value)}
                      />
                    </HStack>
                  </HStack>
                  <HStack>
                    <Input
                      value={weights[currentIndex].toString()}
                      keyboardType="numeric"
                      textAlign="center"
                      w={20}
                      onChangeText={value => handleWeightChange(currentIndex, value)}
                    />
                    <Text fontSize="lg" color="gray.600" marginTop={1}> % </Text>
                  </HStack>
                </VStack>
              </Box>
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
}
