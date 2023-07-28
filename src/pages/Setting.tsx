import {
  Text,
  HStack,
  useColorMode,
  VStack,
  Divider,
  ScrollView,
  Button,
  AlertDialog,
  useToast,
} from 'native-base';
import { useRef, useState } from 'react';
import { Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData } from '../redux/courseSlice';
import type { RootState } from '../redux/store';
import { deleteAllCourses } from '../database/localdb';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.course.courses);
  const { colorMode, toggleColorMode } = useColorMode();
  const [open, setOpen] = useState(false);
  const cancelRef = useRef(null);
  const toast = useToast();

  const handleDeleteData = async () => {
    const res = await deleteAllCourses();
    if (res) {
      dispatch(deleteData());
      toast.show({
        description: 'Delete data successfully',
      });
    } else {
      toast.show({
        description: 'Some errors occur.',
      });
    }
    setOpen(false);
  };

  const DeleteAlertDialog = () => (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={open} onClose={() => setOpen(false)}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Delete All Data</AlertDialog.Header>
        <AlertDialog.Body>
          <VStack space="4" p="1">
            <Text>
              Are you sure you want to delete all {courses.length} courses? This action cannot be
              reverted.
            </Text>
          </VStack>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="coolGray"
              onPress={() => setOpen(false)}
              ref={cancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={handleDeleteData}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );

  return (
    <>
      <ScrollView
        _dark={{
          bg: 'coolGray.900',
        }}
        _light={{
          bg: 'white',
        }}
        flex={1}
        p={4}
      >
        <VStack>
          <HStack alignItems="center">
            <Text fontSize="md" fontWeight="bold" flex="1">
              Toggle Dark Mode
            </Text>
            <HStack alignItems="center" space="2">
              <Text fontWeight="bold" color="gray.500" _dark={{ color: 'gray.200' }}>
                {colorMode && colorMode.charAt(0).toUpperCase() + colorMode.slice(1)}
              </Text>
              <Switch value={colorMode === 'dark'} onValueChange={() => toggleColorMode()} />
            </HStack>
          </HStack>

          <Divider
            my="4"
            _light={{
              bg: 'gray.200',
            }}
            _dark={{
              bg: 'gray.600',
            }}
          />

          <HStack alignItems="center">
            <Button flex="1" colorScheme="danger" onPress={() => setOpen(true)}>
              <Text color="white" fontWeight="bold">
                Delete All Courses
              </Text>
            </Button>
          </HStack>
        </VStack>
      </ScrollView>
      <DeleteAlertDialog />
    </>
  );
}
