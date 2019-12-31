import * as actions from '../actions';

describe('actions', () => {
  it('should have a type of ADD_MOVIES', () => {
    const movies = {
      movies: [
        {
          id:1,
          title: "Jumanji: The Next Level",
          poster_path: "https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
          backdrop_path: "https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
          release_date: "2019-12-04",
          overview: "In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game.",
          average_rating: 6.166666666666667
        },
        {
          id:2,
          title:"Ad Astra",
          poster_path:"https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
          release_date:"2019-09-17",
          overview:"The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
          average_rating:5
        }
      ]
    }
    const expectedAction = {
      type: 'ADD_MOVIES',
      movies
    }
    const result = actions.addMovies(movies);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ADD_USER', () => {
    const id = 6;
    const expectedAction = {
      type: 'ADD_USER',
      id
    }
    const result = actions.addUser(id);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of updateLoggedIn', () => {
    const isLoggedIn = false;
    const expectedAction = {
      type: 'UPDATE_LOGGED_IN',
      isLoggedIn: true
    }
    const result = actions.updateLoggedIn(isLoggedIn);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of REMOVE_USER', () => {
    const expectedAction = {
      type: 'REMOVE_USER',
      id: null
    }
    const result = actions.removeUser();

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of UPDATE_RATINGS', () => {
    const ratings = [
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
      }
    ]
    const expectedAction = {
      type: 'UPDATE_RATINGS',
      ratings
    }
    const result = actions.updateUserRatings(ratings);

    expect(result).toEqual(expectedAction);
  });
});
