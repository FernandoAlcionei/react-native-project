import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducers';
import sagas from './sagas';

const config = {
  key: 'auth',
  storage: createSecureStore(),
  blacklist: [],
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, initialState, compose(...enhancers));
const persistor = persistStore(store, persistConfig);

const configureStore = () => ({ persistor, store });

sagaMiddleware.run(sagas);

export default configureStore;
