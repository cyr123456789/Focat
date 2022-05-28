import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';

const GettingStarted = ({ navigation }) => {
  const handleToHome = () => {
    navigation.navigate('StackHome');
  };
  const handleToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <Layout style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/peachcat.png')}
      ></Image>
      <Button style={styles.button} onPress={handleToHome}>
        GET STARTED
      </Button>
      <Button style={styles.button} onPress={handleToLogin}>
        ALREADY HAVE AN ACCOUNT?
      </Button>
    </Layout>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  button: {
    alignItems: 'center',
    margin: 4,
    width: 280
  },
});
