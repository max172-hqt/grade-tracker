import { useEffect, useState, useRef, useCallback } from 'react';
import {
  AlertDialog,
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  VStack,
  WarningOutlineIcon,
  Text,
} from 'native-base';
import type { CourseData, GradeData } from '../types';
import SetupGradeItem from '../components/SetupGradeItem';
import { createGradesForCourse } from '../database/localdb';
import { useDispatch } from 'react-redux';
import { addCourse } from '../redux/courseSlice';
import EditGradeModal from '../components/EditGradeModal';
import { Alert } from 'react-native';
import { getTotalCourseWeightGradeData } from '../utils/gradesCalculation';
import { ScrollView } from 'react-native-gesture-handler';

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
const ADD_GRADE_DIALOG = 'ADD_GRADE';

const isUnitsValid = (units: string) => {
  const isInteger = /^\+?(0|[1-9]\d*)$/.test(units);
  if (!isInteger) {
    return false;
  }

  const unitNumber = parseInt(units);
  return !isNaN(unitNumber) && unitNumber <= 5 && unitNumber >= 1;
};

export default function AddCourse({ navigation }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [units, setUnits] = useState('');
  const [gradeData, setGradeData] = useState<GradeData[]>(sampleGradeData);
  const [dialog, setDialog] = useState<'SAVE' | 'CANCEL' | 'ADD_GRADE' | null>();
  const [clickedSave, setClickedSave] = useState(false);

  const cancelRef = useRef(null);

  const dispatch = useDispatch();
  const handleOpenSaveDialog = useCallback(() => {
    setClickedSave(true);

    if (name.length === 0 || code.length === 0 || units.length === 0 || !isUnitsValid(units)) {
      return;
    }

    if (gradeData.length === 0) {
      Alert.alert('Error', 'Please add at least 1 grade component.');
      return;
    }

    setDialog(SAVE_DIALOG);
  }, [name, code, units, gradeData]);

  const handleOpenCancelDialog = () => {
    setDialog(CANCEL_DIALOG);
  };

  /**
   * Update new grade for the grade component
   */
  const handleUpdateGrade = (id: number, newGrade: GradeData) => {
    setGradeData((prev) =>
      prev.map((grade, index) => {
        if (index === id) {
          return newGrade;
        }
        return grade;
      }),
    );
  };

  /**
   * Delete grade
   */
  const handleDeleteGrade = (id: number) => {
    setGradeData((prev) => prev.filter((_, index) => index !== id));
  };

  /**
   * Add new grade
   */
  const handleAddGrade = (name: string, maxScore: number, weight: number) => {
    setGradeData((prev) => [...prev, { name, maxScore, weight, actualScore: null }]);
  };

  const handleNameChange = (text: string) => {
    setName(text.trim());
  };

  const handleCodeChange = (text: string) => {
    setCode(text.trim());
  };

  const handleUnitsChange = (text: string) => {
    setUnits(text.trim());
  };

  const handleDialogClose = () => setDialog(null);

  const handleGoBack = () => {
    handleDialogClose();
    navigation.goBack();
  };

  const handleCreateCourse = async () => {
    const courseData: CourseData = {
      name,
      courseCode: code,
      units: parseInt(units),
    };

    const data = await createGradesForCourse(courseData, gradeData);
    if (!data) {
      console.log('Error creating course');
    } else {
      const { course, grades } = data;
      dispatch(
        addCourse({
          course,
          grades,
        }),
      );
      handleDialogClose();
      navigation.goBack();
    }
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
        <AlertDialog.Body>
          <VStack space="4" p="1">
            {getTotalCourseWeightGradeData(gradeData) !== 100 && (
              <Text color="warning.500">The total weight is not equal to 100%</Text>
            )}
            <Text>Are you sure you want to create the course?</Text>
          </VStack>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
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
              variant="ghost"
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
        <Button variant="ghost" colorScheme="blue" onPress={handleOpenSaveDialog}>
          Save
        </Button>
      ),
      headerLeft: () => (
        <Button variant="ghost" colorScheme="danger" onPress={handleOpenCancelDialog}>
          Cancel
        </Button>
      ),
    });
  }, [navigation, handleOpenSaveDialog]);

  return (
    <>
      <Box
        p="4"
        flex="1"
        _dark={{
          bg: 'coolGray.900',
        }}
        _light={{
          bg: 'white',
        }}
      >
        <VStack space="4" flex="1">
          <Heading fontSize="xl">Course Information</Heading>
          <FormControl isInvalid={clickedSave && name.length === 0}>
            <Input
              fontSize="sm"
              placeholder="Enter the course name"
              w="100%"
              value={name}
              onChangeText={handleNameChange}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Course name cannot be empty
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={clickedSave && code.length === 0}>
            <Input
              fontSize="sm"
              placeholder="Enter the course code"
              w="100%"
              value={code}
              onChangeText={handleCodeChange}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Course code cannot be empty
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={clickedSave && !isUnitsValid(units)}>
            <Input
              keyboardType="numeric"
              fontSize="sm"
              placeholder="Enter the course number of units"
              w="100%"
              value={units}
              onChangeText={handleUnitsChange}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Number of units must be an integer from 1 to 5
            </FormControl.ErrorMessage>
          </FormControl>
          <VStack flex="1">
            <HStack justifyContent="space-between" alignItems="center">
              <Heading fontSize="xl">Grade Components</Heading>
              <Button variant="ghost" onPress={() => setDialog('ADD_GRADE')} colorScheme="red">
                Add Item
              </Button>
            </HStack>

            <ScrollView>
              <VStack>
                {gradeData.map((grade, index) => (
                  <SetupGradeItem
                    grade={grade}
                    key={index}
                    handleUpdateGrade={handleUpdateGrade}
                    handleDeleteGrade={handleDeleteGrade}
                    tempId={index}
                  />
                ))}
              </VStack>
            </ScrollView>
            <Text
              textAlign="center"
              fontWeight="bold"
              pt="2"
              color="coolGray.600"
              _dark={{
                color: 'coolGray.400',
              }}
            >
              Total Weight: {getTotalCourseWeightGradeData(gradeData)}%
            </Text>
          </VStack>
        </VStack>
      </Box>

      <SaveAlertDialog />
      <CancelAlertDialog />
      <EditGradeModal
        grade={null}
        title="New Grade"
        isModalOpen={dialog === ADD_GRADE_DIALOG}
        onCloseModal={handleDialogClose}
        onSavePressed={handleAddGrade}
      />
    </>
  );
}
