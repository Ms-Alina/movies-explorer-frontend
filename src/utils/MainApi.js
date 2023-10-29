import { BEATFILM_URL } from './constants';

export default class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Метод проверки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      return Promise.reject({
        status: res.status,
        errorText:
          JSON.parse(text).message === 'Validation failed'
            ? JSON.parse(text).validation.body.message
            : JSON.parse(text).message
      });
    });
  }

  // Получем информацию о пользователе с сервера
  getUserData() {
    return fetch(`${this._url}/users/me`, { 
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Сохраняем отредактированные данные пользователя на сервере
  saveUserChangesProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Получаем сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this._url}/movies`, { 
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Добавляем новый фильм на сервер
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BEATFILM_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Удаляем фильм пользователя с сервера
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => this._checkResponse(res));
  }
}
