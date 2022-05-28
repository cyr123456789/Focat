import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Text, Button, Card } from '@ui-kitten/components';

const AccountModal = ({ visible, setVisible }) => {
  return (
    <Modal visible={visible}>
      <Card>
        <Text>Account Settings</Text>
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default AccountModal;

const styles = StyleSheet.create({});
