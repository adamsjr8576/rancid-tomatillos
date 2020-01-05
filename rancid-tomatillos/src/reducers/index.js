import { combineReducers } from 'redux';
import { movies } from './movies';
import { addUserReducer } from './user';
import { isLoggedInReducer } from './isloggedin';
import { addRatingsReducer } from './addratings';
import { isLoadingReducer } from './isloading';

const rootReducer = combineReducers({
  movies,
  userId: addUserReducer,
  isLoggedIn: isLoggedInReducer,
  userRatings: addRatingsReducer,
  isLoading: isLoadingReducer
})

export default rootReducer;
