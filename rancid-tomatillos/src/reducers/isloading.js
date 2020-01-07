export const isLoadingReducer = (state = true, action) => {
  switch (action.type) {
    case 'UPDATE_IS_LOADING' :
      return action.isLoading
    default :
      return state
  }
}
