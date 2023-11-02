import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';


const NotFound = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const goBack = () => {
    isLoggedIn ? navigate(-2) : navigate(-1);
  };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <button className="not-found-page__back-btn" onClick={goBack}>
        Назад
      </button>
    </section>
  );
};

export default NotFound;
