import { StyleSheet } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import React from 'react';

export default function EmailTextInput({ email, setEmail }) {
  return (
    <Input
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}
      accessoryLeft={(props) => <Icon name="email-outline" {...props} />}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});
