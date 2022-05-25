import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, Layout, Avatar, Divider } from '@ui-kitten/components';
import { auth } from '../firebase/index';
import LoginLogoutButton from '../components/login_logout_button';

const DrawerContent = (props) => {
  let username = auth.currentUser?.email ?? 'Guest';

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
            <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
        </Layout>
        <Divider></Divider>
        <Layout style={styles.middle}>
          <DrawerItemList {...props}></DrawerItemList>
        </Layout>
      </DrawerContentScrollView>
      <Divider></Divider>
      <Layout style={styles.bottom}>
        <LoginLogoutButton
          style={styles.button}
          navigation={props.navigation}
        ></LoginLogoutButton>
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
  button: {
    width: '80%',
  },
});
