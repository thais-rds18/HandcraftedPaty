import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Header from './telas/componentes/Header';
import Clientes from './telas/Clientes';
import Produtos from './telas/Produtos';
import Pedidos from './telas/Pedidos';
import PedidoDetalhes from './telas/PedidoDetalhes';
import Home from './telas/Home';
import About from './telas/About';
import EditarPedido from './telas/EditarPedido';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer>
          <StatusBar backgroundColor="#604c7d" barStyle="default" />
          <Header />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="About" component={About} options={{ title: 'About' }} />
            <Stack.Screen name="Clientes" component={Clientes} options={{ title: 'Clientes' }} />
            <Stack.Screen name="Produtos" component={Produtos} options={{ title: 'Produtos' }} />
            <Stack.Screen name="Pedidos" component={Pedidos} options={{ title: 'Pedidos' }} />
            <Stack.Screen name="PedidoDetalhes" component={PedidoDetalhes} options={{ title: 'Detalhes do Pedido' }} />
            <Stack.Screen name="EditarPedido" component={EditarPedido} options={{ title: 'Editar Pedido' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
