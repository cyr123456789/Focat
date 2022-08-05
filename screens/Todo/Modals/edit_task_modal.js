import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Modal, Card, Button, Layout } from '@ui-kitten/components';
import ActionButton from '../Components/action_button_for_modal';
import ModalTextInput from '../Components/textinput_for_modal';
import { editTask } from '../../../utils/toDoListStorage';

const EditTaskModal = (props) => {
  const [task, setTask] = useState(props.task);
  return (
    <Modal
      visible={props.visible}
      onBackdropPress={() => props.setVisible(!props.visible)}
      backdropStyle={styles.modalBackdrop}
    >
      <Card style={styles.card}>
        <ModalTextInput task={task} setTask={setTask} />
        <Layout style={{ flexDirection: 'row' }}>
          <ActionButton
            actionFn={() => {
              editTask(props.keyVal, task);
              props.setVisible(!props.visible);
            }}
            action="Edit Task"
          />
          <Button onPress={() => props.setVisible(false)}>Close</Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default EditTaskModal;

const styles = StyleSheet.create({
  card: {
    width: 300,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
