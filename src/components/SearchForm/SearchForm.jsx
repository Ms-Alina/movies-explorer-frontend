import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import IconFind from '../../images/find.svg';

// const SearchForm = ({ onSearchMovies, onFilter, isShortMovies, onResetInput }) => {
const SearchForm = ({ onSearchMovies, onFilter, isShortMovies }) => {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim().length === 0) {
      setIsQueryError(true);
      return;
    } else {
      setIsQueryError(false);
      onSearchMovies(query);
    }
  };

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
      const localQuery = localStorage.getItem('movieSearch');
      setQuery(localQuery);
    }
  }, [location]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
      <div className="search__form-input-field">
        <input
          className="search__form-input"
          // type="search"
          placeholder="Фильм"
          name="search"
          value={query || ''}
          // required
          min="1"
          autoComplete="off"
          onChange={handleChangeQuery}
        />

        {/* {query && (
          <button
            className="search__form-reset-button"
            type="button"
            onClick={() => {
              onResetInput();
              setQuery('');
            }}
          >
            Сброс
          </button>
        )} */}

        {isQueryError && <span className="search__form-input-error">Нужно ввести ключевое слово</span>}
      </div>

        <button type="submit" className="search__form-button">
          <img src={IconFind} alt="Изображение иконки поиска" />
        </button>
        <FilterCheckbox
          onFilter={onFilter}
          isShortMovies={isShortMovies}
        />
      </form>
    </div>
  );
};

export default SearchForm;
