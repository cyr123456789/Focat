import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import SearchFriendsModal from './search_friends_modal';
import { FriendsList } from './friends_list';

const Friends = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Layout style={styles.container}>
      <SearchFriendsModal visible={showSearch} setVisible={setShowSearch} />
      <Button style={styles.button} onPress={() => setShowSearch(true)}>
        Search
      </Button>
      <Button style={styles.button}>
        Friend Requests
      </Button>
      <FriendsList />
    </Layout>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 4
  }
});
