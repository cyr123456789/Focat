import React, { useCallback } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';
import isLoggedIn from '../../../utils/isLoggedIn';

export const FriendsList = ({
  temp,
  setTemp,
  friendListData,
  setFriendListData,
}) => {
  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn()) {
        const unsubscribe = onSnapshot(
          doc(firestore, 'users', auth.currentUser.uid),
          (userDoc) => {
            fetchFriendListData({ temp, setTemp, setFriendListData });
          },
          (error) => {
            console.log(error.code);
          }
        );
        return () => unsubscribe();
      }
    }, [])
  );

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
        <Button
          style={styles.button}
          size="small"
          onPress={() => {
            const userDoc = doc(firestore, 'users', auth.currentUser.uid);
            const friendDoc = doc(firestore, 'users', props.id);
            updateDoc(userDoc, {
              friends: arrayRemove(props.id),
            });
            updateDoc(friendDoc, {
              friends: arrayRemove(auth.currentUser.uid),
            });
            fetchFriendListData({ temp, setTemp, setFriendListData });
          }}
        >
          Delete
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
    return (
      <Text style={styles.noFriendsText}>
        You have no friends. Add them now!
      </Text>
    );
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
  noFriendsText: {
    margin: 20,
  },
});
