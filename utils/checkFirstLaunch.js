import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LAUNCHED = 'hasLaunched';

const setLaunched = () => {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
};

const isFirstLaunch = async () => {
  try {
    const launchedStatus = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (launchedStatus === null) {
      setLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default isFirstLaunch;
