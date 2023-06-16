import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Card, Layout, Text, ApplicationProvider } from '@ui-kitten/components';
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
    { id: 1, title: 'Pelúcias', description: 'Descubra nossa coleção de pelúcias artesanais.', image: require('../assets/pelucias.jpg') },
    { id: 2, title: 'Luminárias', description: 'Ilumine seu ambiente com nossas luminárias.', image: require('../assets/luminarias.jpg') },
    { id: 3, title: 'Placas', description: 'Personalize a estrutura de seu negócio com nossas placas.', image: require('../assets/placas.jpg') },
  ];

  const renderCarouselItem = ({ item }) => (
    <Card style={styles.card} onPress={() => { }}>
      <Image style={styles.image} source={item.image} />
      <Text category="h5" style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </Card>
  );

  return (
    <ApplicationProvider mapping={mapping} theme={theme} customMapping={mapping} customFonts={{}}>
      <Layout style={styles.container}>
        <Text category="h5" style={styles.desc}>Descubra o HandcraftedPaty - sua loja virtual com vários produtos feitos à mão!</Text>
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

        <Layout style={styles.buttonsContainer}>
          <Button style={styles.button} onPress={() => navigation.navigate('Login')}>Login</Button>
          <Button style={styles.button} onPress={() => navigation.navigate('Register')}>Registrar</Button>
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
    marginBottom: 30,
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
    marginBottom: 40,
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
    marginBottom: 40,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});



