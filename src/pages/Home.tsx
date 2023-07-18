import { createStackNavigator } from '@react-navigation/stack';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import AddCourse from './AddCourse';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton, useColorModeValue } from 'native-base';
import { themeColors } from '../utils/colors';

const Stack = createStackNavigator();

export default function HomeScreen() {
  const headerBg = useColorModeValue(themeColors.light.headerBg, themeColors.dark.headerBg);
  const bg = useColorModeValue(themeColors.light.bg, themeColors.dark.bg);
  const text = useColorModeValue(themeColors.light.text, themeColors.dark.text);
  const iconColor = useColorModeValue('coolGray.500', 'white');

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
      }}
    >
      <Stack.Screen
        name="Courses"
        component={CourseList}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              variant="ghost"
              borderRadius="50%"
              _icon={{
                size: 'xl',
                as: Ionicons,
                name: 'add',
                color: iconColor,
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
