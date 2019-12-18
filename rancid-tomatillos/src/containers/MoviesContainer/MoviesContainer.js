import React from 'react';
import MovieCard from '../../Components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import './MoviesContainer.scss';
import { render } from 'react-dom';

const MoviesContainer = ({data}) => {
  const moviesList = data.movies.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        poster={movie.poster_path}
        avgRating={movie.average_rating}
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
  data: state.movies
});

export default connect(mapStateToProps)(MoviesContainer);
