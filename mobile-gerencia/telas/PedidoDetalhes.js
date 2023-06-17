import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Divider, Layout, useTheme, Text, Button, Icon, ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { TrashIcon, EditIcon } from '@ui-kitten/eva-icons';


const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const PedidoDetalhes = ({ route }) => {
  const navigation = useNavigation();
  const { pedido } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Concluído':
        return '#00CC00';
      case 'Em andamento':
        return '#0066FF';
      case 'Pendente':
        return '#FFA500';
      case 'Cancelado':
        return '#FF0000';
      default:
        return '#000000';
    }
  };

  const [cliente, setCliente] = useState(null);
  const [itensPedido, setItensPedido] = useState([]);

  useEffect(() => {
    const fetchCliente = () => {
      fetch(`https://handcrafties-api-production.up.railway.app/api/clientes/${pedido.cliente_id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro ao buscar os dados do cliente');
          }
        })
        .then((data) => {
          setCliente(data);
        })
        .catch((error) => {
          console.error('Erro ao realizar a chamada de API:', error);
        });
    };

    const fetchItensPedido = () => {
      fetch(`https://handcrafties-api-production.up.railway.app/api/pedidos/${pedido.id}/itens`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro ao buscar os itens do pedido');
          }
        })
        .then((data) => {
          const itemPromises = data.map((item) => {
            return fetch(`https://handcrafties-api-production.up.railway.app/api/produtos/${item.produto_id}`)
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error(`Erro ao buscar o produto com ID ${item.produto_id}`);
                }
              })
              .then((produto) => {
                return {
                  id: item.id,
                  produto_id: item.produto_id,
                  quantidade: item.quantidade,
                  nome: produto.nome,
                };
              });
          });

          Promise.all(itemPromises)
            .then((itens) => {
              setItensPedido(itens);
            })
            .catch((error) => {
              console.error('Erro ao buscar os itens do pedido:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao realizar a chamada de API:', error);
        });
    };


    fetchCliente();
    fetchItensPedido();
  }, []);

  const handleEditarPedido = () => {
    navigation.navigate('EditarPedido', { pedidoId: pedido.id });
  };

  const handleExcluirPedido = async () => {
    try {
      const response = await fetch(`https://handcrafties-api-production.up.railway.app/api/pedidos/${pedido.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigation.navigate('Pedidos');
      } else {
        throw new Error('Erro ao excluir o pedido');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada de API:', error);
    }
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} icons={EvaIconsPack}>
      <Layout style={{ flex: 1, padding: 16, backgroundColor: theme['background-basic-color-1'] }}>
        <Divider style={{height:2}}/>
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
        </TouchableOpacity>
        <Text category="h3" style={{ marginBottom: 16 }}>Detalhes do Pedido</Text>
        <Divider style={{height:2, marginBottom: 5 }} />
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={handleEditarPedido} appearance="ghost" status="primary" accessoryLeft={EditIcon}>
            Editar
          </Button>
          <Button style={styles.button} textStyle={styles.buttonText} onPress={handleExcluirPedido} appearance="ghost" status="danger" accessoryLeft={TrashIcon}>
            Excluir
          </Button>
        </View>
        <Divider style={{height:2, marginBottom: 15 }} />
        <View style={{ padding:10,backgroundColor: "#c9dff0" }}>
        <Card  style={{ margin: 10 }}>
          <Layout>
            <View style={styles.view}>
              <Text category="h4">Pedido nº {pedido.id}</Text>
            </View>
            <View style={styles.view}>
              <Text category="h5">Status:</Text>
              <Text category="h5" style={{ marginLeft: 8, color: getStatusTextColor(pedido.status) }}>{pedido.status}</Text>
            </View>
            <Text category="h5">Informações de Envio:</Text>
            <Text category="h6" style={{ marginLeft: 8 }}>{pedido.informacoes_envio}</Text>
          </Layout>
        </Card>

        {cliente && (
          <Card style={{ margin: 10 }}>
            <Layout>
              <View style={styles.view}>
                <Text category="h4">Cliente:</Text>
                <Text category="h5" style={{ marginLeft: 8 }}>{cliente.nome}</Text>
              </View>
              <View style={styles.view}>
                <Text category="h5">Email:</Text>
                <Text category="h5" style={{ marginLeft: 8 }}>{cliente.email}</Text>
              </View>
              <View style={styles.view}>
                <Text category="h5">Endereço:</Text>
                <Text category="h6" style={{ marginLeft: 8 }}>{cliente.endereco}</Text>
              </View>
            </Layout>
          </Card>
        )}

        {itensPedido.length > 0 && (
          <Card style={{ margin: 10 }}>
            <Layout style={{ justifyContent: 'space-between' }}>
              <View style={styles.view}>
                <Text category="h4">Itens do Pedido:</Text>
              </View>
              {itensPedido.map((item) => (
                <View style={styles.view} key={item.id}>
                  <Text category="h6">ID {item.produto_id} -</Text>
                  <Text category="h6" style={{ marginLeft: 8 }}>{item.nome}</Text>
                  <Text category="h6" style={{ marginLeft: 8 }}>| x{item.quantidade}</Text>
                </View>
              ))}
            </Layout>
          </Card>
        )}
        </View>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,

  },
  button: {
    marginHorizontal: 8,
  },
});

export default PedidoDetalhes;
