import React from 'react';
import './MovieCard.scss';
import images from '../../images/images';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, poster, avgRating, userRating, isLoggedIn }) => {
  const determineIcon = (rating) => {
    if (rating < 4) {
      return images.badTomatillo;
    } else if (rating > 3 && rating < 7) {
      return images.okayTomatillo;
    } else if (rating > 6) {
      return images.goodTomatillo;
    }
  }
  let userRatingInfo;
  const roundedAvgRating = Math.ceil(avgRating);
  const avgRatingIcon = determineIcon(roundedAvgRating);
  if (userRating.length) {
    const userRatingIcon = determineIcon(userRating[0].rating);
    userRatingInfo = (
      <section className='section-avg-rating'>
        <p className='average-rating-p'>User Rating</p>
        <div className='rating-section'>
          <img src={userRatingIcon} alt='rancid tomatillo' className='tomatillo-icon' />
          <p className='average-rating-num'>{userRating[0].rating}</p>
        </div>
      </section>
    )
  } else {
    userRatingInfo = (
      <p className='user-no-rating-p'>No User Rating</p>
    )
  }
  return (
    <Link to={`/movies/${id}`} className='movie-detail-link'>
      <article data-id={id} className='movie-card'>
        <section className='section-movie-image' style={{backgroundImage: `url(${poster})`}}>
        </section>
        <div className='movie-rating-container'>
          <section className='section-avg-rating'>
            <p className='average-rating-p'>Average Rating</p>
            <section className='rating-section'>
              <img src={avgRatingIcon} alt='rancid tomatillo' className='tomatillo-icon' />
              <p className='average-rating-num'>{roundedAvgRating}</p>
            </section>
          </section>
          {isLoggedIn && userRatingInfo}
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
