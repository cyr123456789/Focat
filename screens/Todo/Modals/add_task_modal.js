import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import { Modal, Card, Button, Layout } from '@ui-kitten/components';
import ActionButton from '../Components/action_button_for_modal';
import ModalTextInput from '../Components/textinput_for_modal';
import { storeTask } from '../../../utils/toDoListStorage';

const AddTaskModal = ({ visible, setVisible }) => {
  const [task, setTask] = useState('');
  return (
    <Modal
      visible={visible}
      onBackdropPress={() => setVisible(!visible)}
      backdropStyle={styles.modalBackdrop}
    >
      <Card style={styles.card}>
        <ModalTextInput task={task} setTask={setTask} />
        <Layout style={{ flexDirection: 'row' }}>
          <ActionButton
            actionFn={() => {
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
            action="Add Task"
          />
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
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
