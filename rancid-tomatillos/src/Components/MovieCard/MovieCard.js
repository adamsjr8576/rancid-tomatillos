import React from 'react';
import './MovieCard.scss';
import images from '../../images/images'

const MovieCard = ({ id, poster, avgRating }) => {
  let icon;
  if (avgRating < 4) {
    icon = images.badTomatillo;
  } else if (avgRating > 3 && avgRating < 7) {
    icon = images.okayTomatillo;
  } else if (avgRating > 6) {
    icon = images.goodTomatillo;
  }
  return (
    <article data-id={id} className='movie-card'>
      <section className='section-movie-image' style={{backgroundImage: `url(${poster})`}}>
      </section>
      <section className='section-avg-rating'>
        <p className='average-rating-p'>Average Rating</p>
        <section className='rating-section'>
          <img src={icon} alt='image of rancid tomatillo' className='tomatillo-icon' />
          <p className='average-rating-num'>{avgRating}</p>
        </section>
      </section>
    </article>
  );
}

export default MovieCard;
