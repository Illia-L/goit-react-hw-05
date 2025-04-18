import { useEffect, useState } from 'react';
import css from './MovieReviews.module.css';
import { useParams } from 'react-router-dom';
import * as api from '../../api';
import { BarLoader } from 'react-spinners';

function MovieReviews() {
  const [reviews, setReviews] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  async function loadReviews() {
    try {
      setIsPending(true);
      setIsError(false);

      const reviews = await api.getMovieReviews(movieId);

      setReviews(reviews);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }

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
