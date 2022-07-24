import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { removeTask, toggleDoneStatus } from '../../utils/toDoListStorage';
import { default as theme } from '../../custom-theme.json';

const Task = (props) => {
  return (
    <View
      style={[
        styles.taskWrapper,
        {
          backgroundColor: props.isDoneStatus
            ? theme['color-primary-400']
            : theme['color-primary-200'],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.delete}
        onPress={() => removeTask(props.keyVal)}
      >
        <Icon
          name={'delete-outline'}
          size={40}
          color={
            props.isDoneStatus
              ? theme['color-primary-100']
              : theme['color-primary-300']
          }
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
            color: props.isDoneStatus
              ? theme['color-primary-100']
              : theme['color-primary-500'],
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
