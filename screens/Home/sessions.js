import { auth, firestore } from '../../firebase';
import {
  arrayRemove,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  addDoc,
  collection,
} from 'firebase/firestore';
import isLoggedIn from '../../utils/isLoggedIn';

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

const stopSession = async () => {
  if (isLoggedIn()) {
    const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
    await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
      current_session: '',
    });
    const sessionId = userDoc.data().current_session;
    const sessionDoc = await getDoc(doc(firestore, 'sessions', sessionId));

    if (sessionDoc.data().host_id === auth.currentUser.uid) {
      // End the session for everyone
      sessionDoc.data().users.forEach(async (userId) => {
        await updateDoc(doc(firestore, 'users', userId), {
          current_session: '',
        });
      });
      // Update end time of session
      await updateDoc(doc(firestore, 'sessions', sessionId), {
        end_time: serverTimestamp(),
      });

      // Set up listener for when session ends;
      const unsubscribe = onSnapshot(
        doc(firestore, 'sessions', sessionId),
        (session) => {
          if (session.data().end_time !== null) {
            if (
              session.data().start_time.seconds + session.data().duration <=
              session.data().end_time.seconds
            ) {
              updateDoc(doc(firestore, 'sessions', sessionId), {
                successfully_completed: true,
                is_completed: true,
              });
            } else {
              updateDoc(doc(firestore, 'sessions', sessionId), {
                successfully_completed: false,
                is_completed: true,
              });
            }
            unsubscribe();
          } else {
            console.log('Again');
          }
        }
      );
    } else {
      // Remove only yourself from users array
      await updateDoc(doc(firestore, 'sessions', sessionId), {
        users: arrayRemove(auth.currentUser.uid),
      });
    }
  }
};

export { startSession, stopSession };
