import {MMKV} from 'react-native-mmkv';
import {type StateStorage} from 'zustand/middleware';

export enum AppStorageKeys {
  LANGUAGE = 'language',
}

export const storage = new MMKV();

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    storage.delete(name);
  },
};
