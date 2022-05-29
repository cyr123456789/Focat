import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, Layout, Avatar, Divider } from '@ui-kitten/components';
// import { auth } from '../firebase/index';
import LoginLogoutButton from '../components/login_logout_button';

import { useSelector } from 'react-redux';

const DrawerContent = (props) => {
  /**
   * To display username on the drawer instead of the email address
   */
  const username = useSelector((state) => state.username.username);
  // let username = auth.currentUser?.email ?? 'Guest';

  return (
    <Layout style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Layout style={styles.top}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => props.navigation.navigate('Profile')}
          >
            <Avatar source={require('../assets/peachcat.png')} size="giant" />
            <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
        </Layout>
        <Divider />
        <Layout style={styles.middle}>
          <DrawerItemList {...props} />
        </Layout>
      </DrawerContentScrollView>
      <Divider />
      <Layout style={styles.bottom}>
        <LoginLogoutButton
          style={styles.button}
          navigation={props.navigation}
        />
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
