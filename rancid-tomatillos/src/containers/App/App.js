import React, { Component } from 'react';
import './App.css';
import Header from '../../Components/Header/Header';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='app-container'>
        <Route exact path='/' render={() => {
          return <Header />
        }}
        />
      </div>
    )
  }
}

export default App;
