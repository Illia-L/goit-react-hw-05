import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { useEffect, useRef } from 'react';
import * as api from '../../api';
import { BarLoader } from 'react-spinners';
import useAPI from '../../useAPI';

function MovieDetailsPage() {
  const [movie, isPending, isError, fetchMovie] = useAPI(
    api.getMovieDetails,
    null
  );
  const { movieId } = useParams();
  const locationStateRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovie(movieId);
  }, [movieId]);

  useEffect(() => {
    locationStateRef.current = location.state?.from || { pathname: '/movies' };
  }, []);

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
