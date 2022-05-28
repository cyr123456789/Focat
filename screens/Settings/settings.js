import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const resetAsync = async () => {
    AsyncStorage.clear();
    console.log('wiped asyncstorage');
  };

  return (
    <Layout style={styles.container}>
      <Text>Hello World!</Text>
      <Button
        style={styles.button}
        onPress={() =>
          signOut(auth)
            .then(() => {
              navigation.replace('Login');
              console.log('Successful Logout');
            })
            .catch((error) => {
              console.log(error.message);
            })
        }
      >
        Log out
      </Button>
      <Button style={styles.button} onPress={resetAsync}>
        reset async
      </Button>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    alignItems: 'center',
    margin: 4,
  },
});
