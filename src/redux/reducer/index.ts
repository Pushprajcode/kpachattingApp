import {combineReducers} from 'redux';
import LoginReducer from '../../screens/logIn/reducer';
import profileReducer from '../../screens/profile/reducer';
import SignUpReducer from '../../screens/signup/reducer';

const rootReducer = combineReducers({
  LoginReducer,
  profileReducer,
  SignUpReducer,
});
export default rootReducer;
