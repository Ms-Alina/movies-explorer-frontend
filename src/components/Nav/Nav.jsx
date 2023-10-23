import React from 'react';
import './Nav.css';
import AccoutIcon from '../../images/icon-account.svg';
import { useLocation, Link } from 'react-router-dom';
import useResize from '../../hooks/useResize';

const Nav = ({ isLoggedIn }) => {
  let location = useLocation();
  let size = useResize();

  const routeClass = size.width <= 786 ? 'nav__route-box ' : 'nav__route ';
  const activeRouteClass =
    size.width <= 786 ? ' nav__route-box_active ' : ' nav__route_active ';

  return (
    <nav className="nav">
      {isLoggedIn ? (
        <>
          <div className="nav__movies">
            <Link
              className={`${routeClass} nav__route-main${
                location.pathname === '/' ? activeRouteClass : ''
              }`}
              to="/"
            >
              Главная
            </Link>

            <Link
              className={`${routeClass} nav__movies-route${
                location.pathname === '/movies' ? activeRouteClass : ''
              }`}
              to="/movies"
            >
              Фильмы
            </Link>

            <Link
              className={`${routeClass} nav__movies-route${
                location.pathname === '/saved-movies' ? activeRouteClass : ''
              }`}
              to="/saved-movies"
            >
              Сохраненные фильмы
            </Link>
          </div>

          <Link className={`nav__route nav__route-account`} to="/profile">
            <img src={AccoutIcon} alt="Изображение иконки аккаунта" /> Аккаунт
          </Link>
        </>
      ) : (
        <div className="nav__default">
          <Link className="nav__route" to="/signup">
            Регистрация
          </Link>

          <Link className="nav__route nav__route-btn" to="/signin">
            Войти
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
