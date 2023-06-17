import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Card, Layout, Text, ApplicationProvider, Divider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import Carousel, { Pagination } from 'react-native-snap-carousel';



const theme = {
  ...lightTheme,
  "color-primary-500": "#604c7d",
  "color-primary-600": "#5495c5",
  "color-primary-700": "#96c6eb",
  "background-basic-color-1": "#fcf9fb",
};

export default Home = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselData = [
    { id: 1, title: 'Pedidos', description: 'Lista dos pedidos.', image: require('../assets/pedidos.jpg')},
    { id: 2, title: 'Clientes', description: 'Lista dos clientes cadastrados.', image: require('../assets/clientes.jpg') },
    { id: 3, title: 'Produtos', description: 'Lista de produtos disponíveis.', image: require('../assets/produtos.jpg') },
  ];

  const renderCarouselItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigateToPage(item.id)}>
      <Image style={styles.image} source={item.image} />
      <Text category="h5" style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </Card>
  );
 

  const navigateToPage = (itemId) => {
    switch (itemId) {
      case 1:
        navigation.navigate('Pedidos');
        break;
      case 2:
        navigation.navigate('Clientes');
        break;
      case 3:
        navigation.navigate('Produtos');
        break;
      default:
        break;
    }
  };
  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={styles.container}>
      <Divider />
        <Text category="h5" style={styles.desc}>Bem vindo de volta, ADM! O que deseja fazer hoje?</Text>
        <Divider style={{marginBottom: 25}}/>
        <Carousel 
          data={carouselData}
          renderItem={renderCarouselItem}
          sliderWidth={350}
          itemWidth={350}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.8}
        />
 <Divider style={{margin: 20}}/>
 <Layout style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={() => navigation.navigate('About')}>Saiba mais</Button>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  desc: {
    width: 'auto',
    margin: 10,
    color: '#604c7d',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
  },
  card: {
    marginBottom: 16,
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 8,
    fontSize: 30
  },
  cardDescription: {
    color: 'gray',
    fontSize: 20,
  },
  image: {
    width: 280,
    height: 280,
  },
  paginationContainer: {
    height: 3,
    width: 10,
    alignSelf: 'center',

  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#604c7d',
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 40,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});



