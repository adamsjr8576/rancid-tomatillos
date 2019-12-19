import React, { Component } from 'react';
import './MoviePage.scss';
import { connect } from 'react-redux';
import { render } from 'react-dom';


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
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render() {
    const { id, movies, isLoggedIn } = this.props

    let movie = movies.movies.find(movie => movie.id === parseInt(id));
    const { average_rating, backdrop_path, overview, poster_path, release_date, title } = movie;
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
                {isLoggedIn && rating}
              </article>
            </section>
        </section>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  isLoggedIn: state.isLoggedIn,
  userId: state.userId
})

export default connect(mapStateToProps)(MoviePage);
