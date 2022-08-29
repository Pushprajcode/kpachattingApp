import {combineReducers} from 'redux';
// import SignUpReducer from '../../screens/signup/reducer';
import LoginReducer from '../../screens/logIn/reducer';
import profileReducer from '../../screens/profile/reducer';
const rootReducer = combineReducers({
  LoginReducer,
  profileReducer

});
export default rootReducer;
