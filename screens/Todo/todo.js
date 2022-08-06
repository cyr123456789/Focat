import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Task from './task';
import AddTaskModal from './Modals/add_task_modal';
import { getTasks } from '../../utils/toDoListStorage';
import { default as theme } from '../../custom-theme.json';

const Todo = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((arr) => {
      if (arr !== undefined) {
        setTasks(arr);
      }
    });
  });

  return (
    <View style={styles.container}>
      <AddTaskModal
        visible={isAddModalVisible}
        setVisible={setAddModalVisible}
      />
      <ScrollView style={styles.tasksWrapper}>
        {tasks !== undefined && tasks.length > 0 ? (
          tasks.map((currTask) => (
            <Task
              taskName={currTask.task}
              isDoneStatus={currTask.isDone}
              keyVal={currTask.key}
              key={currTask.key}
            />
          ))
        ) : (
          <Text>You have currently no task to do.</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Icon
          name={'add-circle'}
          size={70}
          color={theme['color-primary-300']}
          onPress={() => setAddModalVisible(true)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tasksWrapper: {
    paddingHorizontal: 20,
    width: '100%',
    flex: 1,
    paddingVertical: 10,
    margin: 20,
  },
});
