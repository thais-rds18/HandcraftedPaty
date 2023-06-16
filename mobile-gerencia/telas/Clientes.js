import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Button, Layout, useTheme } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb", 
  "background-basic-color-1": "#fcf9fb", 
};

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://handcrafedpaty-api.onrender.com/api/clientes');
      const data = await response.json();
      setClientes(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 16 }}>
      <Layout style={{ padding: 16 }}>
        <Text category="h6">ID: {item.id}</Text>
        <Text category="h6">Nome: {item.nome}</Text>
        <Text category="h6">Email: {item.email}</Text>
        <Text category="h6">Endereço: {item.endereco}</Text>
        <Text category="h6">Contato: {item.contato}</Text>
      </Layout>
    </Card>
  );

  return (
    <Layout style={{ flex: 1, padding: 16, backgroundColor: theme['background-basic-color-1'] }}>
      <Text category="h4" style={{ marginBottom: 16 }}>Clientes</Text>
      <FlatList
        data={clientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Layout>
  );
};

export default Clientes;
