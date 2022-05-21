import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Image } from "react-native";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, Input, Layout } from "@ui-kitten/components";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("StackHome");
      }
    });
    return unsubscribe;
  }, []);
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered:", user.email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        console.log("Login error");
      });
  };
  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView>
        <Image
          style={styles.logo}
          source={require("../../assets/peachcat.png")}
        ></Image>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button style={styles.button} onPress={handleLogin}>
          Login
        </Button>
        <Button style={styles.button} onPress={handleSignUp}>
          Register
        </Button>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  input: {
    margin: 4,
  },
  button: {
    alignItems: "center",
    margin: 4,
  },
});
