import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Button, Card } from '@ui-kitten/components';
import { FriendRequestsList } from './friend_requests_list';
import fetchFriendRequests from './fetch_friend_requests';

const FriendRequestsModal = ({ visible, setVisible, setFriendListData }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendRequests(setFriendRequests);
  }, []);

  return (
    <Modal style={styles.container} visible={visible}>
      <Card>
        <FriendRequestsList
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          setFriendListData={setFriendListData}
          setVisible={setVisible}
        />
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default FriendRequestsModal;

const styles = StyleSheet.create({
  container: {
    width: '65%',
  },
});
