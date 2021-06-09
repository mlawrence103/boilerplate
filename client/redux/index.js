import { combineReducers } from 'redux';
import examplesReducer from './examples';
import authorizationReducer from './auth';

const appReducer = combineReducers({
  examples: examplesReducer,
  authorization: authorizationReducer,
});

export default appReducer;
