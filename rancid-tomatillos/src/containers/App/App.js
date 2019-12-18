import React, { Component } from 'react';
import './App.css';
import Header from '../../Components/Header/Header';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(res => res.json())
      .then(data => this.props.addMovies(data))
      .catch(err => console.log(err))
  } 

  render() {
    return (
      <div className='app-container'>
        <Route path='/' render={() => {
          return <Header />
        }}
        />
        <Route exact path='/' render={() => {
          return <MoviesContainer />
        }}
        />
      </div>
    )
  }
}



export default App;
