//фильтр по запросу
export const filterMovies = (movies, query) => {
  const moviesByQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  });
  return moviesByQuery;
}

//фильтр по длительности
export const filterDuration = (movies) => {
  return movies.filter((movie) => movie.duration < 40);
}