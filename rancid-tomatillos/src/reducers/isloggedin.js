export const isLoggedInReducer = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_LOGGED_IN':
      return action.isLoggedIn
    default:
      return state
  }
}