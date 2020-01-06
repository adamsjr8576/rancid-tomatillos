import React from 'react';
import {shallow} from 'enzyme';
import { App, mapDispatchToProps, mapStateToProps } from './App';
import { addMovies, updateIsLoading } from '../../actions';
 
describe('App', () => {
  describe('App Component', () => {
    let addMovies, updateIsLoading;
  
    beforeEach(() => {
      addMovies = jest.fn();
      updateIsLoading = jest.fn();
    });

    it('should match the snapshot with all the data passed through', () => {
      const wrapper = shallow(<App 
          addMovies={addMovies}
          updateIsLoading={updateIsLoading}
          isLoading={true}
        />)
  
  
        expect(wrapper).toMatchSnapshot();
      });
  
      it('should render a different snapshot when isLoading is false', () => {
        const wrapper = shallow(<App 
          addMovies={addMovies}
          updateIsLoading={updateIsLoading}
          isLoading={false}
        />)
  
        expect(wrapper).toMatchSnapshot();
      });
  });
 
  describe('mapDispatchToProps', () => {
    it('should call dispatch with addMovies', () => {
      const movies = [{
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
        }];

      const mockDispatch = jest.fn();
      const actionToDispatch = addMovies(movies);
      
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.addMovies(movies)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with updateIsLoading', () => {
      const mockDispatch = jest.fn();
      const mockLoading = true;
      const actionToDispatch = updateIsLoading(mockLoading);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.updateIsLoading(mockLoading);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

  describe('mapStateToProps', () => {
    it('should return isLoading from the store', () => {
      const mockState = {
        isLoading: true,
        isLoggedIn: false
      };
  
      const expected = {
        isLoading: true
      };
  
      const mappedState = mapStateToProps(mockState);
  
      expect(mappedState).toEqual(expected);
    });
  });
});
