import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, Layout, Avatar, Divider } from '@ui-kitten/components';
import LoginLogoutButton from '../components/login_logout_button';
import { getUsername } from '../utils/usernameStorage';

const DrawerContent = (props) => {
  /**
   * To display username on the drawer. Username only retrieved once.
   */
  const [username, setUsername] = useState('Guest');
  getUsername().then((value) => {
    if (value !== undefined) {
      setUsername(value);
    } else {
      setUsername('Guest');
    }
  });

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
