import React, { useState, useEffect } from 'react';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';
import convertUID from '../../../utils/userIdToUsername';

export const FriendsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData([]);
        docSnap.data().friends.forEach((userId) => {
          convertUID(userId).then((username) =>
            setData((oldData) => [...oldData, username])
          );
        });
      }
    };
    fetchData().catch(console.error);
  }, []);

  const renderItemAccessory = (props) => <Button size="tiny">View</Button>;

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      title={item}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );
  if (data.length == 0) {
    return <Text>Loading</Text>;
  } else {
    return (
      <List style={styles.container} data={data} renderItem={renderItem} />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '90%',
    width: '90%',
  },
});
