import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Button, Card } from '@ui-kitten/components';
import SearchInput from './search_input';
import { SearchFriendsList } from './search_friends_list';

const SearchFriendsModal = ({ visible, setVisible }) => {
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Modal
      style={styles.container}
      visible={visible}
      backdropStyle={styles.modalBackdrop}
    >
      <Card>
        <SearchInput
          userInput={userInput}
          setUserInput={setUserInput}
          setSearchResults={setSearchResults}
        />
        <SearchFriendsList
          userInput={userInput}
          setSearchResults={setSearchResults}
          searchResults={searchResults}
        />
        <Button onPress={() => setVisible(false)}>Close</Button>
      </Card>
    </Modal>
  );
};

export default SearchFriendsModal;

const styles = StyleSheet.create({
  container: {
    width: '65%',
  },
  modalBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
