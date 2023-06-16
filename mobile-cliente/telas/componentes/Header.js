import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Layout } from '@ui-kitten/components';

const Header = () => {
  return (
    <Layout style={styles.header}>
      <TouchableOpacity style={styles.iconContainer}>
        <Text style={styles.icon}>'( ͡❛ ᵜ ͡❛)'</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Handcrafted Paty</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#604c7d',
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  icon: {
    color: 'white',
    fontSize: 24,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
