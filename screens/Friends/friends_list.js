import React, { useState, useEffect } from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';


export const FriendsList = () => {
  const data = ['Placeholder'];
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      data.pop();
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        data.push(doc.data().username);
      });
    };
    fetchData().catch(console.error);
  });
  const renderItemAccessory = (props) => <Button size="tiny">View</Button>;

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return <List style={styles.container} data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '90%',
    width: '90%',
  },
});
