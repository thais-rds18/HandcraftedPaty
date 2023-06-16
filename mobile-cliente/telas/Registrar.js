import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Button, Layout, Text, ApplicationProvider, Icon } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import useSWR, { mutate } from 'swr';
import { useNavigation } from '@react-navigation/native';
import { scrypt } from 'scrypt-js';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const Registrar = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setErrorMsg('As senhas não coincidem');
      return;
    }

    try {
      const passwordBuffer = new TextEncoder().encode(senha);
      const saltBuffer = new TextEncoder().encode(email);

      // Generating the hash using scrypt-js
      const hashBuffer = await scrypt(passwordBuffer, saltBuffer, {
        N: 16384, // CPU/memory cost parameter
        r: 8,     // block size parameter
        p: 1,     // parallelization parameter
        dkLen: 64 // desired key length
      });

      const encryptedPassword = Buffer.from(hashBuffer).toString('base64');

      const response = await fetch('http://handcrafedpaty-api.onrender.com/api/clientes/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          endereco,
          contato,
          senha: encryptedPassword,
        }),
      });

      if (response.ok) {
        console.log('Cliente cadastrado com sucesso');
        setSuccessMsg('Cliente cadastrado com sucesso');
        mutate('http://handcrafedpaty-api.onrender.com/api/clientes/cadastrar');
      } else {
        setErrorMsg('Erro ao cadastrar o cliente');
      }
    } catch (error) {
      setErrorMsg('Erro ao cadastrar o cliente');
    }
  };


  const { error } = useSWR('http://handcrafedpaty-api.onrender.com/api/clientes/cadastrar');

  if (error) {
    setErrorMsg('Erro ao cadastrar o cliente');
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
          {errorMsg && <Text status="danger">{errorMsg}</Text>}
        {successMsg && <Text status="success">{successMsg}</Text>}
        </TouchableOpacity>
        <Text style={{ marginBottom: 20 }} category="h3">Registro</Text>
        <Input label="Nome" value={nome} onChangeText={setNome} />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input label="Endereço" value={endereco} onChangeText={setEndereco} />
        <Input label="Contato" value={contato} onChangeText={setContato} />
        <Input
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <Input
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <Button style={{ margin: 15 }} onPress={handleRegister}>Registrar</Button>

      </Layout>
    </ApplicationProvider>
  );
};

export default Registrar;
