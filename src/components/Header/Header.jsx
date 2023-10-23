import React from 'react';
import './Header.css';
import Logo from '../../images/logo.svg';
import Nav from '../Nav/Nav';
import Box from '../Box/Box';
import { Link, useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize.js';

export const Header = ({ isLoggedIn }) => {

  const { pathname } = useLocation();
  const pathMain = pathname === '/';
  const pathsWithMoviesAndProfile = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';
  const headerContentClassName = `header__content ${isLoggedIn ? 'header__content_user_logged-in' : ''}    
  ${pathMain ? 'header__content_place_main' : ''} 
  ${pathsWithMoviesAndProfile ? 'header__content_place_movies' : ''}`;

  const size = useResize();
  return (
    <header className="header">
      <div className={headerContentClassName}>
        <Link className="header__route" to="/">
          <img className="header__logo" src={Logo} alt="Логотип" />
        </Link>

        {size.width > 768 ? (
          <Nav isLoggedIn={isLoggedIn} />
        ) : isLoggedIn ? (
          <Box isLoggedIn={isLoggedIn} />
        ) : (
          <Nav isLoggedIn={isLoggedIn} />
        )}
      </div>
    </header>
  );
};

export default Header;
