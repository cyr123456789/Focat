import { StyleSheet, Image } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';

const CatCash = (props) => {
  return (
    <Layout style={styles.container}>
      <Image
        style={styles.cashLogo}
        source={require('../../../assets/catcash.png')}
      ></Image>
      <Text style={styles.cashText}>{props.catCash}</Text>
    </Layout>
  );
};

export default CatCash;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  cashLogo: {
    width: 30,
    height: 30,
  },
  cashText: {
    marginHorizontal: 20,
    textAlign: 'center',
  },
});
