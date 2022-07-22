import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";

const Leaderboard = () => {
  return (
    <Layout style={styles.container}>
      <Text>Hello World!</Text>
      <Button style={styles.button}>Click me</Button>
    </Layout>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
