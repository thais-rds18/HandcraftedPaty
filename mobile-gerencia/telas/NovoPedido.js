import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';

const NovoPedido = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState('');

  const handleCriarPedido = () => {
    // Aqui você pode enviar os dados para a API para criar um novo pedido
    const novoPedido = {
      nome: nome,
      preco: parseFloat(preco),
      categoria_id: parseInt(categoriaId),
      quantidade_estoque: parseInt(quantidadeEstoque),
    };

    // Exemplo de envio para a API usando fetch:
    fetch('http://handcrafedpaty-api.onrender.com/api/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoPedido),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert('Pedido criado com sucesso!');
      })
      .catch((error) => {
        Alert.alert('Erro ao criar o pedido. Por favor, tente novamente.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="ID da categoria"
        value={categoriaId}
        onChangeText={setCategoriaId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade em estoque"
        value={quantidadeEstoque}
        onChangeText={setQuantidadeEstoque}
        keyboardType="numeric"
      />
      <Button title="Criar Pedido" onPress={handleCriarPedido} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
});

export default NovoPedido;
