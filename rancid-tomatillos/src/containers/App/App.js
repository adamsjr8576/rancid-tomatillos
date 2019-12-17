import React from 'react';
import './App.css';
import Header from '../../Components/Header/Header';
import { Route } from 'react-router-dom';


const App = () => {
  return (
    <div className='app-container'>
      <Route exact path='/' render={() => {
        <Header />
      }}
      />
    </div>
  )
}

export default App;
