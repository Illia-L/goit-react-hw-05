import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as api from '../../api';
import { BarLoader } from 'react-spinners';
import Search from '../../components/Search/Search';
import useAPI from '../../useAPI';

function MoviesPage() {
  const [movies, isPending, isError, fetchMovies] = useAPI(
    api.getSearchTextMovies,
    []
  );
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (!paramSearch) return;

    fetchMovies(paramSearch);
  }, [paramSearch]);

  return (
    <>
      <Search
        paramSearch={paramSearch}
        setSearchParams={setSearchParams}
      />

      {isPending && <BarLoader />}
      {isError && <p>Failed to load movies. Please try again later.</p>}
      {!movies.length && paramSearch && (
        <p>No movies found. Try another search text.</p>
      )}
      {movies.length > 0 && (
        <MovieList
          movies={movies}
          location={location}
        />
      )}
    </>
  );
}

export default MoviesPage;
