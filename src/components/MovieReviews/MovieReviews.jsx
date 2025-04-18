import { useEffect } from 'react';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import * as api from '../../api';
import { BarLoader } from 'react-spinners';
import useAPI from '../../useAPI';

function MovieReviews() {
  const [reviews, isPending, isError, fetchReviews] = useAPI(
    api.getMovieReviews,
    null
  );
  const { movieId } = useParams();

  useEffect(() => {
    fetchReviews(movieId);
  }, [movieId]);

  if (isPending) return <BarLoader />;

  if (isError) return <p>Failed to load reviews. Please try again later.</p>;

  if (reviews?.length === 0) return <p>No reviews found.</p>;

  return (
    <ul className={css.list}>
      {reviews?.map(review => (
        <li
          className={css.item}
          key={review.id}
        >
          <h3 className={css.author}>Arthor: {review.author}</h3>
          <p className={css.review}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
