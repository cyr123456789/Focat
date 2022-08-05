import { StyleSheet } from 'react-native';
import React from 'react';
import { Button } from '@ui-kitten/components';

import { default as theme } from '../../../custom-theme.json';

const ActionButton = (props) => {
  return (
    <Button onPress={props.actionFn} style={styles.button}>
      {props.action}
    </Button>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme['color-primary-300'],
    borderWidth: 0,
    flex: 1,
    marginRight: 10,
  },
});
