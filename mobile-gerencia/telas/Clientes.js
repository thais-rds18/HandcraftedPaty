import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Card, Divider, Layout, useTheme, Text, Button, ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import useSWR from 'swr';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const Clientes = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const theme = useTheme();

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { data: clientes, error: clientesError } = useSWR(
    'https://handcrafties-api-production.up.railway.app/api/clientes',
    fetcher
  );

  const handleSearch = () => {
    const filteredClientes = clientes.filter((cliente) => {
      return (
        cliente.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        cliente.id.toString() === searchText
      );
    });
    setSearchResults(filteredClientes);
  };

  if (clientesError) {
    return (
      <View>
        <Text>Error: {clientesError.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Card style={{ marginBottom: 16, borderColor:"#c9dff0", borderWidth: 3, borderTopWidth: 10}}>
      <Layout>
        <View style={styles.view}>
          <Text category="h4">{item.id}</Text>
          <Text category="h4" style={{ marginLeft: 15 }}>- {item.nome}</Text>
        </View>
        <Divider style={{height:3, backgroundColor:'#c9dff0'}}/>
        <View style={styles.view}><Image style={{ width: 15, height: 15 }} source={require('./../assets/email.png')}></Image><Text category="h6" style={{ marginLeft: 8 }}>{item.email}</Text></View>
        <View style={styles.view}><Image style={{ width: 15, height: 15 }} source={require('./../assets/map.png')}></Image><Text category="h6" style={{ marginLeft: 8 }}>{item.endereco}</Text></View>
        <View style={styles.view}><Image style={{ width: 15, height: 15 }} source={require('./../assets/phone.png')}></Image><Text category="h6" style={{ marginLeft: 8 }}>{item.contato}</Text></View>
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
        <Text category="h3" style={{ marginBottom: 16 }}>Clientes</Text>
        <Divider style={{ marginBottom: 25 }} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar ID"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Layout>
          <Button style={{backgroundColor: '#604c7d' }} onPress={handleSearch}>Pesquisar</Button>
        </Layout>
        </View>
        <FlatList
          data={searchResults.length > 0 ? searchResults : clientes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

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
  searchInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
});

export default Clientes;
