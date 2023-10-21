import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  let location = useLocation();
  const headerPaths = ['/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  const isLoggedIn = location.pathname === '/' ? false : true;

  return (
    <div className="App">
      {headerPaths.includes(location.pathname) ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : (
        location.pathname === "/" ? (
          <Header isLoggedIn={isLoggedIn} />
        ) : (
          ''
        )
      )}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {footerPaths.includes(location.pathname) ? <Footer /> : ''}
    </div>
  );
}

export default App;