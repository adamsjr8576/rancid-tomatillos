import React, { Component } from 'react';
import { addMovies } from '../../actions/index';
import './App.scss';
import Header from '../../Components/Header/Header';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import Login from '../Login/Login';
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
        console.log(data)
        console.log(this.props.addMovies)
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
              <Route path='/' render={() => {
                return <Header />
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
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  addMovies: movies => dispatch( addMovies(movies) )
});

export default connect(null, mapDispatchToProps)(App);
