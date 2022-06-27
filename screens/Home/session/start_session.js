import { auth, firestore } from '../../../firebase';
import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import isLoggedIn from '../../../utils/isLoggedIn';

const startSession = async (duration) => {
  if (isLoggedIn()) {
    const docRef = await addDoc(collection(firestore, 'sessions'), {
      duration: duration,
      host_id: auth.currentUser.uid,
      is_completed: false,
      start_time: serverTimestamp(),
      users: [],
    });
    await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
      current_session: docRef.id,
    });
  }
};

export default startSession;
