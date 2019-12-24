import { isLoggedInReducer } from './isLoggedin';

describe('isLoggedInReducer', () => {
  it('should return the initial state', () => {
    const expected = false;

    const result = isLoggedInReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the correct state if the action is UPDATE_LOGGED_IN', () => {
    const initialState = false;
    const action = {
      type: 'UPDATE_LOGGED_IN',
      isLoggedIn: true
    }

    const result = isLoggedInReducer(initialState, action);
    const expected = true;

    expect(result).toEqual(expected);
  });
});
