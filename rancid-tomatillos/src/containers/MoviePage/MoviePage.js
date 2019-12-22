import React, { Component } from 'react';
import './MoviePage.scss';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { fetchRatings } from '../../apiCalls';
import { updateUserRatings } from '../../actions';
import images from '../../images/images';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1
    }
  }

  handleRatingSelect = (e) => {
    this.setState({ rating: e.target.value })
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({rating: nextValue});
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

    fetch(`https://rancid-tomatillos.herokuapp.com/api/v1/users/${userId}/ratings`, options)
      .then(res => res.json())
      .then(data => {
        fetchRatings(userId)
          .then(data => this.props.updateUserRatings(data.ratings))
      })
      .catch(err => console.log(err))
  }

  render() {
    const { id, movies, isLoggedIn } = this.props
    let icon;
    let movie = movies.movies.find(movie => movie.id === parseInt(id));
    const { average_rating, backdrop_path, overview, poster_path, release_date, title } = movie;
    let roundedAvgRating = Math.ceil(average_rating);
    const rating =
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
      <button className='rate-btn' onClick={this.handleRatingSubmit} type='button'>Rate</button>
    </section>
    if (roundedAvgRating < 4) {
      icon = images.badTomatillo;
    } else if (roundedAvgRating > 3 && roundedAvgRating < 7) {
      icon = images.okayTomatillo;
    } else if (roundedAvgRating > 6) {
      icon = images.goodTomatillo;
    }

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
                  <img src={icon} alt='image of rancid tomatillo' className='tomatillo-icon' />
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

const mapDispatchToProps = dispatch => ({
  updateUserRatings: ratings => dispatch(updateUserRatings(ratings))
})

const mapStateToProps = state => ({
  movies: state.movies,
  isLoggedIn: state.isLoggedIn,
  userId: state.userId
})

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
