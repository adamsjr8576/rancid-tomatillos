export const addUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.id

    case 'REMOVE_USER':
      return action.id

    default:
      return state   
  }
}