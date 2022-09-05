import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '.';

const enhancer = compose(applyMiddleware(thunk, createLogger({})));
const persistConfig = {
  key: 'root',
  timout: 0,
  storage: AsyncStorage,
  whitelist: ['SignUpReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
