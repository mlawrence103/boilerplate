import { combineReducers } from 'redux';
import examplesReducer from './examples';

const appReducer = combineReducers({
  examples: examplesReducer,
});

export default appReducer;
