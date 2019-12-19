import React from 'react';
import './MoviePage.scss';
import { connect } from 'react-redux';

const MoviePage = ({ id, movies }) => {
  let movie = movies.movies.find(movie => movie.id === parseInt(id));
  const { average_rating, backdrop_path, overview, poster_path, release_date, title } = movie;
  return (
    <main className='movie-page-main'>
      <section className='movie-page-section' style={{backgroundImage:`url(${backdrop_path})`}} >
        <article className='movie-page-poster' style={{backgroundImage: `url(${poster_path})`}}>
        </article>
          <section className='movie-info-container'>
            <article className='movie-page-details'>
              <h2>{title}</h2>
              <p className='movie-overview'>{overview}</p>
              <p>{release_date}</p>
            </article>
            <article className='movie-page-details'>
              <h2>Rating</h2>
              <h2>{average_rating}</h2>
            </article>
          </section>
      </section>
    </main>
  )
}

const mapStateToProps = state => ({
  movies: state.movies
})

export default connect(mapStateToProps)(MoviePage);
