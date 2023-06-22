import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviewsForProduct } from '../../redux/slice/ratingReviewSlice';
import { useRouter } from "next/router";

const ReviewRating = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const router = useRouter();
  const { id } = router.query;
  const productId= id

  useEffect(() => {
    dispatch(getAllReviewsForProduct(productId));

  }, [dispatch, productId]);
  const suma = reviews.reduce((total, review) => total + review.rating, 0);
 const promedio = suma / reviews.length
  
  return (
    <div>
      <h1>Todas las reviews: </h1>
      <h2>Valoración promedio: {promedio}</h2>
      <div>
        {/* Renderiza los datos de las reviews */}
        {reviews.map((review) => (
          <div key={review.id}>
            <h3>Puntaje: {review.rating}</h3>
            <p>Descripcion: {review.review_description}</p>
          
            {/* Renderiza otros detalles de la review si los tienes */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewRating;