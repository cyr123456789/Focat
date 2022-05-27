import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import { Button, Input, Layout, Icon } from '@ui-kitten/components';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  /**
   * Passwords strength must be strong, with at least 8 characters,
   * at least 1 upper and lower case letter, 1 digit, and 1 special character.
   */
  const validatePasswordStrength = () => {
    const regex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
    );
    return regex.test(password);
  };

  /**
   * Function that will be executed when user presses "Signup".
   * All fields must be filled up.
   * Password and confirm password must match.
   * Strength of the password entered must be strong.
   * Email entered must be of valid format.
   */
  const handleSignup = () => {
    if (username === '') {
      Toast.show('Please fill up username.', {
        duration: Toast.durations.SHORT,
      });
    } else if (password !== confirmPassword) {
      Toast.show('Password and confirm password must be the same.', {
        duration: Toast.durations.SHORT,
      });
    } else if (!validatePasswordStrength()) {
      Toast.show(
        'Password should have a minimum of 8 characters, with at least a lower and upper case letter, digit, and special character.',
        {
          duration: Toast.durations.SHORT,
        }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Registered:', user.email);
        })
        .catch((error) => {
          console.log(error.message);
          Toast.show('Unable to create an account. Try again.', {
            duration: Toast.durations.SHORT,
          });
        });
    }
  };

  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon name={secureTextEntry ? 'eye-off' : 'eye'} {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={styles.text}>Enter the world of Focat.</Text>
        <Input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          accessoryLeft={(props) => <Icon name="person-outline" {...props} />}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          accessoryLeft={(props) => <Icon name="email-outline" {...props} />}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={secureTextEntry}
          accessoryRight={renderEyeIcon}
          accessoryLeft={(props) => <Icon name="lock-outline" {...props} />}
        />
        <Input
          style={styles.input}
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={secureTextEntry}
          accessoryLeft={(props) => <Icon name="lock-outline" {...props} />}
        />
        <Button style={styles.button} onPress={handleSignup}>
          Sign Up
        </Button>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 4,
  },
  input: {
    margin: 4,
    width: 250,
  },
  button: {
    alignItems: 'center',
    margin: 4,
  },
});
