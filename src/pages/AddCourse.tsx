import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Button, FlatList, HStack, Heading, Input, VStack } from 'native-base';
import type { GradeData } from '../types';
import GradeItem from '../components/GradeItem';

const sampleGradeData: GradeData[] = [
  {
    name: 'Quiz 1',
    weight: 10,
    maxScore: 10,
    actualScore: null,
  },
  {
    name: 'Quiz 2',
    weight: 10,
    maxScore: 10,
    actualScore: null,
  },
  {
    name: 'Assignment 1',
    weight: 10,
    maxScore: 10,
    actualScore: null,
  },
  {
    name: 'Assignment 2',
    weight: 10,
    maxScore: 10,
    actualScore: null,
  },
  {
    name: 'Midterm Exam',
    weight: 30,
    maxScore: 100,
    actualScore: null,
  },
  {
    name: 'Final Exam',
    weight: 30,
    maxScore: 100,
    actualScore: null,
  },
];

export default function AddCourse({ navigation }) {
  const [grades, setGrades] = useState<GradeData[]>(sampleGradeData);

  const handleSaveCourse = () => {
    console.log('TODO: Save course');
  };

  const handleUpdateGrade = (id: number, newGrade: GradeData) => {
    setGrades((prev) =>
      prev.map((grade, index) => {
        if (index === id) {
          return newGrade;
        }
        return grade;
      }),
    );
  };

  const handleDeleteGrade = (id: number) => {
    setGrades((prev) => prev.filter((_, index) => index !== id));
  };

  const handleAddGrade = (grade: GradeData) => {
    setGrades((prev) => [...prev, grade]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          colorScheme="indigo"
          variant="unstyled"
          _icon={{
            as: Ionicons,
            name: 'Save',
          }}
          onPress={handleSaveCourse}
        >
          Save
        </Button>
      ),
    });
  }, []);

  return (
    <Box p="4" flex="1" bg="white">
      <VStack space="4">
        <Heading fontSize="xl">Course Information</Heading>
        <Input placeholder="Enter the course name" w="100%" />
        <Input placeholder="Enter the course code" w="100%" />
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="xl">Grade Components</Heading>
          <Button variant="unstyled">Add rows</Button>
        </HStack>
        <FlatList
          data={grades}
          renderItem={({ item, index }) => (
            <GradeItem
              grade={item}
              key={index}
              handleUpdateGrade={handleUpdateGrade}
              handleDeleteGrade={handleDeleteGrade}
              handleAddGrade={handleAddGrade}
              tempId={index}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </VStack>
    </Box>
  );
}
