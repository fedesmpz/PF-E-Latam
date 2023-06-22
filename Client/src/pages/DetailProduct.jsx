import { axiosAllProductByCountryCategoryId, cleanDetail, deleteProduct, hideProduct } from "@/redux/slice/productSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider";
import styles from "../pages/Components/Styles/ProductDetail.module.css";
import Link from "next/link";
import NavBar from "./Components/NavBar";
import ReviewRating from "./Components/ReviewRating";
import { addProduct } from "@/redux/slice/cartSlice";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { categories } = router.query;
  const { countryId } = router.query;
  const productDetail = useSelector((state) => state.products.detail);
  const hideMessage = useSelector((state) => state.products.hideProductMessage)
  const deletedMessage = useSelector((state) => state.products.deleteProductMessage)
  const cart = useSelector(state => state.carts.cart)
  const [isVisible, setIsVisible] = useState(productDetail?.catalog_listing);
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleted, setShowModalDeleted] = useState(false)
  const [modalHide, setModalHide] = useState(false);

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
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.length > 0) {
      dispatch(addProduct(savedCart));
    } else {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);


  useEffect(() => {
    setIsVisible(productDetail?.catalog_listing)
    dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
    return () => dispatch(cleanDetail());
  }, [dispatch, id, countryId, categories]);

  useEffect(() => {
    setIsVisible(productDetail?.catalog_listing);
  }, [productDetail]);

  const handlerClic = async () => {
    await dispatch(hideProduct(id));
    setIsVisible(!isVisible);
    setModalHide(true)
  }
  const handlerCorfirm = async () => {
    await dispatch(deleteProduct(id));
    setShowModal(false);
    setShowModalDeleted(true)

  };

  const handlerAddCart = () => {
    dispatch(addProduct(productDetail))
  };

  const handlerCancel = async () => {
    setShowModal(false);
    setModalHide(false)
  }
  const handlerDeleted = async () => {
    setShowModal(false);
    setModalHide(false)
    setShowModalDeleted(true)
    router.push("/Home")
  }
  const handlerDelete = async () => {
    setShowModal(true);

  };

  let admin = true // HARIAMOS LA VALIDACION DEL TOKEN 

  return (

    <div className={styles.fondo}>

      <>

        <Link href="/Home">
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
            </svg>
          </button>
        </Link>

        <NavBar></NavBar>

        <div className={styles.container}>

          {admin && (
            <>
              <button className={`${styles.buttonOcultar} ${isVisible ? styles.mostrar : styles.ocultar}`} onClick={handlerClic} >{isVisible ? "Ocultar Producto" : 'Mostrar Producto'}</button>
              <button className={styles.buttonDelete} onClick={handlerDelete}>Eliminar Producto</button>
              <button className={styles.buttonAddCart} onClick={handlerAddCart}>Agregar al carrito</button>
            </>)}
          <>
            {showModal && admin && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <h2>Confirmación de Eliminación</h2>
                  <p>¿Estás seguro de que quieres eliminar el producto {productDetail.title}?</p>
                  <div className={styles.modalButtons}>
                    <button onClick={handlerCorfirm}>Eliminar</button>
                    <button onClick={handlerCancel}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </>
          <>
            {admin && showModalDeleted && (
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
            {admin && modalHide && (
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


          <div className={styles.imageContainer}>
            <img src={productDetail.thumbnail} alt={productDetail.title} className={styles.thumbnail} />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{productDetail.title}</h1>
            <h2 className={styles.price}>
              {productDetail.currency_id} ${productDetail.original_price}
            </h2>
            <ul className={styles.attributeList}>{renderedAttributes}</ul>
          </div>
        </div>

        <div className={styles.h3Container}>
          <div className={styles.h3InnerContainer}>
            <h3>+ {productDetail.available_quantity} disponibles</h3>
            <h3>+ {productDetail.sold_quantity} vendidos</h3>
            <h3 className={styles.storeName}>
              Store Oficial: {productDetail.official_store_name ? productDetail.official_store_name : "No disponible"}
            </h3>
            {/* <h3>{productDetail.shipping}</h3> */}
            <h3>País: {productDetail.country}</h3>
          </div>
        </div>
        <ReviewRating></ReviewRating>
      </>
    </div>
  );
};

const DetailProductWithProvider = () => {
  return (
    <Providers>
      <DetailProduct />
    </Providers>
  );
};

export default DetailProductWithProvider;
