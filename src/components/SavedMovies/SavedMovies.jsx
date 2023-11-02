import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies, filterDuration } from '../../utils/utils';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchMovies = (query) => {
    setSearchQuery(query);
  }

  const handleShortMovies = () => {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  // const handleResetInput = () => {
  //   setFilteredMovies([]);
  //   setSearchQuery('');
  // };

  return (
    <section className="saved-movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        // onResetInput={handleResetInput}
      />

      <MoviesCardList
        movies={filteredMovies}
        onDeleteMovie={onDeleteMovie}
        isNotFound={isNotFound}
      />
    </section>
  );
};

export default SavedMovies;
