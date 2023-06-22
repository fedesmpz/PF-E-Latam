import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from '../../redux/slice/ratingReviewSlice';

const ReviewRating = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {/* Renderiza los datos de las reviews */}
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            {/* Renderiza otros detalles de la review si los tienes */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRating;