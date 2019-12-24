import React from 'react';
import MovieCard from '../../Components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import './MoviesContainer.scss';

const MoviesContainer = ({ data, userRatings, isLoggedIn }) => {
  const moviesList = data.movies.map(movie => {
    const movieRating = userRatings.filter(userRating => parseInt(userRating.movie_id) === parseInt(movie.id));
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        poster={movie.poster_path}
        avgRating={movie.average_rating}
        userRating={movieRating}
        isLoggedIn={isLoggedIn}
      />
    )
  });

  return (
    <main className='main-movies-container'>
      {moviesList}
    </main>
  );
}

const mapStateToProps = state => ({
  data: state.movies,
  userRatings: state.userRatings,
  isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(MoviesContainer);
