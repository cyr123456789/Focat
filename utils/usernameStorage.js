import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUsername = async (value) => {
  await AsyncStorage.setItem('USERNAME', value);
};

const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem('USERNAME');
    if (value != null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const removeUsername = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
};

export { storeUsername, getUsername, removeUsername };
