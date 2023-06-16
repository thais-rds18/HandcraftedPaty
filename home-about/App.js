// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Header from './telas/componentes/Header'
import Home from './telas/Home';
import About from './telas/About';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer>
          <StatusBar backgroundColor="#604c7d" barStyle="default" />
          <Header />
          <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="About" component={About} options={{ title: 'About' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>


  );
};

export default App;
