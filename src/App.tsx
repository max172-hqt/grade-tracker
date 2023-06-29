import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/Home';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { initDatabase, getAllCourses, getAllGrades } from './database/localdb';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setCourses, setGrades } from './redux/courseSlice';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';
import SettingsScreen from './pages/Setting';

const Tab = createBottomTabNavigator();

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

/**
 * Entry-point component using Bottom Tab navigation
 * Home:
 * - Show list of courses
 * - Add course using the Add button on top of the menu
 *
 * Setting: TODO
 */
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await initDatabase();

      // Init courses
      const courses = await getAllCourses();
      dispatch(setCourses(courses));

      // Init grades
      const grades = await getAllGrades();
      dispatch(setGrades(grades));
    })();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider config={config}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name === 'Settings',
            // tabBarStyle: {
            //   backgroundColor: lightGray,
            // },
            // tabBarActiveTintColor: themeColor,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else {
                throw new Error('Unknown tab: ' + route.name);
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const RootComponent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(RootComponent);
