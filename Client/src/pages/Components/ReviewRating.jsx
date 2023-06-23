import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviewsForProduct, updateReview } from '../../redux/slice/ratingReviewSlice';
import { useRouter } from "next/router";
import { cleanDetailReviews, postReview } from '@/redux/slice/ratingReviewSlice';

const ReviewRating = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const router = useRouter();
  const { id } = router.query;
  const productId = id;

  const [opinion, setOpinion] = useState({
    rating: "",
    review_description: "",
    productId: productId
  });
  const [error, setError] = useState({
    rating: "",
    review_description: "",
    productId: productId
  });
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    dispatch(getAllReviewsForProduct(productId));
    return () => dispatch(cleanDetailReviews());
  }, [dispatch, productId]);

  const suma = reviews.reduce((total, review) => total + review.rating, 0);
  const promedio = isNaN(suma / reviews.length) ? "-" : (suma / reviews.length).toFixed(1);

  const handlerChange = (event) => {
    setOpinion({
      ...opinion,
      [event.target.name]: event.target.value
    });
  };

  const handlerChangeRating = (event) => {
    setOpinion({
      ...opinion,
      [event.target.name]: event.target.value
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (!opinion.rating) {
      setError({
        ...error,
        rating: "Por favor, seleccione un puntaje."
      });
      return;
    }
    if (!opinion.review_description) {
      setError({
        ...error,
        review_description: "Por favor, ingrese una descripción de la opinión."
      });
      return;
    }

    if (editReview) {
      // Lógica para editar la reseña existente
      dispatch(updateReview({ reviewID: editReview.id, reviewData: opinion }));
      setEditReview(null); // Limpia el estado de editReview después de la edición
    } else {
      // Lógica para crear una nueva reseña
      dispatch(postReview(opinion));
    }

    setError({
      rating: "",
      review_description: "",
      productId: productId
    });
    setOpinion({
      rating: "",
      review_description: "",
      productId: productId
    });
  };

  const handlerEdit = (review) => {
    setEditReview(review); // Almacena la reseña que se está editando en el estado editReview
    setOpinion({
      rating: review.rating,
      review_description: review.review_description,
      productId: productId
    });
  };

  return (
    <div>
      <h1>Opiniones del producto: </h1>
      <h2>Valoración: {promedio}</h2>
      <div>
        {/* Renderiza los datos de las reviews */}
        {reviews.map((review) => (
          <div key={review.id}>
            <h3>Puntaje: {review.rating}</h3>
            <p>{review.review_description}</p>
            <button onClick={() => handlerEdit(review)}>Editar</button>
          </div>
        ))}
        <form onSubmit={handlerSubmit}>
          <label htmlFor="rating">Puntaje:{opinion.rating}</label>
          <input type="range" name="rating" min="1" max="5" value={opinion.rating} onChange={handlerChangeRating}
            disabled={!!editReview} // Deshabilita el campo de calificación en modo de edición
          />
          {error.rating && <p>{error.rating}</p>}
          <br />
          <label htmlFor="review_description">Tu opinión nos importa: </label>
          <textarea
            name="review_description"
            value={opinion.review_description}
            onChange={handlerChange}
          />
          {error.review_description && <p>{error.review_description}</p>}
          <button type="submit" disabled={!opinion.rating || !opinion.review_description}>
            {editReview ? "Editar" : "Agregar"} {/* Cambia el texto del botón según el modo (edición o creación) */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewRating;
