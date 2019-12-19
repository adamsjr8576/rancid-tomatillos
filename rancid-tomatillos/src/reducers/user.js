export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user

    case 'REMOVE_USER':
      return action.user

    default:
      return state   
  }
}