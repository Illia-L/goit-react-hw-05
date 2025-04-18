import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import * as api from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import { BarLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';
import useAPI from '../../useAPI';

function HomePage() {
  const [movies, isPending, isError, fetchMovies] = useAPI(
    api.getTrendingMovies,
    []
  );
  const location = useLocation()

  useEffect(() => {
    fetchMovies();
  }, []);

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
