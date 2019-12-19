export const addMovies = movies => {
  return { 
    type: 'ADD_MOVIES',
    movies
  }
}

export const addUser = id => {
  return {
    type: 'ADD_USER',
    id
  }
}

export const updateLoggedIn = isLoggedIn => {
  return {
    type: 'UPDATE_LOGGED_IN',
    isLoggedIn: !isLoggedIn
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
    user: {}
  }
}