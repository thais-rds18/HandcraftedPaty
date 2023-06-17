import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Card, Divider, Layout, useTheme, Text, Button, ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import useSWR, { mutate } from 'swr';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const Produtos = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const theme = useTheme();

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data: produtos, error: produtosError } = useSWR(
    'https://handcrafties-api-production.up.railway.app/api/produtos',
    fetcher
  );

  const handleSearch = () => {
    const filteredProdutos = produtos.filter((produto) => {
      return produto.nome.toLowerCase().includes(searchText.toLowerCase());
    });
    setSearchResults(filteredProdutos);

    mutate('https://handcrafties-api-production.up.railway.app/api/produtos');
  };

  if (produtosError) {
    return (
      <View>
        <Text>Error: {produtosError.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 16, borderColor:"#c9dff0", borderWidth: 3, borderTopWidth: 10}}>
      <Layout>
      <View style={styles.view}>
          <Image style={styles.image} source={{ uri: item.imagem_url }} />
          <View style={styles.textContainer}>
            <Text category="h5">{item.nome}</Text>
            <Text category="h6">Preço: R$ {item.preco}</Text>
            <Text category="h6">Estoque: {item.quantidade_estoque}</Text>
          </View>
        </View>
      </Layout>
    </Card>
  );

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={{ flex: 1, padding: 16, backgroundColor: theme['background-basic-color-1'] }}>
        <Divider />
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
        </TouchableOpacity>
        <Text category="h3" style={{ marginBottom: 16 }}>Produtos</Text>
        <Divider style={{ marginBottom: 25 }} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar produto"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Layout>
            <Button style={{ backgroundColor: '#604c7d' }} onPress={handleSearch}>Pesquisar</Button>
          </Layout>
        </View>
        {produtos ? (
          <FlatList
            data={searchResults.length > 0 ? searchResults : produtos} 
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
});

export default Produtos;
