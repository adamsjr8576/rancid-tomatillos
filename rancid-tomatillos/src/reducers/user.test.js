import React from 'react';
import { addUserReducer } from './user';

describe('addUserReducer', () => {
  it('should return the current state', () => {
    const expected = '';
    const mockAction = {
      type: 'ADD_USER',
      action: 4
    }
    const result = addUserReducer(undefined, mockAction);

    expected(result).toEqual(expected)
  })
})