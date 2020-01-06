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
    id: null
  }
}

export const updateUserRatings = ratings => {
  return {
    type: 'UPDATE_RATINGS',
    ratings
  }
}

export const updateIsLoading = isLoading => {
  return {
    type: 'UPDATE_IS_LOADING',
    isLoading: !isLoading
  }
}

export const deleteUserRating = ratingId => {
  return {
    type: 'DELETE_RATING',
    ratingId: ratingId
  }
}