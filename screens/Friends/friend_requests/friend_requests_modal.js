import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Button, Card, Text } from '@ui-kitten/components';
import { FriendRequestsList } from './friend_requests_list';
import fetchFriendRequests from './fetch_friend_requests';
import { useFocusEffect } from '@react-navigation/native';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';
import isLoggedIn from '../../../utils/isLoggedIn';

const FriendRequestsModal = ({ visible, setVisible, setFriendListData }) => {
  const [friendRequests, setFriendRequests] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn()) {
        const unsubscribe = onSnapshot(
          doc(firestore, 'users', auth.currentUser.uid),
          (userDoc) => {
            fetchFriendRequests(setFriendRequests);
          },
          (error) => {
            console.log(error.code);
          }
        );
        return () => unsubscribe();
      }
    }, [])
  );

  return (
    <Modal
      style={styles.container}
      visible={visible}
      onBackdropPress={() => setVisible(!visible)}
      backdropStyle={styles.modalBackdrop}
    >
      <Card>
        {friendRequests.length ? (
          <FriendRequestsList
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
            setFriendListData={setFriendListData}
            setVisible={setVisible}
          />
        ) : (
          <Text style={styles.text}>You have no friend request.</Text>
        )}
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
  text: {
    marginVertical: 10,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
