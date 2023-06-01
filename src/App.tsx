import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Setting';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { initDatabase, debugTableSchema } from './database/localdb';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

/**
 * Entry-point component using Bottom Tab navigation
 * Home:
 * - Show list of courses
 * - Add course using the Add button on top of the menu
 *
 * Setting: TODO
 */
function App() {
  // TODO: Initialize database
  // useEffect(() => {
  //   initDatabase();
  //   debugTableSchema();
  // }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
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
