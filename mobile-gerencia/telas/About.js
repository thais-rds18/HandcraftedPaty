import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Layout, Text, ApplicationProvider, Divider, Card } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';

const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

const About = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity onPress={handleGoBack} style={{ position: 'absolute', top: 16, right: 16, zIndex: 999 }}>
          <Text category="h1">↩</Text>
        </TouchableOpacity>

        <Text style={{ marginBottom: 20 }} category="h3">Sobre nós</Text>
        <Divider style={{ margin: 15 }} />

        <ScrollView>
          <Card style={styles.card}>
            <Text style={{ margin: 10, marginBottom:15, alignSelf:'center' }}  category='h4'>Bem-vindo ao Handcrafties!</Text>

            <Text style={{ margin: 10, marginBottom:15, textAlign: 'justify'}} category='h5'>Somos uma equipe apaixonada pelo artesanato e pela beleza das peças únicas feitas à mão. Nosso objetivo é trazer para você produtos artesanais de alta qualidade, cuidadosamente confeccionados com amor e dedicação.</Text>

            <Text style={{ margin: 10, marginBottom:15, textAlign: 'justify'}} category='h5'>Acreditamos que o artesanato é uma forma especial de expressar criatividade e transmitir emoções. Cada peça que você encontra em nossa loja foi criada com atenção aos detalhes e com a intenção de encantar e surpreender.</Text>

            <Text style={{ margin: 10, marginBottom:15, textAlign: 'justify'}} category='h5'>Além de proporcionar produtos excepcionais, valorizamos o relacionamento com nossos clientes. Estamos aqui para ajudar e garantir que sua experiência de compra seja satisfatória em todos os aspectos. Nosso atendimento ao cliente é personalizado e dedicado a superar suas expectativas.</Text>

            <Text style={{ margin: 10, marginBottom:15, textAlign: 'justify'}} category='h5'>Junte-se a nós no universo do artesanato e descubra a magia das peças feitas à mão. Explore nossa loja, encontre a peça perfeita para você ou presenteie alguém especial. Estamos animados para compartilhar nossa paixão pelo artesanato e espalhar beleza através de cada criação.</Text>

            <Text style={{ margin: 10, marginBottom:15, textAlign: 'justify'}} category='h5'>Obrigado por escolher o HandCrafties. Esperamos que você se encante com nossos produtos e desfrute de uma experiência única!</Text>
          </Card>

          <Text category='h1' style={{alignSelf:'center', fontSize:60}}>-</Text>
        </ScrollView>

        <Divider style={{ margin: 15 }} />
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
  }
});

export default About;
