import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = ({ data }) => {
  const index = Math.floor(Math.random() * Math.floor(20));
  return (
    <header className='header-main' style={{backgroundImage: `url(${data.movies[index].backdrop_path})`}}>
      <h1 className='header-h1'>Rancid Tomatillos</h1>
      <section className='header-btn-section'>
        <Link to='/login' className='login-link'>
        <button className='header-btn'>Log In</button>
        </Link>
        <button className='header-btn'>Home</button>
      </section>
    </header>
  );
}

const mapStateToProps = state => ({
  data: state.movies
});

export default connect(mapStateToProps)(Header);
