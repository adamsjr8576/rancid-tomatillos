export const addRatingsReducer = ( state = [], action ) => {
  switch(action.type) {
    case 'UPDATE_RATINGS':
      return [...action.ratings]

    default:
      return state
  }
}