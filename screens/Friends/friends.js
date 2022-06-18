import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import SearchFriendsModal from './search/search_friends_modal';
import { FriendsList } from './friends_list/friends_list';
import FriendRequestsModal from './friend_requests/friend_requests_modal';

const Friends = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  return (
    <Layout style={styles.container}>
      <SearchFriendsModal visible={showSearch} setVisible={setShowSearch} />
      <FriendRequestsModal visible={showRequests} setVisible={setShowRequests} />
      <Button style={styles.button} onPress={() => setShowSearch(true)}>
        Search
      </Button>
      <Button style={styles.button} onPress={() => setShowRequests(true)}>
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
