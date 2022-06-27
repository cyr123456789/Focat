import { auth, firestore } from '../../../firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import isLoggedIn from '../../../utils/isLoggedIn';

// Returns the duration left in seconds for the current session.
const rejoinSession = async (setTimer, setRejoinProgress) => {
  if (isLoggedIn()) {
    const usersRef = doc(firestore, 'users', auth.currentUser.uid);
    const usersDoc = await getDoc(usersRef);
    if (usersDoc.exists() && usersDoc.data().current_session !== '') {
      const sessionsRef = doc(
        firestore,
        'sessions',
        usersDoc.data().current_session
      );
      updateDoc(sessionsRef, {
        check_time: serverTimestamp(),
      }).then(async () => {
        const sessionsDoc = await getDoc(sessionsRef);
        if (sessionsDoc.exists()) {
          const currentTimeLeft =
            sessionsDoc.data().duration -
            (sessionsDoc.data().check_time.seconds -
              sessionsDoc.data().start_time.seconds);
          setTimer(currentTimeLeft * 1000);
          setRejoinProgress(true);
        }
      });
    }
  }
};

export default rejoinSession;
