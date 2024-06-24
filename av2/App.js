import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GeneratePasswordScreen from './screens/GeneratePasswordScreen';
import PasswordListScreen from './screens/PasswordListScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GeneratePassword" component={GeneratePasswordScreen} />
        <Stack.Screen name="PasswordList" component={PasswordListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
