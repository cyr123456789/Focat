import { StyleSheet } from 'react-native';
import { Toggle } from '@ui-kitten/components';
import React from 'react';
import isLoggedIn from '../../../utils/isLoggedIn';

const ToggleComponent = (props) => {
  return props.inProgressStatus ? (
    <></>
  ) : (
    <Toggle
      checked={props.isGroup}
      onChange={props.toggleGroup}
      disabled={!isLoggedIn()}
      style={styles.toggle}
    >
      Current setting: {props.isGroup ? 'Group' : 'Solo'}
    </Toggle>
  );
};

export default ToggleComponent;

const styles = StyleSheet.create({
  toggle: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
  },
});
