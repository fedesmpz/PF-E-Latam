import { axiosAllProductByCountryCategoryId, cleanDetail } from "@/redux/slice/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider";
import styles from "../pages/Components/Styles/ProductDetail.module.css";
import Link from "next/link";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { categories } = router.query;
  const { countryId } = router.query;

  const productDetail = useSelector((state) => state.products.detail);
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
        </li>
      );
    });
  } else {
    renderedAttributes = attributes
  }

  useEffect(() => {
    dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
    return () => dispatch(cleanDetail());
  }, [dispatch, id, countryId, categories]);



  return (
    <>
      <Link className={styles.link} href="/Home">
        volver
      </Link>

      <div className={styles.container}>
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
    </>
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
