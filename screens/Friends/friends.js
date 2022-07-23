import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import SearchFriendsModal from './search/search_friends_modal';
import { FriendsList } from './friends_list/friends_list';
import FriendRequestsModal from './friend_requests/friend_requests_modal';

const Friends = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [friendListData, setFriendListData] = useState([]);
  const [temp, setTemp] = useState([]);

  return (
    <Layout style={styles.container}>
      <SearchFriendsModal visible={showSearch} setVisible={setShowSearch} />
      <FriendRequestsModal
        visible={showRequests}
        setVisible={setShowRequests}
        setFriendListData={setFriendListData}
      />
      <Layout style={styles.buttonContainer}>
        <Button style={styles.button} onPress={() => setShowSearch(true)}>
          Search Friends
        </Button>
        <Button style={styles.button} onPress={() => setShowRequests(true)}>
          Friend Requests
        </Button>
      </Layout>
      <FriendsList
        temp={temp}
        setTemp={setTemp}
        friendListData={friendListData}
        setFriendListData={setFriendListData}
      />
    </Layout>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  button: {
    margin: 4,
    width: '40%',
  },
});
