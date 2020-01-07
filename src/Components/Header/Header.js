import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { removeUser, updateLoggedIn } from '../../actions/index';
import PropTypes from 'prop-types';
import images from '../../images/images';

export const Header = ({ data, isLoggedIn, removeUser, updateLoggedIn, path }) => {
  let log;
  let gradient;
  const index = Math.floor(Math.random() * Math.floor(20));
  let imageUrl = data.movies[index].backdrop_path;
  if (isLoggedIn) {
    log = <Link to='/' className='login-link'>
    <button onClick={() => {updateLoggedIn(isLoggedIn); removeUser();}} className='header-btn-logout'>Log Out</button>
    </Link>
  } else {
    log = <Link to='/login' className='login-link'>
    <button className='header-btn'>Log In</button>
    </Link>
  }
  if (path.includes('movies') || path.includes('login')) {
    imageUrl = images.filmImage;
  }
  return (
    <header className='header-main' style={{backgroundImage: `url(${imageUrl})` }}>
      <h1 className='header-h1'>Rancid Tomatillos</h1>
      <section className='header-btn-section'>
        {log}
        <Link to='/' className='login-link'>
          <Route path={['/login', '/movies/:id']} render={() =>
            <button className='header-btn'>Home</button>}/>
        </Link>
      </section>
    </header>
  );
}

export const mapStateToProps = state => ({
  data: state.movies,
  isLoggedIn: state.isLoggedIn
});

export const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch( removeUser() ),
  updateLoggedIn: isLoggedIn => dispatch( updateLoggedIn(isLoggedIn) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  data: PropTypes.objectOf(PropTypes.array),
  isLoggedIn: PropTypes.bool,
  removeUser: PropTypes.func,
  updateLoggedIn: PropTypes.func,
  path: PropTypes.string
}
