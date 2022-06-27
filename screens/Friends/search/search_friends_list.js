import React from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { auth, firestore } from '../../../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import fetchSearchResults from './fetch_search_results';

export const SearchFriendsList = ({
  userInput,
  setSearchResults,
  searchResults,
}) => {
  const renderItemAccessory = (friend) => {
    if (friend.alreadyAdded) {
      return (
        <Button
          size="tiny"
          onPress={() => {
            const currentUser = auth.currentUser.uid;
            const sent = doc(firestore, 'users', currentUser);
            const received = doc(firestore, 'users', friend.userid);
            updateDoc(sent, {
              sent_requests: arrayRemove(friend.userid),
            });
            updateDoc(received, {
              received_requests: arrayRemove(currentUser),
            });
            fetchSearchResults(userInput, setSearchResults);
          }}
        >
          Pending
        </Button>
      );
    } else {
      return (
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
            fetchSearchResults(userInput, setSearchResults);
          }}
        >
          Add
        </Button>
      );
    }
  };

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => {
    if (item.alreadyFriends) {
      return <></>;
    } else {
      return (
        <ListItem
          title={`${item.username}`}
          accessoryLeft={renderItemIcon}
          accessoryRight={() => renderItemAccessory(item)}
        />
      );
    }
  };

  return (
    <List
      style={styles.container}
      data={searchResults}
      renderItem={renderItem}
    />
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
