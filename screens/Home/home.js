import { StyleSheet } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { Layout, Text } from "@ui-kitten/components";

const Home = ({}) => {
  return (
    <Layout style={styles.container}>
      <Text>Email: {auth.currentUser?.email} </Text>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
