import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Button, Card } from '@ui-kitten/components';
import SearchInput from './search_input';
import { SearchFriendsList } from './search_friends_list';

const SearchFriendsModal = ({ visible, setVisible }) => {
  const [findUser, setFindUser] = useState('');
  const [data, setData] = useState([]);

  return (
    <Modal style={styles.container} visible={visible}>
      <Card>
        <SearchInput
          findUser={findUser}
          setFindUser={setFindUser}
          data={data}
          setData={setData}
        />
        <SearchFriendsList data={data} />
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
});
