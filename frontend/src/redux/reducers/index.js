import { combineReducers } from 'redux';

import NavigationReducer from './Navigation';
import Auth from './Auth';

const reducers = combineReducers({
  navigation: NavigationReducer,
  auth:Auth
});

export default reducers;
