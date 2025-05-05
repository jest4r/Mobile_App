import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
// import counterSlice from './counterSlice';
import userSlice from './userSlice';
import productSlice from './productSlice';

export const allReducers = combineReducers({
  user: userSlice,
  product: productSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // persist
  // whitelist: [
  //   'accountReducer'
  // ],
  //not persist
  blacklist: [
    // 'dict',
    // 'auth'
  ],
};

// let reducer = persistCombineReducers(config, allReducers)
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});