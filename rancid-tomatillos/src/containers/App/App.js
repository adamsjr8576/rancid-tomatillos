import React, { Component } from 'react';
import { addMovies } from '../../actions/index';
import './App.scss';
import Header from '../../Components/Header/Header';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import Login from '../Login/Login';
import MoviePage from '../MoviePage/MoviePage';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(res => res.json())
      .then(data => {
        this.props.addMovies(data)
        this.setState({ isLoading: false })
      })

      .catch(err => console.log(err))
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className='app-container'>
        {isLoading ? <h2>Loading...</h2>
          : <>
              <Route path='/' render={({ location }) => {
                return <Header path={location.pathname}/>
                }}
              />
              <Route exact path='/' render={() => {
                return <MoviesContainer />
                }}
              />
            </>
        }
        <Route exact path='/login' render={() => {
          return <Login />
        }}
        />
        <Route exact path='/movies/:id' render={({ match }) => {
          const { id } = match.params;
          return <MoviePage id={id} />
        }}
        />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch( addMovies(movies) )
});

export default connect(null, mapDispatchToProps)(App);
