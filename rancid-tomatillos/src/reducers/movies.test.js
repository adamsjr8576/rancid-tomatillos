import { movies } from './movies';

describe('movies Reducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = movies(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should add movies data to redux store', () => {
    const mockMoviesData = {movies: 
    [{
      id:1,
      title:"Jumanji: The Next Level",
      poster_path:"https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
      backdrop_path:"https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
      release_date:"2019-12-04",
      overview:"In Jumanji: The Next Level, the gang is back to escape the world's most dangerous game.",
      average_rating:6.166666666666667
    },
    {
      id:2,
      title:"Ad Astra",
      poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
      backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
      release_date:"2019-09-17",
      overview:"The near future, astronaut Roy McBride undertakes a mission in search of the unknown.",
      average_rating:5
    }
    ]};

    const mockAction = {type: 'ADD_MOVIES', movies: mockMoviesData};
    const expected = mockMoviesData;
    const result = movies(undefined, mockAction);

    expect(result).toEqual(expected);
  });
});