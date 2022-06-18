import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { auth, firestore } from '../../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export const SearchFriendsList = (data) => {
  const renderItemAccessory = (friend) => (
    <Button
      size="tiny"
      onPress={() => {
        const currentUser = auth.currentUser.uid;
        const sent = doc(firestore, 'users', currentUser);
        const received = doc(firestore, 'users', friend.userid);
        updateDoc(sent, {
          sent_requests: arrayUnion(friend.userid),
        });
        updateDoc(received, {
          received_requests: arrayUnion(currentUser),
        });
      }}
    >
      Add
    </Button>
  );

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.username}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory(item)}
    />
  );

  return (
    <List style={styles.container} data={data.data} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 250,
  },
  button: {
    margin: 2,
  },
});
