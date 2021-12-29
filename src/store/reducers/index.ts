import { combineReducers } from 'redux';
import mainReducer from '../../container/main/reducer';

const appReducers = combineReducers({
  mainDetails: mainReducer,
});

export default appReducers;
