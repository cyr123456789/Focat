import { StyleSheet, Image } from 'react-native';
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

const CatMotivationComponent = (props) => {
  return props.inProgressStatus ? (
    <Layout style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/peachcat.png')}
      />
      <Text style={styles.text}>Catto working in progress...</Text>
      <Text style={styles.text}>Stay focused and all the best!</Text>
    </Layout>
  ) : (
    <></>
  );
};

export default CatMotivationComponent;

const styles = StyleSheet.create({
  container: {
    width: '75%',
    alignItems: 'center',
    flex: 1,
    marginTop: 70,
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontStyle: 'italic',
  },
});
