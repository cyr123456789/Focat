import { StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Modal, Card, Button, Layout } from '@ui-kitten/components';
import { storeTask } from '../../utils/toDoListStorage';
import Toast from 'react-native-root-toast';
import { default as theme } from '../../custom-theme.json';

const AddTaskModal = ({ visible, setVisible }) => {
  const [task, setTask] = useState('');
  return (
    <Modal
      visible={visible}
      backdropStyle={{ backgroundColor: '#000000', opacity: 0.5 }}
    >
      <Card style={styles.card}>
        <TextInput
          style={styles.textInputBox}
          placeholder="Enter your task here..."
          value={task}
          onChangeText={setTask}
          selectionColor={theme['color-primary-500']}
        />
        <Layout style={{ flexDirection: 'row' }}>
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
        </Layout>
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
    backgroundColor: theme['color-primary-200'],
  },
  addTaskButton: {
    backgroundColor: theme['color-primary-300'],
    borderWidth: 0,
    flex: 1,
    marginRight: 10,
  },
});
