import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, List, ListItem } from '@ui-kitten/components';
import { auth, firestore } from '../../firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const queryRef = collection(firestore, 'users');
    const q = query(queryRef, orderBy('cat_cash', 'desc'), limit(100));
    const querySnapshot = await getDocs(q);
    const userDocSnap = await getDoc(
      doc(firestore, 'users', auth.currentUser.uid)
    );
    setData([]);
    if (userDocSnap.exists()) {
      querySnapshot.forEach((doc) => {
        setData((oldData) => [
          ...oldData,
          {
            alreadyAdded: userDocSnap.data().sent_requests.includes(doc.id),
            alreadyFriends: userDocSnap.data().friends.includes(doc.id),
            id: doc.id,
            username: doc.data().username,
            cat_cash: doc.data().cat_cash,
          },
        ]);
      });
    }
  };

  const renderItemAccessory = (item) => {
    if (item.alreadyAdded) {
      return (
        <Button
          size="tiny"
          onPress={() => {
            const currentUser = auth.currentUser.uid;
            const sent = doc(firestore, 'users', currentUser);
            const received = doc(firestore, 'users', item.id);
            updateDoc(sent, {
              sent_requests: arrayRemove(item.id),
            });
            updateDoc(received, {
              received_requests: arrayRemove(currentUser),
            });
            fetchLeaderboardData();
            console.log('unadd');
          }}
        >
          Pending
        </Button>
      );
    } else if (item.alreadyFriends) {
      return (
        <Button disabled={true} size="tiny">
          Added
        </Button>
      );
    } else {
      return (
        <Button
          size="tiny"
          onPress={() => {
            const currentUser = auth.currentUser.uid;
            const sent = doc(firestore, 'users', currentUser);
            const received = doc(firestore, 'users', item.id);
            updateDoc(sent, {
              sent_requests: arrayUnion(item.id),
            });
            updateDoc(received, {
              received_requests: arrayUnion(currentUser),
            });
            fetchLeaderboardData();
            console.log('add');
          }}
        >
          Add
        </Button>
      );
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={`${item.username} `}
      description={`${item.cat_cash} `}
      accessoryRight={() => renderItemAccessory(item)}
    />
  );

  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>Top 100 Richest Users</Text>
      <List data={data} renderItem={renderItem} />
    </Layout>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
