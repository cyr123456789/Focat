import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Card,
} from '@ui-kitten/components';
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
import { default as theme } from '../../assets/custom-theme.json';

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
    if (item.id === auth.currentUser.uid) {
      return <></>;
    } else if (item.alreadyAdded) {
      return (
        <Button
          size="small"
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
          style={styles.pendingButton}
        >
          Pending
        </Button>
      );
    } else if (item.alreadyFriends) {
      return (
        <Button disabled={true} size="small">
          Added
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
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
    <Card>
      <Layout style={styles.container}>
        <Layout style={{ width: '30%' }}>
          <Text>{item.username} </Text>
        </Layout>

        <Layout
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ width: 20, height: 20, marginRight: 5 }}
            source={require('../../assets/catcash.png')}
          ></Image>
          <Text>{item.cat_cash}</Text>
        </Layout>
        <Layout style={{ width: '30%' }}>{renderItemAccessory(item)}</Layout>
      </Layout>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <List data={data} renderItem={renderItem} />
    </Layout>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pendingButton: {
    backgroundColor: theme['color-primary-400'],
    borderWidth: 0,
  },
});
