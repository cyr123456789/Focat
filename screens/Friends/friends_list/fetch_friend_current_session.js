import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';

const fetchFriendCurrentSession = async (userId) => {
  const docRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().current_session;
  }
};

export default fetchFriendCurrentSession;
