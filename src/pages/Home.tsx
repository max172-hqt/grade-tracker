import { createStackNavigator } from '@react-navigation/stack';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import AddCourse from './AddCourse';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, IconButton, Menu } from 'native-base';
import { useDispatch } from 'react-redux';
import { setSortOrder } from '../redux/courseSlice';
import { useState } from 'react';
const Stack = createStackNavigator();

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [sortingMenuOpen, setSortingMenuOpen] = useState(false);
  const handleSortByAlphabetical = () => {
    dispatch(setSortOrder('ALPHABETICAL'));
    setSortingMenuOpen(false);
  };

  const handleSortByGPA = () => {
    dispatch(setSortOrder('GPA_HIGH_TO_LOW'));
    setSortingMenuOpen(false);
  };
  return (
    <Stack.Navigator initialRouteName="Courses">
      <Stack.Screen
        name="Courses"
        component={CourseList}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Box flexDirection="row">
              <Menu
                onClose={() => setSortingMenuOpen(false)}
                isOpen={sortingMenuOpen}
                onOpen={() => setSortingMenuOpen(true)}
                trigger={(triggerProps) => (
                  <IconButton
                    colorScheme="blue"
                    variant="ghost"
                    icon={<Ionicons name="md-options" size={24} color="blue" />}
                    {...triggerProps}
                  />
                )}
              >
                <Menu.Item onPress={handleSortByAlphabetical}>Sort A-Z</Menu.Item>
                <Menu.Item onPress={handleSortByGPA}>Sort GPA</Menu.Item>
              </Menu>
            </Box>
          ),
          headerRight: () => (
            <IconButton
              colorScheme="blue"
              variant="ghost"
              _icon={{
                as: Ionicons,
                name: 'add',
              }}
              onPress={() => navigation.navigate('Add Course')}
            />
          ),
        })}
      />
      <Stack.Screen name="Course Detail" component={CourseDetail} />
      <Stack.Screen
        name="Add Course"
        component={AddCourse}
        options={{
          gestureDirection: 'vertical',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
