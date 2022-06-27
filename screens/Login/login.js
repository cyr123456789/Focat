import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Image } from 'react-native';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Layout } from '@ui-kitten/components';
import Toast from 'react-native-root-toast';
import EmailTextInput from '../../components/email_textinput';
import PasswordTextInput from '../../components/password_textinput';
import convertUID from '../../utils/userIdToUsername';
import { storeUsername } from '../../utils/usernameStorage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('StackHome');
      }
    });
    return unsubscribe;
  }, []);

  const navigateSignup = () => {
    navigation.navigate('Sign Up');
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
        convertUID(user.uid).then((username) => storeUsername(username));
      })
      .catch((error) => {
        Toast.show('Incorrect email/password. Try again.', {
          duration: Toast.durations.SHORT,
        });
      });
  };

  const navigateHome = () => {
    navigation.replace('StackHome');
  }

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView>
        <Image
          style={styles.logo}
          source={require('../../assets/peachcat.png')}
        />
        <EmailTextInput
          email={email}
          setEmail={setEmail}
          testID={'emailInput'}
        />
        <PasswordTextInput
          password={password}
          setPassword={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
          testID={'passwordInput'}
        />
        <Button
          style={styles.button}
          onPress={handleLogin}
          testID={'loginButton'}
        >
          Login
        </Button>
        <Button
          style={styles.button}
          onPress={navigateSignup}
          testID={'signupButton'}
        >
          Sign Up
        </Button>
        <Button style={styles.button} onPress={navigateHome}>
          Continue as Guest
        </Button>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  button: {
    marginVertical: 5,
  },
});
