import { combineReducers } from 'redux';
import { movies } from './movies';
import { addUserReducer } from './user';
import { isLoggedInReducer } from './isloggedin';

const rootReducer = combineReducers({ 
  movies,
  user: addUserReducer,
  isLoggedIn: isLoggedInReducer
})

export default rootReducer;