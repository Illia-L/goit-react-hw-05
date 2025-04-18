import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { getMovieDetails } from '../../api';
import { BarLoader } from 'react-spinners';

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const locationStateRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  useEffect(() => {
    locationStateRef.current = location.state?.from || { pathname: '/movies' };
  }, []);

  async function loadMovie() {
    try {
      setIsPending(true);
      setIsError(false);

      const movie = await getMovieDetails(movieId);

      setMovie(movie);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <Link
        to={locationStateRef.current}
        className={css.goBack}
      >
        Go back
      </Link>
      {isPending && <BarLoader />}
      {isError && <p>Failed to load movie. Please try again later.</p>}
      {!!movie && (
        <>
          <div className={css.mainContent}>
            <div className={css.posterContainer}>
              <img
                src={movie.poster_path || '/images/fallback.png'}
                alt={movie.overview}
                className={css.poster}
              />
            </div>
            <div className={css.data}>
              <h1>{movie.title}</h1>
              <p>User score: {movie.vote_average}</p>
              <h3 className={css.subtitle}>Overview</h3>
              <p className={css.overview}>{movie.overview}</p>
              <h3 className={css.subtitle}>Genres</h3>
              <ul className={css.genreList}>
                {movie.genres.map(genre => (
                  <li
                    className={css.genre}
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2>Additional information</h2>

          <ul className={css.links}>
            <li className={css.linksItem}>
              <Link
                to='cast'
                className={css.link}
              >
                Cast
              </Link>
            </li>
            <li className={css.linksItem}>
              <Link
                to='reviews'
                className={css.link}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <div className={css.addidionalContent}>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
