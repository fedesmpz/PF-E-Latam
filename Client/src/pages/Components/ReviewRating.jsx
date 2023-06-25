import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { cleanDetailReviews, postReview,getAllReviewsForProduct,deleteReview} from '@/redux/slice/ratingReviewSlice';
import styles from "./Styles/ReviewAndRating.module.css"
import 'starability/starability-css/starability-slot.css';

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
    <div className={styles.container}>
       <div className={styles.container}>
          <div className={styles.secondContainer}>
    <h1>Valoración: {promedio}</h1>

      {reviews.map((review) => (
        <div key={review.id}>
          <h3 className={styles.puntaje}>Puntaje: {review.rating}</h3>
          <p className={styles.parrafo}>{review.review_description}</p>
          <button onClick={() => handlerDelete(review.id)}className={styles.buttonDelete}>Eliminar</button>
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
             
            </div>
  </div>
        <form onSubmit={handlerSubmit}>
        <div className={styles.container}>
          <div className={styles.secondContainerCalificaicon}>
        <fieldset className="starability-slot">
    <legend>Califica este producto:</legend>
    <input type="radio" id="first-rate1" name="rating"  value="1" checked={opinion.rating === "1"} onChange={handlerChangeRating} />
    <label htmlFor="first-rate1" title="Terrible">1 star</label>
      <input type="radio" id="first-rate2"  name="rating" value="2" checked={opinion.rating === "2"} onChange={handlerChangeRating} />
    <label htmlFor="first-rate2" title="Not good">2 stars</label>
    <input type="radio" id="first-rate3" name="rating" value="3" checked={opinion.rating === "3"}onChange={handlerChangeRating} />
    <label htmlFor="first-rate3" title="Average">3 stars</label> 
    <input type="radio" id="first-rate4" name="rating" value="4" checked={opinion.rating === "4"} onChange={handlerChangeRating} />
    <label htmlFor="first-rate4" title="Very good">4 stars</label>
    <input type="radio" id="first-rate5" name="rating" value="5" checked={opinion.rating === "5"} onChange={handlerChangeRating} />
    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
  </fieldset>
          {error.rating && <p>{error.rating}</p>}
          <label htmlFor="review_description"> </label>
          <textarea name="review_description" value={opinion.review_description} onChange={handlerChange} className={styles.textarea}/>
          {error.review_description && <p>{error.review_description}</p>}
         </div>
          <button type="submit" disabled={!opinion.rating || !opinion.review_description} className={styles.buttonAgregar}> Agregar </button>
        
        </div>
        </form>

      </div>
  
 
  )
};

export default ReviewRating;
