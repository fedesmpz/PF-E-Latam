import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { cleanDetailReviews, postReview, getAllReviewsForProduct, deleteReview } from '../../redux/slice/ratingReviewSlice';
import styles from "./ReviewAndRating.module.css"
import 'starability/starability-css/starability-slot.css';
import { loginUserLocal } from "../../redux/slice/userSlice";

const ReviewRating = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const productId = id;
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleted, setShowModalDeleted] = useState(false)
  const [deleteReviewId, setDeleteReviewId] = useState(null);
  const deletedMessage = useSelector((state) => state.reviews.deletedMessage)
  const userData = useSelector((state) => state.user.userData);

  const [opinion, setOpinion] = useState({
    rating: "",
    review_description: "",
    productId: productId
  });

  useEffect(() => {
    userData.access && setOpinion({
      ...opinion,
      userId: userData.userId,
      username: userData.name,
    })
  }, [userData])

  const [error, setError] = useState({
    rating: "",
    review_description: "",
    productId: productId,
    userId: userData.userId,
    username: userData.name,
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
      userId: userData.userId,
      username: userData.name,
      rating: "",
      review_description: "",
      productId: productId
    });
    setOpinion({
      userId: userData.userId,
      username: userData.name,
      rating: "",
      review_description: "",
      productId: productId
    });
  };
  const handlerDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
    setShowModal(true);
  };

  const handlerConfirm = async () => {
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
      <div className={styles.averageRating}>
        <p>Rating promedio {promedio}</p>
        <div className={styles.averageStar}>
          <fieldset className="starability-slot">
            <label title="Terrible">1 star</label>
          </fieldset>
        </div>
      </div>
      <div className={styles.reviewsContainer}>

        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewBody}>
            <div className={styles.topCont}>
              <p className={styles.userName}>{review.username}</p>
              {
                userData.access && ((userData.userId === review.userId) || userData.isAdmin) && <button onClick={() => handlerDelete(review.id)} className={styles.buttonDelete}>Eliminar</button>
              }
            </div>
            {review.rating === 5 &&
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <label title="Terrible">1 star</label>
                  <label title="Not good">2 stars</label>
                  <label title="Average">3 stars</label>
                  <label title="Very good">4 stars</label>
                  <label title="Amazing">5 stars</label>
                </fieldset>
              </div>
            }
            {review.rating === 4 &&
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <label title="Terrible">1 star</label>
                  <label title="Not good">2 stars</label>
                  <label title="Average">3 stars</label>
                  <label title="Very good">4 stars</label>
                </fieldset>
              </div>
            }
            {review.rating === 3 &&
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <label title="Terrible">1 star</label>
                  <label title="Not good">2 stars</label>
                  <label title="Average">3 stars</label>
                </fieldset>
              </div>
            }
            {review.rating === 2 &&
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <label title="Terrible">1 star</label>
                  <label title="Not good">2 stars</label>
                </fieldset>
              </div>
            }
            {review.rating === 1 &&
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <label title="Terrible">1 star</label>
                </fieldset>
              </div>
            }
            <p className={styles.reviewText}>{review.review_description}</p>
          </div>
        ))}

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Confirmación de Eliminación</h2>
              <p>¿Estás seguro de que quieres eliminar esta reseña?</p>
              <div className={styles.modalButtons}>
                <button onClick={handlerConfirm}>Eliminar</button>
                <button onClick={handlerCancel}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
        {showModalDeleted && (
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
      {
        userData.access && !userData.isAdmin && <form onSubmit={handlerSubmit}>
          <div className={styles.reviewsContainer} >
            <div className={styles.newReview}>
              <p className={styles.reviewTitle}>Califica este producto</p>
              <div className={styles.stars}>
                <fieldset className="starability-slot">
                  <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked={opinion.rating === ""} aria-label="No rating." />
                  <input type="radio" id="first-rate1" name="rating" value="1" checked={opinion.rating === "1"} onChange={handlerChangeRating} />
                  <label htmlFor="first-rate1" title="Terrible">1 star</label>
                  <input type="radio" id="first-rate2" name="rating" value="2" checked={opinion.rating === "2"} onChange={handlerChangeRating} />
                  <label htmlFor="first-rate2" title="Not good">2 stars</label>
                  <input type="radio" id="first-rate3" name="rating" value="3" checked={opinion.rating === "3"} onChange={handlerChangeRating} />
                  <label htmlFor="first-rate3" title="Average">3 stars</label>
                  <input type="radio" id="first-rate4" name="rating" value="4" checked={opinion.rating === "4"} onChange={handlerChangeRating} />
                  <label htmlFor="first-rate4" title="Very good">4 stars</label>
                  <input type="radio" id="first-rate5" name="rating" value="5" checked={opinion.rating === "5"} onChange={handlerChangeRating} />
                  <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                </fieldset>
              </div>
              {error.rating && <p>{error.rating}</p>}
              <label htmlFor="review_description"> </label>
              <textarea name="review_description" value={opinion.review_description} onChange={handlerChange} className={styles.textarea} />
              {error.review_description && <p>{error.review_description}</p>}
              <button type="submit" disabled={!opinion.rating || !opinion.review_description} className={styles.submitButton}> Agregar </button>
            </div>

          </div>
        </form>
      }


    </div>


  )
};

export default ReviewRating;
