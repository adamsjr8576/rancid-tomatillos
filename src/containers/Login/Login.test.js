import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps, mapStateToProps } from '../Login/Login';
import { addUser, updateLoggedIn, updateUserRatings } from '../../actions';


describe('Login Component', () => {
  let wrapper, mockAddUser, mockUpdateLoggedIn, mockUpdateUserRatings, mockDispatch, id, mockMovies;
  beforeEach(() => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;
    mockMovies = { movies: [{
      id:1,
      title:"Jumanji: The Next Level",
      poster_path:"https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
      backdrop_path:"https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
      release_date:"2019-12-04",
      overview:"In Jumanji: The Next Level",
      average_rating:6
    }]};
    mockAddUser = jest.fn();
    mockUpdateLoggedIn = jest.fn(() => 6);
    mockUpdateUserRatings = jest.fn();
    mockDispatch = jest.fn();
    id = 2;
    wrapper = shallow(<Login
      id={id}
      addUser = {mockAddUser}
      updateLoggedIn = {mockUpdateLoggedIn}
      updateUserRatings = {mockUpdateUserRatings}
      movies = {mockMovies}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should have a default state', () => {
    let mockDefaultState = {
      email: '',
      password: '',
      error: false,
      background: 'https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg'
    }

    expect(wrapper.state()).toEqual(mockDefaultState);
  });

  it('when handleChange is invoked it should setState', () => {
    let mockEvent = {
      target: {
      name: 'email',
      value: 'Charlie@turing.io'
      }
    };
    let mockState = {
      email: 'Charlie@turing.io',
      password: '',
      error: false,
      background: 'https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg'
    }

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(mockState)
  });

  it('should invoke handleSubmit when button is clicked', async () => {
    const apiCalls = require('../../apiCalls');
    const mockRatings = {ratings: [
      {
        id: 22,
        user_id: 6,
        movie_id: 4,
        rating: 10,
        created_at: "2019-12",
        updated_at: "2019-12"
      }]
    };

    const spyUser = jest.spyOn(apiCalls, 'fetchUser').mockImplementation(() => 6);
    const spyRatings = jest.spyOn(apiCalls, 'fetchRatings').mockImplementation(() => mockRatings);
    wrapper.instance().addUser = jest.fn();
    wrapper.instance().updateLoggedIn = jest.fn();
    wrapper.instance().updateUserRatings = jest.fn();


    spyUser.mockResolvedValue();
    spyRatings.mockResolvedValue();

    wrapper.find('#submit-btn').simulate('click');

    await Promise.resolve();

    expect(spyUser).toHaveBeenCalledTimes(1);
    // expect(spyRatings).toHaveBeenCalledTimes(1);
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with addUser', () => {
      let mappedProps = mapDispatchToProps(mockDispatch);
      let actionToDispatch = addUser({ id: 6 })
      mappedProps.addUser({ id: 6} )
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with updateLoggedIn', () => {
      let isLoggedIn = true;

      let mappedProps = mapDispatchToProps(mockDispatch);
      let actionToDispatch = updateLoggedIn( isLoggedIn )
      mappedProps.updateLoggedIn(isLoggedIn)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with updateUserRatings', () => {
      let mockRatings = [
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
      let mappedProps = mapDispatchToProps(mockDispatch);
      let actionToDispatch = updateUserRatings(mockRatings);
      mappedProps.updateUserRatings(mockRatings);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

  describe('mapStateToProps', () => {
    const mockState = {
      isLoggedIn: false,
      movies: ['Frozen 2', 'Add Astra', 'Pee Wees Big Adventure'],
      userRatings: [],
      userId: null
    };

    const expected = {
      loggedInStatus: false,
      movies: ['Frozen 2', 'Add Astra', 'Pee Wees Big Adventure']
    }

    it('should return an object from the store containing the user is logged in and get the movies', () => {
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected);
    });

  });
});
