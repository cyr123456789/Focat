import React, { useEffect } from 'react';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import fetchFriendListData from './fetch_friend_list_data';

export const FriendsList = ({ friendListData, setFriendListData }) => {
  useEffect(() => {
    fetchFriendListData(setFriendListData);
  }, []);

  const renderItemAccessory = () => <Button size="tiny">View</Button>;

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={item}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  if (friendListData.length == 0) {
    return <Text>Loading</Text>;
  } else {
    return (
      <List
        style={styles.container}
        data={friendListData}
        renderItem={renderItem}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '90%',
    width: '90%',
  },
});
