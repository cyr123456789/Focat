import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import React from 'react';
import { default as theme } from '../assets/custom-theme.json';

export default function PasswordTextInput({
  password,
  setPassword,
  secureTextEntry,
  setSecureTextEntry,
}) {
  /**
   * Icon for user to toggle between show and hide password.
   */
  const renderEyeIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}
    >
      <Icon name={secureTextEntry ? 'eye-off' : 'eye'} {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry={secureTextEntry}
      accessoryRight={renderEyeIcon}
      accessoryLeft={(props) => <Icon name="lock-outline" {...props} />}
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
