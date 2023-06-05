import React from 'react';
import { Box, VStack, HStack, Text, Modal, Button, Input } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateActualGrade } from '../redux/courseSlice';
import * as SQLite from 'expo-sqlite';
type CourseGradeItemProps = {
  grade: {
    id: number;
    data: {
      name: string;
      actualScore: number | null;
      maxScore: number;
      weight: number;
    };
  };
};

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
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handleOpenModal}>
        <Box key={grade.id} bg="white" p={4} borderRadius="md" shadow={2}>
          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold">
                {grade.data.name}:
              </Text>
              <HStack space={2} alignItems="center">
                <Text fontSize="xl">{grade.data.actualScore?.toString()}</Text>
                <Text fontSize="xl" color="gray.600">
                  /
                </Text>
                <Text fontSize="xl">{grade.data.maxScore.toString()}</Text>
              </HStack>
            </HStack>
            <HStack>
              <Text fontSize="lg" color="gray.600">
                {grade.data.weight.toString()}
              </Text>
              <Text fontSize="lg" color="gray.600">
                %
              </Text>
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
