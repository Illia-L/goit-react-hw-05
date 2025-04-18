import { BarLoader } from 'react-spinners';
import * as api from '../../api';
import css from './MovieCast.module.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAPI from '../../useAPI';

function MovieCast() {
  const [cast, isPending, isError, fetchCast] = useAPI(api.getMovieCredits, null)
  const { movieId } = useParams();

  useEffect(() => {
    fetchCast(movieId);
  }, [movieId]);

  if (isPending) return <BarLoader />;

  if (isError) return <p>Failed to load cast. Please try again later.</p>;

  return (
    <ul className={css.list}>
      {cast?.map(person => (
        <li
          className={css.item}
          key={person.id}
        >
          <div className={css.imageBox}>
            <img
              className={css.image}
              src={person.profile_path || '/images/fallback.png'}
              alt={person.name}
            />
          </div>

          <div className={css.desc}>
            <h3 className={css.name}>{person.name}</h3>
            <p className={css.character}>Character: {person.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
