import React from 'react';
import {shallow} from 'enzyme';
import { fetchUser, fetchRatings } from './apiCalls';
 
describe('apiCalls', () => {
  describe('fetchUser', () => {
    let mockOptions, mockResponse, mockState;

    beforeEach(() => {

      mockResponse = {
        user: {id: 1, name: "Alan", email: "Here.We.Go.Again@turing.io"}
      }

      mockState = {
        email: 'Here.We.Go.Again@turing.io',
        password: '2020',
        error: false
      }

      mockOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mockState)
      }

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });
     
    it('should fetch with the correct arguments', () => {
      const expected = ['https://rancid-tomatillos.herokuapp.com/api/v1/login', mockOptions];

      fetchUser(mockOptions);

      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return an object with the user data', () => {
      expect(fetchUser(mockOptions)).resolves.toEqual(mockResponse);
    });

    it('SAD: should throw an error if response is not okay', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });

      expect(fetchUser(mockOptions)).rejects.toEqual(Error('Incorrect Username/Password'))
    });

    it('SAD: should throw an error if promise does not resolve', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      });

      expect(fetchUser(mockOptions)).rejects.toEqual(Error('fetch failed'));
    });
  });

  describe('fetchRatings', () => {
    let mockId, mockResponse;
    beforeEach(() => {
      mockId = 6;

      mockResponse = {ratings: [
      { id: 22,
        user_id: 6,
        movie_id: 4,
        rating: 10,
        created_at: "2019-12-19T21:47:31.647Z",
        updated_at: "2019-12-19T21:47:31.647Z"
      },
      { id: 23,
        user_id: 6,
        movie_id: 15,
        rating: 8,
        created_at: "2019-12-19T22:05:16.098Z",
        updated_at: "2019-12-19T22:05:16.098Z"
      }
      ]};

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        });
      });
    });

    it('should fetch with the correct arguments', () => {
      const expected = 'https://rancid-tomatillos.herokuapp.com/api/v1/users/6/ratings'

      fetchRatings(mockId);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return an object with all of the user ratings', () => {
      expect(fetchRatings(mockId)).resolves.toEqual(mockResponse);
    });

    it('SAD: should throw an error if response is not okay', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        })
      });

      expect(fetchRatings(mockId)).rejects.toEqual(Error('Invalid User ID'))
    });

    it('SAD: should throw an error if promise does not resolve', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      });

      expect(fetchRatings(mockId)).rejects.toEqual(Error('fetch failed'));
    });
  });
});