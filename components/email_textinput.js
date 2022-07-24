import { StyleSheet } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import React from 'react';
import { default as theme } from '../custom-theme.json';

export default function EmailTextInput({ email, setEmail }) {
  return (
    <Input
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      accessoryLeft={(props) => <Icon name="email-outline" {...props} />}
      selectionColor={theme['color-primary-300']}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    width: 300,
  },
});
