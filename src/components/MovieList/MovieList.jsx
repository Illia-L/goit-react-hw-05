import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

function MovieList({ movies, location }) {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li
          className={css.item}
          key={movie.id}
        >
          <Link
            to={`/movies/${movie.id}`}
            state={{from: location}}
            className={css.link}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
