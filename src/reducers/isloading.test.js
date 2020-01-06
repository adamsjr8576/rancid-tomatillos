import { isLoadingReducer } from './isloading';

describe('isLoadingReducer', () => {
  it('should return the initial state', () => {
    const expected = true;
    const result = isLoadingReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the correct state if the action type is UPDATE_IS_LOADING', () => {
    const initialState = true;
    const actionObject = {
      type: 'UPDATE_IS_LOADING',
      isLoading: false
    }
    const expected = false;
    const result = isLoadingReducer(initialState, actionObject);

    expect(result).toEqual(expected);
  });
});
