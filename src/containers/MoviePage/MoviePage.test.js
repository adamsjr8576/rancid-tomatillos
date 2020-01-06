import React from 'react';
import {shallow} from 'enzyme';
import { MoviePage, mapStateToProps, mapDispatchToProps } from './MoviePage';
import { updateUserRatings } from '../../actions';

 
describe('Movie Page', () => {
  describe('Movie Page Component', () => {
    let wrapper, movies, userId, userRatings, updateUserRatings;
    beforeEach(() => {
      movies = {movies: 
        [{
          id:2,
          title:"Jumanji: The Next Level",
          poster_path:"https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
          release_date:"2019-12-04",
          overview:"In Jumanji: The Next Level, the gang is back to escape the world's most dangerous game.",
          average_rating:6.166666666666667
        },
        {
          id:15,
          title:"Ad Astra",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The near future, astronaut Roy McBride undertakes a mission in search of the unknown.",
          average_rating:5
        },
        {
          id:16,
          title:"Star Wars: The Rise Of Skywalker",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The conclusion of the Skywalker timeline, in a galaxy far far away.",
          average_rating:5
        },
      
        {
          id:18,
          title:"The Count of Monte Cristo",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The ultimate tale of revenge and adventure.",
          average_rating:10
        }]
      };
      userRatings = [
        {
          id:22,
          user_id:6,
          movie_id:4,
          rating:10,
          created_at:"2019-12-19T21:47:31.647Z",
          updated_at:"2019-12-19T21:47:31.647Z"
        },
        {
          id:23,
          user_id:6,
          movie_id:15,
          rating:8,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:16,
          user_id:6,
          movie_id:16,
          rating:5,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:18,
          user_id:6,
          movie_id:18,
          rating:2,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        }
      ]
        userId = 6;
        updateUserRatings = jest.fn();
    });
    
    it('should match the snapshot when the user is logged in and the movie is not rated', () => {
      const isLoggedIn = true
      wrapper = shallow(<MoviePage 
        id={2}
        movies={movies}
        isLoggedIn={isLoggedIn}
        userId={userId}
        userRatings={userRatings}
      />)
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the user is logged in and the movie has been rated', () => {
      const isLoggedIn = true
      wrapper = shallow(<MoviePage 
        id={15}
        movies={movies}
        isLoggedIn={isLoggedIn}
        userId={userId}
        userRatings={userRatings}
      />)
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the isLoggedIn is false', () => {
      const isLoggedIn = false
      wrapper = shallow(<MoviePage 
        id={15}
        movies={movies}
        isLoggedIn={isLoggedIn}
        userId={userId}
        userRatings={userRatings}
      />)
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the user is logged in and the correct movie has been rated', () => {
      const isLoggedIn = true
      wrapper = shallow(<MoviePage 
        id={18}
        movies={movies}
        isLoggedIn={isLoggedIn}
        userId={userId}
        userRatings={userRatings}
      />)
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the user is logged in and the correct movie has been rated', () => {
      const isLoggedIn = true
      wrapper = shallow(<MoviePage 
        id={16}
        movies={movies}
        isLoggedIn={isLoggedIn}
        userId={userId}
        userRatings={userRatings}
      />)
      expect(wrapper).toMatchSnapshot();
    });
    describe('handleRatingSubmit', () => {
      it('should be called when a user clicks on the rate button', async () => {
        const apiCalls = require('../../apiCalls');
        const isLoggedIn = true;
        const wrapper = shallow(<MoviePage 
          id={2}
          movies={movies}
          isLoggedIn={isLoggedIn}
          userId={userId}
          userRatings={userRatings}
        />);
        const postSpy = jest.spyOn(apiCalls, 'postUserRating');
        const ratingsSpy = jest.spyOn(apiCalls, 'fetchRatings');

        postSpy.mockResolvedValue();
        ratingsSpy.mockResolvedValue();

        wrapper.find('.rate-btn').simulate('click');

        await Promise.resolve();

        expect(postSpy).toHaveBeenCalledTimes(1);
        expect(ratingsSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('deleteRating', () => {
      it('should invoke deleteApiRating when the delete rating button is clicked', async () => {
        const apiCalls = require('../../apiCalls');
        const isLoggedIn = true;
        const wrapper = shallow(<MoviePage
          id={18}
          movies={movies}
          isLoggedIn={isLoggedIn}
          userId={userId}
          userRatings={userRatings}
        />);
        const deleteSpy = jest.spyOn(apiCalls, 'deleteApiRating');
        
        deleteSpy.mockResolvedValue();

        wrapper.find('.delete-rating-btn').simulate('click');

        await Promise.resolve();

        expect(deleteSpy).toHaveBeenCalledTimes(1);
      });

      it('should invoke deleteRating when the delete rating button is clicked', () => {
        const isLoggedIn = true;
        const wrapper = shallow(<MoviePage 
          id={18}
          movies={movies}
          isLoggedIn={isLoggedIn}
          userId={userId}
          userRatings={userRatings}
        />)
        wrapper.instance().deleteRating = jest.fn();

        wrapper.find('.delete-rating-btn').simulate('click');

        expect(wrapper.instance().deleteRating).toHaveBeenCalled()
      })
    });

    describe('determineIcon', () => {
      let images, isLoggedIn, wrapper;

      beforeEach(() => {
        images = require('../../images/images');
        isLoggedIn = true;
        wrapper = shallow(<MoviePage 
          id={2}
          movies={movies}
          isLoggedIn={isLoggedIn}
          userId={userId}
          userRatings={userRatings}
        />);
      });

      it('should return a good Tomatillo image if the rating is higher than 6', () => {
        const expected = "goodTomatillo.png";
        expect(wrapper.instance().determineIcon(9)).toEqual(expected);
      });

      it('should return a good Tomatillo image if the rating is higher than 6', () => {
        const expected = "okayTomatillo.png";
        expect(wrapper.instance().determineIcon(5)).toEqual(expected);
      });

      it('should return a bad Tomatillo image if the rating is higher than 6', () => {
        const expected = "badTomatillo.png";
        expect(wrapper.instance().determineIcon(3)).toEqual(expected);
      });
    });

    describe('onStarClick', () => {
      it('should update state when onStarClick is invoked', () => {
        wrapper.instance().setState({rating: 1});
        wrapper.instance().onStarClick(7);
        const expected = {rating: 7};
        expect(wrapper.state()).toEqual(expected);
      });
    });

  });
  describe('mapDispatchToProps', () => {
    it('should call dispatch with updateUserRatings', () => {
      const userRatings = [
        {
          id:22,
          user_id:6,
          movie_id:4,
          rating:10,
          created_at:"2019-12-19T21:47:31.647Z",
          updated_at:"2019-12-19T21:47:31.647Z"
        },
        {
          id:23,
          user_id:6,
          movie_id:15,
          rating:8,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:16,
          user_id:6,
          movie_id:16,
          rating:5,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:18,
          user_id:6,
          movie_id:18,
          rating:2,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        }
      ];
      const mockDispatch = jest.fn();
      const actionToDispatch = updateUserRatings(userRatings);
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.updateUserRatings(userRatings);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
  describe('mapStateToProps', () => {
    it('should return a props object with movies object, isLoggedIn, userId, and userRatings', () => {
      const mockMovies = {movies: 
        [{
          id:2,
          title:"Jumanji: The Next Level",
          poster_path:"https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
          release_date:"2019-12-04",
          overview:"In Jumanji: The Next Level, the gang is back to escape the world's most dangerous game.",
          average_rating:6.166666666666667
        },
        {
          id:15,
          title:"Ad Astra",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The near future, astronaut Roy McBride undertakes a mission in search of the unknown.",
          average_rating:5
        },
        {
          id:16,
          title:"Star Wars: The Rise Of Skywalker",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The conclusion of the Skywalker timeline, in a galaxy far far away.",
          average_rating:5
        },
      
        {
          id:18,
          title:"The Count of Monte Cristo",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The ultimate tale of revenge and adventure.",
          average_rating:10
        }]
      };
      const mockUserRatings = [
        {
          id:22,
          user_id:6,
          movie_id:4,
          rating:10,
          created_at:"2019-12-19T21:47:31.647Z",
          updated_at:"2019-12-19T21:47:31.647Z"
        },
        {
          id:23,
          user_id:6,
          movie_id:15,
          rating:8,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:16,
          user_id:6,
          movie_id:16,
          rating:5,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        },
        {
          id:18,
          user_id:6,
          movie_id:18,
          rating:2,
          created_at:"2019-12-19T22:05:16.098Z",
          updated_at:"2019-12-19T22:05:16.098Z"
        }
      ];

      const mockState = {
        movies: mockMovies,
        isLoggedIn: true,
        userId: 6,
        userRatings: mockUserRatings,
        test: {title: 'Object to show that only requested props are being mapped'}
      };

      const expected = {
        movies: mockMovies,
        isLoggedIn: true,
        userId: 6,
        userRatings: mockUserRatings
      };

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});