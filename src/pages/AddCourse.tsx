import { useEffect, useState, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AlertDialog, Box, Button, FlatList, HStack, Heading, Input, VStack } from 'native-base';
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

const SAVE_DIALOG = 'SAVE';
const CANCEL_DIALOG = 'CANCEL';

export default function AddCourse({ navigation }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [grades, setGrades] = useState<GradeData[]>(sampleGradeData);
  const [dialog, setDialog] = useState<'SAVE' | 'CANCEL' | null>();
  const cancelRef = useRef(null);

  const handleOpenSaveDialog = () => {
    // TODO: validate error
    if (name.length === 0 || code.length === 0 || grades.length === 0) {
      console.log('TODO: Error');
      return;
    }

    setDialog(SAVE_DIALOG);
  };

  const handleOpenCancelDialog = () => {
    setDialog(CANCEL_DIALOG);
  };

  /**
   * Update new grade for the grade component
   */
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

  const handleNameChange = (text: string) => setName(text);
  const handleCodeChange = (text: string) => setCode(text);
  const handleDialogClose = () => setDialog(null);
  const handleGoBack = () => {
    handleDialogClose();
    navigation.goBack();
  };
  const handleCreateCourse = () => {
    console.log('create course');
  };

  const SaveAlertDialog = () => (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={dialog === SAVE_DIALOG}
      onClose={handleDialogClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Create Course</AlertDialog.Header>
        <AlertDialog.Body>Are you sure you want to create the course?</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={handleDialogClose}
              ref={cancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="success" onPress={handleCreateCourse}>
              Create
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  const CancelAlertDialog = () => (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={dialog === CANCEL_DIALOG}
      onClose={handleDialogClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Discard Changes?</AlertDialog.Header>
        <AlertDialog.Body>
          Are you sure you want to go back? All changes you&apos;ve made will be lost.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={handleDialogClose}
              ref={cancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={handleGoBack}>
              Discard
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="unstyled"
          _icon={{
            as: Ionicons,
            name: 'Save',
          }}
          onPress={handleOpenSaveDialog}
        >
          Save
        </Button>
      ),
      headerLeft: () => (
        <Button onPress={handleOpenCancelDialog} variant="unstyled">
          Cancel
        </Button>
      ),
    });
  }, []);

  return (
    <Box p="4" flex="1" bg="white">
      <VStack space="4" flex="1">
        <Heading fontSize="xl">Course Information</Heading>
        <Input
          placeholder="Enter the course name"
          w="100%"
          value={name}
          onChangeText={handleNameChange}
        />
        <Input
          placeholder="Enter the course code"
          w="100%"
          value={code}
          onChangeText={handleCodeChange}
        />
        <VStack flex="1">
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
      </VStack>
      <SaveAlertDialog />
      <CancelAlertDialog />
    </Box>
  );
}
