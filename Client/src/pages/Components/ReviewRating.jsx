import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { cleanDetailReviews, postReview,getAllReviewsForProduct,deleteReview} from '@/redux/slice/ratingReviewSlice';
import styles from "./Styles/ReviewAndRating.module.css"
const ReviewRating = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const router = useRouter();
  const { id } = router.query;
  const productId = id;
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleted, setShowModalDeleted] = useState(false)
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const deletedMessage = useSelector((state) => state.reviews.deletedMessage)
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

    dispatch(postReview(opinion));

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
  const handlerDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
    setShowModal(true);
  };

  const handlerConfirm = async() => {
    await dispatch(deleteReview(deleteReviewId));
    setShowModal(false);
    setShowModalDeleted(true)
  }; 
  const handlerCancel = async () => {
    setDeleteReviewId(null);
    setShowModal(false);
  }
  const handlerDeleted = async () => {
    setShowModal(false);
    setShowModalDeleted(false)
    window.location.reload();
  }

  return (
    <div>
    <h1>Opiniones del producto: </h1>
    <h2>Valoración: {promedio}</h2>
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h3>Puntaje: {review.rating}</h3>
          <p>{review.review_description}</p>
          <button onClick={() => handlerDelete(review.id)}>Eliminar</button>
        </div>
      ))}
        
        {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirmación de Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar esta reseña?</p>
            <div className={styles.modalButtons}>
              <button onClick={ handlerConfirm}>Eliminar</button>
              <button onClick={handlerCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
        { showModalDeleted && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <p>{deletedMessage}</p>
                    <div className={styles.modalButtons}>
                      <button onClick={handlerDeleted}>x</button>
                    </div>
                  </div>
                </div>
              )

              }

        <form onSubmit={handlerSubmit}>
          <label htmlFor="rating">Puntaje:{opinion.rating}</label>
          <input type="range" name="rating" min="1" max="5" value={opinion.rating} onChange={handlerChangeRating}
       
          />
          {error.rating && <p>{error.rating}</p>}
          <br />
          <label htmlFor="review_description">Tu opinión nos importa: </label>
          <textarea name="review_description" value={opinion.review_description} onChange={handlerChange}/>
          {error.review_description && <p>{error.review_description}</p>}
          <button type="submit" disabled={!opinion.rating || !opinion.review_description}> Agregar </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewRating;
