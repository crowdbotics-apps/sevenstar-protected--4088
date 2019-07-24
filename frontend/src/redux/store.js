import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { StatusBar,AsyncStorage } from 'react-native';
import { middleware } from '../navigators/AppNavigator';

import reducers from './reducers';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


// redux debugging
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const persistConfig = {
  key: 'root',
  storage,
  //blacklist: ['navigation']
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, middleware)));

export default store;
