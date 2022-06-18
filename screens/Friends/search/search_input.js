import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';

export default function SearchInput({ setData }) {
  const [findUser, setFindUser] = useState('');
  const handleSearch = async (username) => {
    const q = query(
      collection(firestore, 'users'),
      where('username', '>=', username)
    );
    const querySnapshot = await getDocs(q);
    setData([]);
    querySnapshot.forEach((doc) => {
      if (doc.id != auth.currentUser.uid) {
        setData((oldData) => [
          ...oldData,
          { username: doc.data().username, userid: doc.id },
        ]);
      }
    });
  };

  const searchButton = (props) => (
    <TouchableWithoutFeedback onPress={() => handleSearch(findUser)}>
      <Icon name="search-outline" {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      style={styles.input}
      placeholder="Enter username"
      value={findUser}
      onChangeText={(text) => setFindUser(text)}
      accessoryRight={searchButton}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
  },
});
