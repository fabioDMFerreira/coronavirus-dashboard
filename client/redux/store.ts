import { compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store: any = createStore(
  persistedReducer,
  composeEnhancers()
);

export const persistor = persistStore(store);

