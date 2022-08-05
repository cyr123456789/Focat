import { StyleSheet } from 'react-native';
import React from 'react';
import { Modal, Card, Button, Layout, Text } from '@ui-kitten/components';
import ActionButton from '../Components/action_button_for_modal';
import { removeTask } from '../../../utils/toDoListStorage';

const DeleteTaskModal = (props) => {
  return (
    <Modal
      visible={props.visible}
      onBackdropPress={() => props.setVisible(!props.visible)}
      backdropStyle={styles.modalBackdrop}
    >
      <Card style={styles.card}>
        <Text style={styles.text}>
          Are you sure you wish to delete this task?
        </Text>
        <Layout style={{ flexDirection: 'row' }}>
          <ActionButton
            actionFn={() => removeTask(props.keyVal)}
            action="Delete Task"
          />
          <Button onPress={() => props.setVisible(false)}>Close</Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default DeleteTaskModal;

const styles = StyleSheet.create({
  card: {
    width: 300,
  },
  text: {
    marginVertical: 10,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
