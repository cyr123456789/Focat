import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const fetchDocument = async (collection, documentId) => {
  const docRef = doc(firestore, collection, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    console.log('No such document!');
  }
};

export default fetchDocument;
