import React, { Component } from 'react';
import './MoviePage.scss';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { fetchRatings, postUserRating, deleteApiRating } from '../../apiCalls';
import { updateUserRatings, deleteUserRating } from '../../actions';
import images from '../../images/images';

export class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    }
  }

  onStarClick = (nextValue) => {
    this.setState({rating: nextValue});
  }

  deleteRating = (userRatings, movieId) => {
    const movieRating = userRatings.find(userRating => userRating.movie_id === parseInt(movieId));
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }

    }
    deleteApiRating(options, movieRating)
      .then(data => this.props.deleteUserRating(movieRating.id))
      .catch(err => console.log(err))
  }

  findMovieRating = (id, userRatings) => {
    const movieRating = userRatings.filter(userRating => userRating.movie_id === parseInt(id));
    if (movieRating.length) {
      const icon = this.determineIcon(movieRating[0].rating);
      return (
        <section className='average-rating-container'>
          <h2>User Rating</h2>
          <div className='rating-section'>
            <img src={icon} alt='rancid tomatillo' className='tomatillo-icon' />
            <h2>{movieRating[0].rating}</h2>
            <button className='delete-rating-btn' onClick={() => this.deleteRating(userRatings, id)} type=
            'button'>Delete Rating</button>
          </div>
        </section>
      )
    } else {
      const icon = this.determineIcon(this.state.rating);
      return (
        <section className='user-rating-container'>
          <h2>Rate This Movie</h2>
          <section>
            <StarRatingComponent
                name="rating"
                starCount={10}
                value={this.state.rating}
                onStarClick={this.onStarClick}
            />
          </section>
          <button className='rate-btn' onClick={this.handleRatingSubmit} 
          type='button'>{<img src={icon} alt='image of rancid tomatillo' className='tomatillo-icon' />}{this.state.rating} Rate It</button>
        </section>)
    }
  }

  determineIcon = (rating) => {
    if (rating < 4) {
      return images.badTomatillo;
    } else if (rating > 3 && rating < 7) {
      return images.okayTomatillo;
    } else if (rating > 6) {
      return images.goodTomatillo;
    }
  }

  handleRatingSubmit = () => {
    const { id, userId } = this.props;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        movie_id: parseInt(id),
        rating: parseInt(this.state.rating)
      }),
      headers: {
      'Content-Type': 'application/json'
      }
    }

    postUserRating(options, userId)
      .then(data => {
        fetchRatings(userId)
          .then(data => this.props.updateUserRatings(data.ratings))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { id, movies, isLoggedIn, userRatings } = this.props
    let movie = movies.movies.find(movie => movie.id === parseInt(id));
    const { average_rating, backdrop_path, overview, poster_path, release_date, title } = movie;
    let roundedAvgRating = Math.ceil(average_rating);
    const rating = this.findMovieRating(id, userRatings);
    const icon = this.determineIcon(roundedAvgRating)
    return (
      <main className='movie-page-main'>
        <section className='movie-page-section' style={{backgroundImage:`url(${backdrop_path})`}} >
          <article className='movie-page-poster' style={{backgroundImage: `url(${poster_path})`}}>
          </article>
            <section className='movie-info-container'>
              <article className='movie-page-details'>
                <h2>{title}</h2>
                <p className='movie-overview'>{overview}</p>
                <h3>Release Date</h3>
                <p>{release_date}</p>
              </article>
              <article className='movie-page-ratings'>
                <section className='average-rating-container'>
                  <h2>Average Rating</h2>
                  <div className='rating-section'>
                    <img src={icon} alt='rancid tomatillo' className='tomatillo-icon' />
                    <h2>{roundedAvgRating}</h2>
                  </div>
                </section>
                {isLoggedIn && rating}
              </article>
            </section>
        </section>
      </main>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  updateUserRatings: ratings => dispatch(updateUserRatings(ratings)),
  deleteUserRating: ratingId => dispatch(deleteUserRating(ratingId))
})

export const mapStateToProps = state => ({
  movies: state.movies,
  isLoggedIn: state.isLoggedIn,
  userId: state.userId,
  userRatings: state.userRatings
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
