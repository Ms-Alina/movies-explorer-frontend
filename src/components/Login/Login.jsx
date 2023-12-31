import React, { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Login.css';
import Logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';

const Login = ({ onLogin, isLoggedIn, apiErrors }) => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  /* eslint-disable react-hooks/exhaustive-deps */
  }, [isLoggedIn]);

  return (
    <section className="login-page">
      <Link className="login-page__route" to="/">
        <img className="login-page__logo" src={Logo} alt="Логотип" />
      </Link>

      <h1 className="login-page__title">Рады видеть!</h1>
      <div className="login-page__wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(values);
          }}
          className="form"
        >
          <div className="form__input-field">
            <label className="form__label" htmlFor="user-email-input">
              E-mail
            </label>
            <input
              className="form__input"
              id="user-email-input"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
              type="email"
              placeholder="Введите почту"
              minLength="2"
              maxLength="40"
              required
            />
            <span className={`form__input-error form__input-error_active`}>
              {validateEmail(values.email).message}
            </span>
          </div>

          <div className="form__input-field">
            <label className="form__label" htmlFor="user-password-input">
              Пароль
            </label>
            <input
              className="form__input"
              id="user-password-input"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
              type="password"
              placeholder="Введите пароль"
              minLength="6"
              maxLength="200"
              required
            />
            <span
              className={`form__input-error ${
                isValid ? '' : 'form__input-error_active'
              }`}
            >
              {errors.password}
            </span>
            <span className="form__api-error">
              {apiErrors.login.message === 'Failed to fetch'
                ? 'При авторизации произошла ошибка.'
                : apiErrors.login.errorText}
            </span>
          </div>

          <button
            type="submit"
            className="form__btn"
            disabled={!isValid || validateEmail(values.email).invalid}
          >
              Войти
          </button>

          <div className="login-page__text">
            <span>Ещё не зарегистрированы? </span>
            <Link to="/signup" className="login-page__link">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
