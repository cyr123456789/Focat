import { StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Modal, Card, Button } from '@ui-kitten/components';
import { storeTask } from '../../utils/toDoListStorage';
import Toast from 'react-native-root-toast';

const AddTaskModal = ({ visible, setVisible }) => {
  const [task, setTask] = useState('');
  return (
    <Modal visible={visible}>
      <Card style={styles.card}>
        <TextInput
          style={styles.textInputBox}
          placeholder="Enter your task here"
          value={task}
          onChangeText={setTask}
          selectionColor={'#4A3432'}
        />
        <Button
          onPress={() => {
            if (task == '') {
              Toast.show('Please enter a task.', {
                duration: Toast.durations.SHORT,
              });
            } else {
              storeTask(task);
              setTask('');
              setVisible(false);
            }
          }}
          style={styles.addTaskButton}
        >
          Add Task
        </Button>
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default AddTaskModal;

const styles = StyleSheet.create({
  card: {
    width: 300,
  },
  textInputBox: {
    height: 50,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#EBE5D5',
  },
  addTaskButton: {
    backgroundColor: '#E07E3D',
    borderWidth: 0,
    marginBottom: 10,
  },
});
