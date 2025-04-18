import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import { getTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import { BarLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation()

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  async function loadTrendingMovies() {
    try {
      setIsPending(true);
      setIsError(false);

      const movies = await getTrendingMovies();

      setMovies(movies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {isPending && <BarLoader/>}
      {isError && <p>Failed to load movies. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </>
  );
}

export default HomePage;
