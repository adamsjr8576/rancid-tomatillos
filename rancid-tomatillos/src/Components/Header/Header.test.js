import React from 'react';
import { shallow } from 'enzyme';
import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { removeUser, updateLoggedIn } from '../../actions';


describe('Header', () => {
  let mockData;
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
    }
  });

  describe('Header Component', () => {
    let wrapper;
    let mockRemoveUser;
    let mockUpdateLoggedIn;
    let mockPath;

    beforeEach(() => {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => .05;
      global.Math = mockMath;
      mockRemoveUser = jest.fn();
      mockUpdateLoggedIn = jest.fn();
      mockPath = '/'
      wrapper = shallow(
        <Header
          data={mockData}
          isLoggedIn={true}
          removeUser={mockRemoveUser}
          updateLoggedIn={mockUpdateLoggedIn}
          path={mockPath}
        />
      )
    });

    it('should match the snapshot with correct data passed in', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should call updateLoggedIn and removeUser on button click', () => {
      wrapper.find('.header-btn-logout').simulate('click');

      expect(mockUpdateLoggedIn).toHaveBeenCalledWith(true);
      expect(mockRemoveUser).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with the movies data and the isLogged in boolean', () => {
      const mockState = {
        movies: mockData,
        isLoggedIn: true,
        userId: 6
      };
      const expected = {
        data: mockData,
        isLoggedIn: true
      };

      const mappedPropped = mapStateToProps(mockState);
      expect(mappedPropped).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with removeUser action when logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = removeUser();
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.removeUser();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with updateLoggedIn action when logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = updateLoggedIn(false);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.updateLoggedIn();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })
  });

});
