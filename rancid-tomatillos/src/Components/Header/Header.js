import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';


const Header = ({ data }) => {
  const index = Math.floor(Math.random() * Math.floor(20));
  return (
    <header className='header-main' style={{backgroundImage: `url(${data.movies[index].backdrop_path})`}}>
      <h1 className='header-h1'>Rancid Tomatillos</h1>
      <section className='header-btn-section'>
        <button className='header-btn'>Log In</button>
        <button className='header-btn'>Home</button>
      </section>
    </header>
  )
}

const mapStateToProps = state => ({
  data: state.movies
});

export default connect(mapStateToProps)(Header);
