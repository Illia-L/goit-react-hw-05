import css from './css/App.module.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { lazy, Suspense } from 'react';
import { BarLoader } from 'react-spinners';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('./components/MovieReviews/MovieReviews')
);
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      <header className={css.header}>
        <Navigation />
      </header>

      <main className={css.main}>
        <Suspense fallback={<BarLoader />}>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/movies'
              element={<MoviesPage />}
            />
            <Route
              path='/movies/:movieId'
              element={<MovieDetailsPage />}
            >
              <Route
                path='cast'
                element={<MovieCast />}
              />
              <Route
                path='reviews'
                element={<MovieReviews />}
              />
            </Route>
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
