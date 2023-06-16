import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Button, Layout, Text, ApplicationProvider, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import bcrypt from 'bcryptjs'; 

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb", 
  "background-basic-color-1": "#fcf9fb", 
};

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await fetch('http://handcrafedpaty-api.onrender.com/api/users/' + email);
      const user = await userData.json();
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log('User logged in successfully');

        const adminEmail = 'admin@example.com';
        if (email === adminEmail) {
          navigation.navigate('AdminScreen');
        } else {
          navigation.navigate('UserScreen');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
        </TouchableOpacity>

        <Text style={{ marginBottom: 20 }} category="h3">Login</Text>
        {error && <Text status="danger">{error}</Text>}
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button style={{ margin: 15 }} onPress={handleLogin}>
          Entrar
        </Button>
      </Layout>
    </ApplicationProvider>
  );
};

export default Login;
