import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import combineReducers from './reducer';

// mmkv storages
import {storage} from '../storages';

const mmkvStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  version: 0,
  whitelist: [
    'authSiswa',
    'authGuru',
    'authMesin',
    'profilSayaGuru',
    'ProfilSayaSiswa',
  ],
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware({
          serializableCheck: false,
        }).concat(logger)
      : getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
