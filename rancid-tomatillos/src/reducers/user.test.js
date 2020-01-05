import { addUserReducer } from './user';

describe('addUserReducer', () => {
  it('should return the current state', () => {
    const expected = null;
    const mockAction = {}
    const result = addUserReducer(undefined, mockAction);

    expect(result).toEqual(expected)
  });

  it('should return the correct state when the action is ADD_USER', () => {
    const initialState = null;
    const id = 5;

    const action = {
      type: 'ADD_USER',
      id
    }

    const result = addUserReducer(initialState, action);
    const newState = 5;

    expect(result).toEqual(newState)
  });

  it('should return the correct state when the action is REMOVE_USER', () => {
    const initialState = 5;
    const id = 5;

    const action = {
      type: 'REMOVE_USER',
      id
    }

    const result = addUserReducer(initialState, action);
    const newState = null;

    expect(result).toEqual(newState)
  })
})

