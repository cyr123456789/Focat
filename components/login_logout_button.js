import React from 'react';
import { Button } from '@ui-kitten/components';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/index';
import { removeUsername } from '../utils/usernameStorage';

const LoginLogoutButton = ({ styles, navigation }) => {
  let button;
  if (auth.currentUser === null) {
    button = (
      <Button style={styles} onPress={() => navigation.navigate('Login')}>
        Log in
      </Button>
    );
  } else {
    button = (
      <Button
        style={styles}
        onPress={() =>
          signOut(auth)
            .then(() => {
              removeUsername();
              navigation.navigate('Login')
            })
            .catch((error) => {
              console.log(error.message);
            })
        }
      >
        Log out
      </Button>
    );
  }

  return button;
};

export default LoginLogoutButton;
