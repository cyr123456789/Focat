import { auth, firestore } from '../../firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import isLoggedIn from '../../utils/isLoggedIn';
import fetchDocument from '../../utils/fetch_document';

const stopSession = async () => {
  if (isLoggedIn()) {
    const docSnap = await fetchDocument('users', auth.currentUser.uid);

    await updateDoc(doc(firestore, 'users', docSnap.id), {
      current_session: '',
    });

    const sessionId = docSnap.data().current_session;

    await updateDoc(doc(firestore, 'sessions', sessionId), {
      end_time: serverTimestamp(),
    });

    const sessionDoc = await fetchDocument('sessions', sessionId);

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
  }
};

export default stopSession;
