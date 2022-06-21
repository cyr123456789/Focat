import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';

const fetchSearchResults = async (userInput, setSearchResults) => {
  const q = query(
    collection(firestore, 'users'),
    where('username', '>=', userInput)
  );
  const querySnapshot = await getDocs(q);

  const docRef = doc(firestore, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  setSearchResults([]);
  querySnapshot.forEach((doc) => {
    if (doc.id != auth.currentUser.uid) {
      setSearchResults((oldData) => [
        ...oldData,
        {
          username: doc.data().username,
          userid: doc.id,
          alreadyAdded: docSnap.data().sent_requests.includes(doc.id),
        },
      ]);
    }
  });
};

export default fetchSearchResults;
