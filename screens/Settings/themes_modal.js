import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Text, Button, Card } from '@ui-kitten/components';

const ThemesModal = ({ visible, setVisible }) => {
  return (
    <Modal visible={visible}>
      <Card>
        <Text>Themes</Text>
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default ThemesModal;

const styles = StyleSheet.create({});
