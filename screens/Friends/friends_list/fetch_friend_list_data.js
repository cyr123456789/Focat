import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../../firebase';
import convertUID from '../../../utils/userIdToUsername';

const fetchFriendListData = async (setFriendListData) => {
  const docRef = doc(firestore, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setFriendListData([]);
    docSnap.data().friends.forEach((userId) => {
      convertUID(userId).then((username) =>
        setFriendListData((oldData) => [...oldData, username])
      );
    });
  }
};

export default fetchFriendListData;
