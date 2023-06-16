import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Card, Divider, Layout, useTheme, Text, Button, ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const Pedidos = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://handcrafedpaty-api.onrender.com/api/pedidos');
      const data = await response.json();
      setPedidos(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleSearch = () => {
    const filteredPedidos = pedidos.filter((pedido) => {
      return (
        pedido.id.toString().includes(searchText)
      );
    });
    setSearchResults(filteredPedidos);
  };

  const handlePedidoPress = (pedido) => {
    navigation.navigate('PedidoDetalhes', { pedido });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído':
        return '#00C781';
      case 'Em andamento':
        return '#0088FF';
      case 'Pendente':
        return '#FF8C00';
      case 'Cancelado':
        return '#FF3D71';
      default:
        return '#000000';
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePedidoPress(item)}>
      <Card style={{ marginBottom: 16 }}>
        <Layout>
          <View style={styles.view}>
            <Text category="h4">Pedido nº {item.id}</Text>
          </View>
          <Divider />
          <View style={styles.view}>
            <Text category="h5">Status: <Text category="h6" style={{ color: getStatusColor(item.status) }}>{item.status}</Text></Text>
          </View>
          <View style={styles.view}>
            <Text category="h5">Informações de Envio:</Text>
            <View style={styles.envioContainer}>
              <Text category="h6" style={styles.envioText}>{item.informacoes_envio}</Text>
            </View>
          </View>
          <Button onPress={() => handlePedidoPress(item)} style={{ marginTop: 8 }}>Ver Detalhes</Button>
        </Layout>
      </Card>
    </TouchableOpacity>
  );

  return (
    <Layout style={{ flex: 1, padding: 16, backgroundColor: theme['background-basic-color-1'] }}>
      <Divider />
      <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
        <Text category="h1">↩</Text>
      </TouchableOpacity>
      <Text category="h3" style={{ marginBottom: 16 }}>Pedidos</Text>
      <Divider style={{ marginBottom: 25 }} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar ID"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Layout>
          <Button style={{ backgroundColor: '#604c7d' }} onPress={handleSearch}>Pesquisar</Button>
        </Layout>
      </View>
      <FlatList
        data={searchResults.length > 0 ? searchResults : pedidos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  envioContainer: {
    flex: 1,
    marginTop: 8,
  },
  envioText: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
});

export default Pedidos;
