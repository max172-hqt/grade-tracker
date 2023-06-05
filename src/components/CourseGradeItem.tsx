import React from 'react';
import { Box, VStack, HStack, Text, Modal, Button, Input } from 'native-base';
import { Alert } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateActualGrade } from '../redux/courseSlice';
import * as SQLite from 'expo-sqlite';
import { Grade } from '../types/index';

interface CourseGradeItemProps {
  grade: Grade;
}

const CourseGradeItem: React.FC<CourseGradeItemProps> = ({ grade }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedActualGrade, setUpdatedActualGrade] = useState(grade.data.actualScore);
  const dispatch = useDispatch();
  const db = SQLite.openDatabase('db.gradetracker', '1.0');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (updatedActualGrade !== null) {
      if (updatedActualGrade <= grade.data.maxScore) {
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE grades SET actual_score = ? WHERE id = ?',
            [updatedActualGrade, grade.id],
            (_, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                dispatch(updateActualGrade({ gradeId: grade.id, actualScore: updatedActualGrade }));
                setIsModalOpen(false);
              }
            },
            (_, error) => {
              console.error(error);
              return true;
            },
          );
        });
      } else {
        Alert.alert('Error', 'The entered grade exceeds the maximum score!');
      }
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal}>
        <Box key={grade.id} bg="white" p={4} borderRadius="md" shadow={2}>
          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">{grade.data.name}:</Text>
              <HStack space={2} alignItems="center">
                <Text>{grade.data.actualScore?.toString()}</Text>
                <Text color="coolGray.600">/</Text>
                <Text>{grade.data.maxScore.toString()}</Text>
              </HStack>
            </HStack>
            <HStack>
              <Text color="coolGray.600">{grade.data.weight.toString()}</Text>
              <Text color="coolGray.600">%</Text>
            </HStack>
          </VStack>
        </Box>
      </TouchableOpacity>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Edit Grade</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="Input Grade"
              value={updatedActualGrade?.toString() ?? ''}
              onChangeText={(text) => setUpdatedActualGrade(Number(text))}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button onPress={handleSaveChanges}>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CourseGradeItem;
