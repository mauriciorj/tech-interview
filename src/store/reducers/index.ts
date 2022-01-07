import { combineReducers } from 'redux';
import questionReducer from '../../container/questions/reducer';

const appReducers = combineReducers({
  questions: questionReducer,
});

export default appReducers;
