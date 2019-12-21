import React from 'react';
import './MovieCard.scss';
import images from '../../images/images';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, poster, avgRating }) => {
  let icon;
  let roundedAvgRating = Math.ceil(avgRating);
  if (roundedAvgRating < 4) {
    icon = images.badTomatillo;
  } else if (roundedAvgRating > 3 && roundedAvgRating < 7) {
    icon = images.okayTomatillo;
  } else if (roundedAvgRating > 6) {
    icon = images.goodTomatillo;
  }
  return (
    <Link to={`/movies/${id}`} className='movie-detail-link'>
      <article data-id={id} className='movie-card'>
        <section className='section-movie-image' style={{backgroundImage: `url(${poster})`}}>
        </section>
        <section className='section-avg-rating'>
          <p className='average-rating-p'>Average Rating</p>
          <section className='rating-section'>
            <img src={icon} alt='image of rancid tomatillo' className='tomatillo-icon' />
            <p className='average-rating-num'>{roundedAvgRating}</p>
          </section>
        </section>
      </article>
    </Link>
  );
}

export default MovieCard;
