import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './pages/Home';
import SettingsScreen from './pages/Setting';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { initDatabase, debugTableSchema } from './database/localdb';

const Tab = createBottomTabNavigator();

function App() {
  useEffect(() => {
    initDatabase();
    debugTableSchema();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
