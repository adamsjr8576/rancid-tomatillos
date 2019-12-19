export const addRatingsReducer = ( state = [], action ) => {
  switch(action.type) {
    case 'UPDATE_RATINGS':
      return [...state, ...action.ratings]

    default:
      return state
  }
}