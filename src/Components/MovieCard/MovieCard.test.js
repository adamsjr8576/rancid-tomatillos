import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from '../MovieCard/MovieCard';

describe('MovieCard component', () => {
  let isLoggedIn, userRating, movies;
  beforeEach(() => {
      isLoggedIn = false
      userRating = []
      movies = [{
        "id": 1,
        "title": "Jumanji: The Next Level",
        "poster_path": "https://image.tmdb.org/t/p/original//l4iknLOenijaB85Zyb5SxH1gGz8.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//zTxHf9iIOCqRbxvl8W5QYKrsMLq.jpg",
        "release_date": "2019-12-04",
        "overview": "In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game.",
        "average_rating": 6.333333333333333
      },
      {
        "id": 2,
        "title": "Ad Astra",
        "poster_path": "https://image.tmdb.org/t/p/original//xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
        "release_date": "2019-09-17",
        "overview": "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
        "average_rating": 6.857142857142857
      },]
  })

  it('should match the snapshot with all the data being passed in correctly while not logged in', () => {
    const wrapper = shallow(<MovieCard 
      key={movies[0].id}
      id={movies[0].id}
      poster={movies[0].poster_path}
      avgRating={movies[0].average_rating}
      userRating={userRating}
      isLoggedIn={isLoggedIn}
    />)

    expect(wrapper).toMatchSnapshot()
  });

  it('should match the snapshot while the user is loggedIn but with no userRatings', () => {
    isLoggedIn = true;
    const wrapper = shallow(<MovieCard
      key={movies[0].id}
      id={movies[0].id}
      poster={movies[0].poster_path}
      avgRating={movies[0].average_rating}
      userRating={userRating}
      isLoggedIn={isLoggedIn}
    />)

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot while the user is loggedIn and there are userRatings', () => {
    isLoggedIn = true;
    userRating = [6]
    const wrapper = shallow(<MovieCard
      key={movies[0].id}
      id={movies[0].id}
      poster={movies[0].poster_path}
      avgRating={movies[0].average_rating}
      userRating={userRating}
      isLoggedIn={isLoggedIn}
    />)

    expect(wrapper).toMatchSnapshot();
  })
})