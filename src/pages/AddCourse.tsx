import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, Button } from 'native-base';

export default function AddCourse({ navigation }) {
  const handleSaveCourse = () => {
    console.log('TODO: Save course');
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
  return <Box></Box>;
}
