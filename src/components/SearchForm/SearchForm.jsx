import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import IconFind from '../../images/find.svg';

const SearchForm = ({ onFilter, searchQuery, onResetInput, apiErrors }) => {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);

  useEffect(() => {
    if (searchQuery.searchText) {
      setSearchText(searchQuery.searchText);
    }
  }, [searchQuery.searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchText) {
      setError('Нужно ввести ключевое слово');
      return;
    } else {
      onFilter({ searchText, isShortFilmChecked });
    }
  };

  const checkFilterBox = () => {
    if (searchText !== '') {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchText,
        isShortFilmChecked: !isShortFilmChecked
      });
    } else {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchQuery.searchText,
        isShortFilmChecked: !isShortFilmChecked
      });
    }
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
      <div className="search__form-input-field">
        <input
          className="search__form-input"
          // type="search"
          placeholder="Фильм"
          name="search"
          value={searchText || ''}
          required
          min="1"
          autoComplete="off"
          onChange={handleChange}
        />

        {searchText && (
          <button
            className="search__form-reset-button"
            type="button"
            onClick={() => {
              onResetInput();
              setSearchText('');
            }}
          >
            Сброс
          </button>
        )}

        <span className={`search__form-input-error`}>
          {!searchText && error}
        </span>
      </div>

        <button type="submit" className="search__form-button">
          <img src={IconFind} alt="Изображение иконки поиска" />
        </button>
        <FilterCheckbox
          isChecked={searchQuery.isShortFilmChecked}
          onCheck={checkFilterBox}
        />
      </form>
    </div>
  );
};

export default SearchForm;
