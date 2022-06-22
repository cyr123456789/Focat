import { auth } from '../firebase';

const isLoggedIn = () => {
  if (auth.currentUser === null) {
    return false;
  }
  return true;
}

export default isLoggedIn;