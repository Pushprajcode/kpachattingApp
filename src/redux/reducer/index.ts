import {combineReducers} from 'redux';
import LoginReducer from '../../screens/logIn/reducer';
import profileReducer from '../../screens/profile/reducer';
const rootReducer = combineReducers({
  LoginReducer,
  profileReducer,
});
export default rootReducer;
