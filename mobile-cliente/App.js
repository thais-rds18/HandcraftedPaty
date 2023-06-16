import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Home from './telas/Home';
import Login from './telas/Login';
import Registrar from './telas/Registrar';
import Header from './telas/componentes/Header';
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer>
        <StatusBar backgroundColor="#604c7d" barStyle="default"/>
        <Header/>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Registrar} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
