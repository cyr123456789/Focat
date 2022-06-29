import React, { useEffect } from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Layout,
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import fetchFriendListData from './fetch_friend_list_data';
import joinFriendSession from './join_friend_session';
import { useNavigation } from '@react-navigation/native';

export const FriendsList = ({ friendListData, setFriendListData }) => {
  useEffect(() => {
    fetchFriendListData({setFriendListData});
  }, []);

  const navigation = useNavigation();

  const renderItemAccessory = (props) => {
    const disabled = props.current_session === 'NIL' ? true : false;
    return (
      <Layout style={styles.buttonContainer}>
        <Button
          style={styles.button}
          size="small"
          onPress={() => {
            joinFriendSession(props.current_session).then(() =>
              navigation.navigate('Home')
            );
          }}
          disabled={disabled}
        >
          Join
        </Button>
        <Button style={styles.button} size="small">
          View
        </Button>
      </Layout>
    );
  };
  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.username}
        accessoryLeft={renderItemIcon}
        accessoryRight={() => renderItemAccessory(item)}
      />
    );
  };

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
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 4,
  },
});
