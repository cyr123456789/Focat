import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { removeTask, toggleDoneStatus } from '../../utils/toDoListStorage';

const Task = (props) => {
  return (
    <View
      style={[
        styles.taskWrapper,
        { backgroundColor: props.isDoneStatus ? '#8F6C49' : '#EBE5D5' },
      ]}
    >
      <TouchableOpacity
        style={styles.delete}
        onPress={() => removeTask(props.keyVal)}
      >
        <Icon
          name={'delete-outline'}
          size={40}
          color={props.isDoneStatus ? '#FCFCF0' : '#E07E3D'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleDoneStatus(props.keyVal);
        }}
        style={styles.taskTouchable}
      >
        <Text
          style={{
            color: props.isDoneStatus ? '#FCFCF0' : '#4A3432',
            textDecorationLine: props.isDoneStatus ? 'line-through' : 'none',
          }}
        >
          {props.taskName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  delete: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTouchable: {
    justifyContent: 'center',
    flex: 5,
    marginLeft: 10,
  },
});
