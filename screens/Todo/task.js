import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditTaskModal from './Modals/edit_task_modal';
import DeleteTaskModal from './Modals/delete_task_modal';
import { toggleDoneStatus } from '../../utils/toDoListStorage';
import { default as theme } from '../../custom-theme.json';

const Task = (props) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  return (
    <View style={styles.taskWrapper}>
      <EditTaskModal
        visible={isEditModalVisible}
        setVisible={setEditModalVisible}
        keyVal={props.keyVal}
        task={props.taskName}
      />
      <DeleteTaskModal
        visible={isDeleteModalVisible}
        setVisible={setDeleteModalVisible}
        keyVal={props.keyVal}
      />
      <TouchableOpacity
        onPress={() => {
          toggleDoneStatus(props.keyVal);
        }}
        style={[
          styles.taskTouchable,
          {
            backgroundColor: props.isDoneStatus
              ? theme['color-primary-400']
              : theme['color-primary-200'],
          },
        ]}
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
      <Icon
        name={'edit'}
        size={30}
        color={theme['color-primary-500']}
        onPress={() => setEditModalVisible(true)}
        style={styles.button}
      />
      <Icon
        name={'delete'}
        size={30}
        color={theme['color-primary-300']}
        onPress={() => setDeleteModalVisible(true)}
        style={styles.button}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  taskTouchable: {
    justifyContent: 'center',
    flex: 5,
    paddingHorizontal: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 10,
    marginLeft: 5,
  },
});
