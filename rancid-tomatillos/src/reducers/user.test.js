import React from 'react';
import { addUserReducer } from './user';

describe('addUserReducer', () => {
  it('should return the current state', () => {
    const expected = null;
    const mockAction = {}
    const result = addUserReducer(undefined, mockAction);

    expect(result).toEqual(expected)
  });
})