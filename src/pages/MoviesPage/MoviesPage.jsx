import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as api from '../../api';
import { BarLoader } from 'react-spinners';
import Search from '../../components/Search/Search';

function MoviesPage() {
  const [movies, setMovies] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramSearch = searchParams.get('search') || ''

  useEffect(() => {
    if(!paramSearch) return

    loadSearchTextMovies(paramSearch);
  }, [paramSearch]);

  async function loadSearchTextMovies(searchText) {
    try {
      setIsPending(true);
      setIsError(false);

      const movies = await api.getSearchTextMovies(searchText);

      setMovies(movies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <Search
        paramSearch={paramSearch}
        setSearchParams={setSearchParams}
      />

      {isPending && <BarLoader />}
      {isError && <p>Failed to load movies. Please try again later.</p>}
      {!movies.length && paramSearch && <p>No movies found. Try another search text.</p>}
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
