import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps, mapStateToProps } from '../Login/Login';
import { addUser, updateLoggedIn, updateUserRatings } from '../../actions';

describe('Login Component', () => {
  let wrapper, mockAddUser, mockUpdateLoggedIn, mockUpdateUserRatings, mockDispatch;
  beforeEach(() => {
    mockAddUser = jest.fn();
    mockUpdateLoggedIn = jest.fn();
    mockUpdateUserRatings = jest.fn();
    mockDispatch = jest.fn();
    wrapper = shallow(<Login 
      addUser = {mockAddUser}
      updateLoggedIn = {mockUpdateLoggedIn}
      updateUserRatings = {mockUpdateUserRatings}
    />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should have a default state', () => {
    let mockDefaultState = {
      email: '',
      password: '',
      error: false
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
      error: false
    }

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(mockState)
  });

  it('should invoke handleSubmit when button is clicked', () => {
    wrapper.instance().handleSubmit = jest.fn();
    wrapper.find('#submit-btn').simulate('click');
  
    expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
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

    const expected = { loggedInStatus: false }

    it('should check the store to see if the user is logged in', () => {
      const mappedProps = mapStateToProps(mockState)

      expect(mappedProps).toEqual(expected);
    });
  });
});