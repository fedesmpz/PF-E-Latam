import { axiosAllProductByCountryCategoryId, cleanDetail, deleteProduct, hideProduct } from "../../redux/slice/productSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../DetailProduct/ProductDetail.module.css";
import { Link } from "react-router-dom";
import ReviewRating from "../ReviewRating/ReviewRating"
import { useContext } from "react";
import { CartContext } from "../../utils/CartContext";
import { loginUserLocal } from "../../redux/slice/userSlice";

const DetailProduct = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const countryId = searchParams.get('countryId');
  const categories = searchParams.get('categories');
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.products.detail);
  const hideMessage = useSelector((state) => state.products.hideProductMessage)
  const deletedMessage = useSelector((state) => state.products.deleteProductMessage)
  const [isVisible, setIsVisible] = useState(productDetail?.catalog_listing);
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleted, setShowModalDeleted] = useState(false)
  const [modalHide, setModalHide] = useState(false);
  const [showModalAdded, setShowModalAdded] = useState(false)
  const { addToCart } = useContext(CartContext);
  const userData = useSelector((state) =>  state.user.userData);

  useEffect(() => {
    dispatch(loginUserLocal())
  }, [])

  let attributes = productDetail.attributes;
  let renderedAttributes
  if (attributes?.includes('{')) {
    attributes = JSON.parse(productDetail.attributes);
    renderedAttributes = attributes.map((attribute) => {
      const attributeName = attribute.name;
      const attributeValue = attribute.value;
      return (
        <li key={attributeName} className={styles.attribute}>
          <span className={styles.attributeName}>{attributeName}:</span> {attributeValue}
        </li>)
    })
  }
  else {
    renderedAttributes = attributes
  }
  useEffect(() => {
    setIsVisible(productDetail?.catalog_listing)
    dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
    return () => dispatch(cleanDetail());
  }, [dispatch, id, countryId, categories]);

  useEffect(() => {
    setIsVisible(productDetail?.catalog_listing);
  }, [productDetail]);

  const handlerClick = async () => {
    await dispatch(hideProduct(id));
    setIsVisible(!isVisible);
    setModalHide(true)
  }
  const handlerConfirm = async () => {
    await dispatch(deleteProduct(id));
    setShowModal(false);
    setShowModalDeleted(true)
  };

  const handlerAddCart = () => {
    addToCart(productDetail);
    setShowModalAdded(true)
  };

  const handlerCancel = async () => {
    setShowModal(false);
    setModalHide(false)
  }
  const handlerDeleted = async () => {
    setShowModal(false);
    setModalHide(false)
    setShowModalDeleted(true)
    navigate("/Home")
  }
  const handlerDelete = async () => {
    setShowModal(true);
  };

  const handlerCloseCart = () => {
    setShowModalAdded(false)
  }

  const handlerEdit = async () => {
    navigate(`/EditProduct?countryId=${countryId}&categories=${categories}&id=${id}`)
  }




  return (
    <div className={styles.fondo}>
      <>
        <Link to="/Home">
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
            </svg>
          </button>
        </Link>

        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={productDetail.thumbnail} alt={productDetail.title} className={styles.thumbnail} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{productDetail.title}</h1>
            { productDetail.sale_price ? (
                <div>
                <span className={styles.original_price}> ${productDetail.original_price}</span> 
                <span className={styles.sale_price}> ${productDetail.price}</span> 
                </div> ) : 
                ( <h2 className={styles.price}> ${productDetail.original_price} </h2>)
              }
            <ul className={styles.attributeList}>{renderedAttributes}</ul>
            <p className={`${styles.hiddenProductTag} ${isVisible ? styles.hideTag : ''}`}>
              {isVisible === true ? '' : `Producto oculto`}
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            {(!userData.isAdmin) ? (
              <button className={styles.buttonAddCart} onClick={handlerAddCart}>Agregar</button>
            ) : 
            ( <>
              <button className={`${styles.buttonOcultar} ${isVisible ? styles.mostrar : styles.ocultar}`} onClick={handlerClick} >{isVisible ? "Ocultar" : 'Mostrar'}</button>
              <button className={styles.buttonEdit} onClick={handlerEdit} >Editar</button>
              <button className={styles.buttonDelete} onClick={handlerDelete}>Eliminar</button>
              </>
            )}
            <>
              {showModal && userData.access && userData.isAdmin && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <h2>Confirmación de Eliminación</h2>
                    <p>¿Estás seguro de que quieres eliminar el producto {productDetail.title}?</p>
                    <div className={styles.modalButtons}>
                      <button onClick={handlerConfirm}>Eliminar</button>
                      <button onClick={handlerCancel}>Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
            </>
            <>
              {showModalAdded && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <p>el producto <strong>{productDetail.title}</strong> fue agregado correctamente!</p>
                    <div className={styles.modalButtons}>
                      <button onClick={handlerCloseCart}>x</button>
                    </div>
                  </div>
                </div>
              )

              }
            </>
            <>
              {userData.access && userData.isAdmin && showModalDeleted && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <p>{productDetail.title}</p>
                    <h2>{deletedMessage}</h2>
                    <div className={styles.modalButtons}>
                      <button onClick={handlerDeleted}>x</button>
                    </div>
                  </div>
                </div>
              )

              }
            </>
            <>
              {userData.access && userData.isAdmin && modalHide && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <p>{productDetail.title}</p>
                    <h2>{hideMessage}</h2>
                    <div className={styles.modalButtons}>
                      <button onClick={handlerCancel}>x</button>
                    </div>
                  </div>
                </div>
              )
              }
            </>

          </div>

        </div>

        <div className={styles.h3Container}>
          <div className={styles.h3InnerContainer}>
            <h3>+ {productDetail.available_quantity} disponibles</h3>
            <h3>+ {productDetail.sold_quantity} vendidos</h3>
            <h3 className={styles.storeName}>
              Store Oficial: {productDetail.official_store_name ? productDetail.official_store_name : "No disponible"}
            </h3>
            <h3>{productDetail.shipping}</h3>
            <h3>País: {productDetail.country}</h3>
          </div>
        </div>
        <ReviewRating></ReviewRating>
      </>
    </div>
  );
};


export default DetailProduct;