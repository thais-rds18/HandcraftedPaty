import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Divider, Layout, useTheme, Text, Button, Icon, ApplicationProvider, Input } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from '@react-native-picker/picker';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

export default function EditarPedido({ route }){
  const navigation = useNavigation();
  const { pedidoId } = route.params;

  const [pedido, setPedido] = useState(null);
  const [informacoesEnvio, setInformacoesEnvio] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await fetch(`https://handcrafties-api-production.up.railway.app/api/pedidos/${pedidoId}`);
        if (response.ok) {
          const data = await response.json();
          setPedido(data);
          setInformacoesEnvio(data.informacoes_envio);
          setStatus(data.status ? data.status.toString() : '');
        } else {
          throw new Error('Erro ao buscar os dados do pedido');
        }
      } catch (error) {
        console.error('Erro ao realizar a chamada de API:', error);
      }
    };

    fetchPedido();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAtualizarPedido = async () => {
    try {
      const response = await fetch(`https://handcrafties-api-production.up.railway.app/api/pedidos/${pedidoId}/atualizar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ informacoes_envio: informacoesEnvio, status: status }),
      });

      if (response.ok) {
        navigation.navigate('Pedidos');
      } else {
        throw new Error('Erro ao atualizar o pedido');
      }
    } catch (error) {
      console.error('Erro ao realizar a chamada de API:', error);
    }
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={{ flex: 1, padding: 16, backgroundColor: theme['background-basic-color-1'] }}>
        <Divider />
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
        </TouchableOpacity>
        <Text category="h3" style={{ marginBottom: 16 }}>Editar Pedido</Text>
        <Divider style={{ marginBottom: 25 }} />
        <Card style={{ marginBottom: 16 }}>
          <Layout>
            <View style={styles.view}>
              <Text category="h4">Pedido nº {pedidoId}</Text>
            </View>
            <View style={styles.view}>
              <Text category="h5">Status:</Text>
              <RNPickerSelect
                placeholder={{}}
                value={status}
                onValueChange={value => setStatus(value)}
                items={[
                  { value: 'Concluído', label: 'Concluído' },
                  { value: 'Em andamento', label: 'Em andamento' },
                  { value: 'Pendente', label: 'Pendente' },
                  { value: 'Cancelado', label: 'Cancelado' },
                ]}
                style={pickerSelectStyles}
              />
            </View>
            <Text category="h5">Informações de Envio:</Text>
            <Input
              value={informacoesEnvio}
              onChangeText={setInformacoesEnvio}
              placeholder="Digite as informações de envio"
              multiline={true}
            />
          </Layout>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleAtualizarPedido} appearance="ghost" status="primary">
              Atualizar
            </Button>
          </View>
        </Card>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  button: {
    marginHorizontal: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

