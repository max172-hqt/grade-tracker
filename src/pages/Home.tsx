import { createStackNavigator } from '@react-navigation/stack';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import AddCourse from './AddCourse';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from 'native-base';

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Courses">
      <Stack.Screen
        name="Courses"
        component={CourseList}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              colorScheme="indigo"
              variant="unstyled"
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
