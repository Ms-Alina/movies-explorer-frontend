import React, { useState, useMemo, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize.js';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';

const MoviesCardList = ({
  movies,
  savedMovies,
  onLikeMovie,
  onDeleteMovie,
  isNotFound,
  isLoading,
  isReqErr
}) => {
  let size = useResize();
  let location = useLocation();
  const [moviesToAdd, setMoviesToAdd] = useState(0);

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const moviesToRender = useMemo(() => {
    const countToRender = size.width >= 1280 ? 16 : size.width >= 990 ? 9 : size.width >= 768 ? 8 : 5;
    return movies.slice(0, countToRender + moviesToAdd);
  }, [movies, moviesToAdd, size]);

  return (
    <>
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'По вашему запросу ничего не найдено'} />}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          }
        />
      )}
      {!isLoading && !isReqErr && !isNotFound && (
        <>
          {location.pathname === '/saved-movies' ? (
            <ul className="movies-cardlist">
              {movies.map((movie) => {
                return (
                  <MoviesCard
                    key={movie.id || movie.movieId}
                    movie={movie}
                    savedMovies={savedMovies}
                    onLikeMovie={onLikeMovie}
                    onDeleteMovie={onDeleteMovie}
                  />
                );
              })}
            </ul>
          ) : (
            <>
              <ul className="movies-cardlist">
                {moviesToRender.map((movie) => {
                  return (
                    <MoviesCard
                      key={movie.id || movie.movieId}
                      movie={movie}
                      savedMovies={savedMovies}
                      onLikeMovie={onLikeMovie}
                      onDeleteMovie={onDeleteMovie}
                    />
                  );
                })}
              </ul>
              {movies.length > moviesToRender.length ? (
                <button
                  onClick={() => {
                    setMoviesToAdd((prev) => prev + (size.width < 990 ? 2 : size.width < 1280 ? 3 : 4));
                  }}
                  className="movies__more-btn"
                >
                  Еще
                </button>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default MoviesCardList;
