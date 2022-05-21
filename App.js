import React from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import StackNavigator from "./navigation/StackNavigator";
import "react-native-gesture-handler";

const App = () => {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StackNavigator />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
