import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, Button, Layout, Avatar, Divider } from '@ui-kitten/components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/index';

const DrawerContent = (props) => {
  return (
    <Layout style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Layout style={styles.top}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => props.navigation.navigate('Profile')}
          >
            <Avatar
              source={require('../assets/peachcat.png')}
              size="giant"
            ></Avatar>
            <Text style={styles.username}>Username Here</Text>
          </TouchableOpacity>
        </Layout>
        <Divider></Divider>
        <Layout style={styles.middle}>
          <DrawerItemList {...props}></DrawerItemList>
        </Layout>
      </DrawerContentScrollView>
      <Divider></Divider>
      <Layout style={styles.bottom}>
        <Button
          style={styles.button}
          onPress={() =>
            signOut(auth)
              .then(() => {
                props.navigation.replace('Login');
                console.log('successful');
              })
              .catch((error) => {
                console.log(error.message);
              })
          }
        >
          Log out
        </Button>
      </Layout>
    </Layout>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  username: {
    marginLeft: 20,
  },
  middle: {
    paddingTop: 5,
  },
  bottom: {
    padding: 20,
  },
});
