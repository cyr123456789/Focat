import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { default as theme } from '../../../custom-theme.json';

const ModalTextInput = (props) => {
  return (
    <TextInput
      style={styles.textInputBox}
      placeholder="Enter your task here..."
      value={props.task}
      onChangeText={props.setTask}
      selectionColor={theme['color-primary-300']}
    />
  );
};

export default ModalTextInput;

const styles = StyleSheet.create({
  textInputBox: {
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: theme['color-primary-200'],
  },
});
