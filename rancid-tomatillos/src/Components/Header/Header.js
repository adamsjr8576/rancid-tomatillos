import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className='header-main'>
      <h1 className='header-h1'>Rancid Tomatillos</h1>
      <section className='header-btn-section'>
        <button className='header-btn'>Log In</button>
        <button className='header-btn'>Home</button>
      </section>
    </header>
  )
}

export default Header;
