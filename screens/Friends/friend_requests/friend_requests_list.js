import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  Icon,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import convertUID from '../../../utils/userIdToUsername';
import { auth, firestore } from '../../../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import fetchFriendRequests from './fetch_friend_requests';
import fetchFriendListData from '../friends_list/fetch_friend_list_data';

export const FriendRequestsList = ({
  friendRequests,
  setFriendRequests,
  setFriendListData,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsernames();
  }, []);

  const getUsernames = async () => {
    setUsers([]);
    friendRequests.forEach((userId) => {
      convertUID(userId).then((username) =>
        setUsers((oldData) => [
          ...oldData,
          { username: username, userId: userId },
        ])
      );
    });
  };

  const AcceptIcon = (props) => <Icon name="checkmark-outline" {...props} />;
  const RejectIcon = (props) => <Icon name="close-outline" {...props} />;

  const renderItemAccessory = (userId) => (
    <ButtonGroup size="small">
      <Button
        accessoryLeft={AcceptIcon}
        onPress={() => {
          const self = doc(firestore, 'users', auth.currentUser.uid);
          const friend = doc(firestore, 'users', userId);
          updateDoc(self, {
            friends: arrayUnion(userId),
            received_requests: arrayRemove(userId),
          });
          updateDoc(friend, {
            friends: arrayUnion(auth.currentUser.uid),
            sent_requests: arrayRemove(auth.currentUser.uid),
          });
          fetchFriendRequests(setFriendRequests).then(() => getUsernames());
          fetchFriendListData(setFriendListData);
        }}
      ></Button>
      <Button
        accessoryLeft={RejectIcon}
        onPress={() => {
          const self = doc(firestore, 'users', auth.currentUser.uid);
          const friend = doc(firestore, 'users', userId);
          updateDoc(self, {
            received_requests: arrayRemove(userId),
          });
          updateDoc(friend, {
            sent_requests: arrayRemove(auth.currentUser.uid),
          });
          fetchFriendRequests(setFriendRequests).then(() => getUsernames());
          fetchFriendListData(setFriendListData);
        }}
      ></Button>
    </ButtonGroup>
  );

  const renderItem = ({ item }) => (
    <ListItem
      title={item.username}
      accessoryRight={() => renderItemAccessory(item.userId)}
    />
  );

  return <List style={styles.container} data={users} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
  button: {
    margin: 2,
  },
});
