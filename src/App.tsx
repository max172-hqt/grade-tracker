import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/Home';
import { useEffect } from 'react';
import { initDatabase, getAllCourses, getAllGrades } from './database/localdb';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setCourses, setGrades } from './redux/courseSlice';
import { LinearGradient } from 'expo-linear-gradient';
import 'react-native-gesture-handler';
import SettingsScreen from './pages/Setting';
import { NativeBaseProvider, extendTheme, useColorModeValue } from 'native-base';
import { themeColors } from './utils/colors';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

/**
 * Entry-point component using Bottom Tab navigation
 * Home:
 * - Show list of courses
 * - Add course using the Add button on top of the menu
 *
 * Setting: TODO
 */
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const theme = extendTheme(config);

function App() {
  const dispatch = useDispatch();
  const bg = useColorModeValue(themeColors.light.headerBg, themeColors.dark.headerBg);
  const text = useColorModeValue(themeColors.light.text, themeColors.dark.text);
  const statusBar = useColorModeValue('dark-content', 'light-content');

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
      <StatusBar barStyle={statusBar} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name === 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: text,
          },
          headerStyle: {
            backgroundColor: bg,
          },
          tabBarStyle: {
            backgroundColor: bg,
            borderTopWidth: 0,
          },
          headerShadowVisible: false, // applied here
          headerBackTitleVisible: false,
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
    </NavigationContainer>
  );
}

const RootComponent = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider
        config={{
          dependencies: {
            'linear-gradient': LinearGradient,
          },
        }}
        theme={theme}
      >
        <App />
      </NativeBaseProvider>
    </Provider>
  );
};

registerRootComponent(RootComponent);
