import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';
import convertUID from '../../../utils/userIdToUsername';
import fetchFriendCurrentSession from './fetch_friend_current_session';

const fetchFriendListData = async ({ temp, setTemp, setFriendListData }) => {
  const docRef = doc(firestore, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setTemp([]);
    setFriendListData([]);
    docSnap.data().friends.forEach((userId) => {
      fetchFriendCurrentSession(userId).then((res) => {
        convertUID(userId).then((username) => {
          if (temp === null || temp.indexOf(username) === -1) {
            setTemp((oldData) => [...oldData, username]);
            setFriendListData((oldData) => [
              ...oldData,
              {
                username: username,
                current_session: res === '' ? 'NIL' : res,
              },
            ]);
          }
        });
      });
    });
  }
};
export default fetchFriendListData;
