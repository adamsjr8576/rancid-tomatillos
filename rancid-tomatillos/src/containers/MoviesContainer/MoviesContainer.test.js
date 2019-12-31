import React from 'react';
import { shallow } from 'enzyme';
import { MoviesContainer, mapStateToProps } from './MoviesContainer';

describe('MoviesContainer', () => {
  let mockData;
  let mockUserRatings;
  beforeEach(() => {
    mockData = {
      movies: [{
        average_rating: 6,
        backdrop_path: "https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
        id: 1,
        overview: "In Jumanji: The Next Level",
        poster_path: "https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
        release_date: "2019-12-04",
        title: "Jumanji: The Next Level",
      },
      {
        average_rating: 5.666666666666667,
        backdrop_path: "https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
        id: 2,
        overview: "The near future",
        poster_path: "https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
        release_date: "2019-09-17",
        title: "Ad Astra",
      }]
    };
    mockUserRatings = [
      {
        created_at: "2019-12-19T21:47:31.647Z",
        id: 22,
        movie_id: 4,
        rating: 10,
        updated_at: "2019-12-19T21:47:31.647Z",
        user_id: 6
      },
      {
        created_at: "2019-12-19T22:05:16.098Z",
        id: 23,
        movie_id: 15,
        rating: 8,
        updated_at: "2019-12-19T22:05:16.098Z",
        user_id: 6
      }
    ];
  });
  describe('MoviesContainer Component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <MoviesContainer
          data={mockData}
          userRatings={mockUserRatings}
          isLoggedIn={true}
        />
      )
    });

    it('should match the snapshot with correct data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });

  });

  describe('mapStateToProps', () => {
    it('should return an object with data, userRatings, and isLoggedin', () => {
      const mockState = {
        movies: {mockData},
        userRatings: {mockUserRatings},
        isLoggedIn: true,
        userId: 6
      };
      const expected = {
        data: {mockData},
        userRatings: {mockUserRatings},
        isLoggedIn: true,
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});
