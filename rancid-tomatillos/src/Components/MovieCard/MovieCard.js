import React from 'react';

const MovieCard = ({ id, poster, avgRating }) => {
  return (
    <article data-id={id} className='movie-card'>
      <img src={poster} alt='movie poster image' className='movie-card-img' />
      <section className='section-avg-rating'>
        <p className='average-rating-p'>Average Rating</p>
        <p className='average-rating-num'>{avgRating}</p>
      </section>
    </article>
  )
}

export default MovieCard;
