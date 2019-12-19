import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { removeUser, updateLoggedIn } from '../../actions/index';


const Header = ({ data, isLoggedIn, removeUser, updateLoggedIn }) => {
  let log;
  if (isLoggedIn) {
    log = <button onClick={() => {updateLoggedIn(isLoggedIn); removeUser();}} className='header-btn-logout'>Log Out</button>
  } else {
    log = <Link to='/login' className='login-link'>
    <button className='header-btn'>Log In</button>
    </Link>
  }
  const index = Math.floor(Math.random() * Math.floor(20));
  return (
    <header className='header-main' style={{backgroundImage: `url(${data.movies[index].backdrop_path})`}}>
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

const mapStateToProps = state => ({
  data: state.movies,
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch( removeUser() ),
  updateLoggedIn: isLoggedIn => dispatch( updateLoggedIn(isLoggedIn) )
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
