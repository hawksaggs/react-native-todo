import { AsyncStorage } from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';

export default class Storage {
  static async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  static async getData(key) {
    try {
      await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
