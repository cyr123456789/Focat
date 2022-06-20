import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';

const fetchFriendRequests = async (setData) => {
  const docRef = doc(firestore, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setData([]);
    docSnap.data().received_requests.forEach((userId) => {
      setData((oldData) => [...oldData, userId]);
    });
  }
};

export default fetchFriendRequests;
