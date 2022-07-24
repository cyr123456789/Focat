import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import StackNavigator from './navigation/StackNavigator';
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';

const App = () => {
  return (
    <RootSiblingParent>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <StackNavigator />
      </ApplicationProvider>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({});

export default App;
