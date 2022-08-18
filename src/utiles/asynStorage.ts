import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeData = async (userid: any) => {
  try {
    console.log('-------->898948i498', userid);
    await AsyncStorage.setItem('userid',userid);
  } catch (e) {
    // saving error
  }
};
export const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('emailvalue');
  } catch (e) {
    // removing  error
  }

  console.log('Done.');
};
