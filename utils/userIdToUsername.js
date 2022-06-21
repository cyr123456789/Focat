import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';

const convertUID = async (uid) => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().username;
  }
}

export default convertUID;