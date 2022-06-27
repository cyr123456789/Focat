import { auth, firestore } from '../../../firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import isLoggedIn from '../../../utils/isLoggedIn';

const joinFriendSession = async (sessionId) => {
  if (isLoggedIn()) {
    await updateDoc(doc(firestore, 'sessions', sessionId), {
      users: arrayUnion(auth.currentUser.uid),
    });
    await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
      current_session: sessionId,
    });
  }
};

export default joinFriendSession;
