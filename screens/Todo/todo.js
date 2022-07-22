import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import Task from './task';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTasks } from '../../utils/toDoListStorage';
import AddTaskModal from './add_task_modal';

const Todo = () => {
  const [isModalVisible, setModalVisible] = useState(false);

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
      <AddTaskModal visible={isModalVisible} setVisible={setModalVisible} />
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
          color="#E07E3D"
          onPress={() => setModalVisible(true)}
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
