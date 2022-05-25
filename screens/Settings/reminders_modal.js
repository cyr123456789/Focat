import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Text, Button, Card } from '@ui-kitten/components';

const RemindersModal = ({ visible, setVisible }) => {
  return (
    <Modal visible={visible}>
      <Card>
        <Text>Reminders</Text>
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default RemindersModal;

const styles = StyleSheet.create({});
