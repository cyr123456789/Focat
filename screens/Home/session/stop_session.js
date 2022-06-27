import { auth, firestore } from '../../../firebase';
import {
  arrayRemove,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import isLoggedIn from '../../../utils/isLoggedIn';
import fetchDocument from '../../../utils/fetchDocument';

const stopSession = async () => {
  if (isLoggedIn()) {
    const docSnap = await fetchDocument('users', auth.currentUser.uid);
    const sessionId = docSnap.data().current_session;

    await updateDoc(doc(firestore, 'users', docSnap.id), {
      current_session: '',
    });

    const sessionDoc = await fetchDocument('sessions', sessionId);

    if (sessionDoc.data().host_id === auth.currentUser.uid) {
      await updateDoc(doc(firestore, 'sessions', sessionId), {
        end_time: serverTimestamp(),
      });

      sessionDoc.data().users.forEach(async (userId) => {
        await updateDoc(doc(firestore, 'users', userId), {
          current_session: '',
        });
      });

      if (
        sessionDoc.data().start_time.seconds + sessionDoc.data().duration <=
        sessionDoc.data().end_time.seconds
      ) {
        await updateDoc(doc(firestore, 'sessions', sessionId), {
          successfully_completed: true,
          is_completed: true,
        });
      } else {
        await updateDoc(doc(firestore, 'sessions', sessionId), {
          successfully_completed: false,
          is_completed: true,
        });
      }
    } else {
      await updateDoc(doc(firestore, 'sessions', sessionId), {
        users: arrayRemove(auth.currentUser.uid),
      });
    }
  }
};

export default stopSession;
