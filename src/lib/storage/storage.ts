import {MMKV} from 'react-native-mmkv';

export enum AppStorageKeys {
  LANGUAGE = 'language',
}

export const storage = new MMKV();
