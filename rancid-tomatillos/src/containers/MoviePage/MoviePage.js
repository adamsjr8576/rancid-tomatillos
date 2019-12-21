import React, { Component } from 'react';
import './MoviePage.scss';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { fetchRatings } from '../../apiCalls';
import { updateUserRatings } from '../../actions';
import images from '../../images/images';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null
    }
  }

  handleRatingSelect = (e) => {
    this.setState({ rating: e.target.value })
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
    <>
      <h2>Rate This Movie</h2>
      <select className='select-rating' value={this.state.rating} onChange={(e) => {this.handleRatingSelect(e)}}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </select>
      <button className='rate-btn' onClick={this.handleRatingSubmit} type='button'>Rate</button>
    </>
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
              <article className='movie-page-details'>
                <h2>Average Rating</h2>
                <section className='rating-section'>
                <img src={icon} alt='image of rancid tomatillo' className='tomatillo-icon' />
                <h2>{roundedAvgRating}</h2>
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
