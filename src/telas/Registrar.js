import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Layout } from '@ui-kitten/components';
import axios from 'axios';

const Registrar = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('http://your-backend-api/api/clientes/cadastrar', {
        nome,
        email,
        endereco,
        contato,
        senha,
        confirmarSenha,
      });

      console.log('Cliente cadastrado:', response.data);
    } catch (error) {
      setError('Erro ao cadastrar o cliente');
    }
  };

  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Text category="h3">Registro</Text>
      {error && <Text status="danger">{error}</Text>}
      <Input
        label="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <Input
        label="Contato"
        value={contato}
        onChangeText={setContato}
      />
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

      <Button onPress={handleRegister}>
        Registrar
      </Button>
    </Layout>
  );
};

export default Registrar;
