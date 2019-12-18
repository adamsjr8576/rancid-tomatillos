import { combineReducers } from 'redux';
import { movies } from '../reducers/movies'

const rootReducer = combineReducers({ 
  movies,
})

export default rootReducer;