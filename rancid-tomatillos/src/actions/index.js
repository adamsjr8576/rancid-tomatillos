export const addMovies = movies => {
  return { 
    type: 'ADD_MOVIES',
    movies
  }
}

export const addUser = user => {
  return {
    type: 'ADD_USER',
    user
  }
}

export const updateLoggedIn = isLoggedIn => {
  return {
    type: 'UPDATE_LOGGED_IN',
    isLoggedIn: !isLoggedIn
  }
}