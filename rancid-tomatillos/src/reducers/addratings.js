export const addRatingsReducer = ( state = [], action ) => {
  switch(action.type) {
    case 'UPDATE_RATINGS':
      return action.ratings

    case 'DELETE_RATING':
      const ratings = state.filter(rating => {
      return parseInt(rating.id) !== parseInt(action.ratingId)
      })
      return ratings

    default:
      return state
  }
}