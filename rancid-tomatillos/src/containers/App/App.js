import React, { Component } from 'react';
import { addMovies } from '../../actions/index';
import { updateIsLoading } from '../../actions/index';
import './App.scss';
import Header from '../../Components/Header/Header';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import Login from '../Login/Login';
import MoviePage from '../MoviePage/MoviePage';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovies } from '../../apiCalls';


export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    fetchMovies()
      .then(data => {
        this.props.addMovies(data)
        this.props.updateIsLoading(this.props.isLoading)
      })

      .catch(err => console.log(err))
  }

  render() {
    const { isLoading } = this.props
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

export const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch( addMovies(movies) ),
  updateIsLoading: isLoading => dispatch( updateIsLoading(isLoading) )
});

export const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
