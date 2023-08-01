import { createStackNavigator } from '@react-navigation/stack';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import AddCourse from './AddCourse';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Box, IconButton, Menu, useColorModeValue } from 'native-base';
import { themeColors } from '../utils/colors';
import { useState } from 'react';
import { setSortOrder } from '../redux/courseSlice';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export default function HomeScreen() {
  const dispatch = useDispatch();
  const bg = useColorModeValue(themeColors.light.bg, themeColors.dark.bg);
  const text = useColorModeValue(themeColors.light.text, themeColors.dark.text);
  const iconColor = useColorModeValue('#6b7280', 'white');
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
    <Stack.Navigator
      initialRouteName="Courses"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false, // applied here
        headerStyle: {
          backgroundColor: bg,
        },
        headerTitleStyle: {
          color: text,
        },
        headerTintColor: iconColor,
      }}
    >
      <Stack.Screen
        name="Grades Tracker App"
        component={CourseList}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Box flexDirection="row" alignItems="center">
              <Menu
                onClose={() => setSortingMenuOpen(false)}
                isOpen={sortingMenuOpen}
                onOpen={() => setSortingMenuOpen(true)}
                trigger={(triggerProps) => (
                  <IconButton
                    variant="ghost"
                    borderRadius="full"
                    icon={<Ionicons name="md-options" size={22} color={iconColor} />}
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
              variant="ghost"
              borderRadius="full"
              icon={<Ionicons name="add" size={22} color={iconColor} />}
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
