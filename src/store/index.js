import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistCombineReducers } from 'redux-persist';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  AsyncStorage,
};

const reducer = persistCombineReducers(persistConfig, reducers);

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
