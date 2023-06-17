"use client"
import { axiosAllProductByCountryCategoryId } from "@/redux/slice/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider"
import styles from "../pages/Components/Styles/ProductDetail.module.css"
const DetailProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { categories } = router.query;
    const { countryId } = router.query;

    const productDetail = useSelector((state) => state.products.detail);
    const attributes = productDetail.attributes ? JSON.parse(productDetail.attributes) : [];
 useEffect(() => {
      dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
    // return () => dispatch(cleanDetail())  CREAR PARA LIMPIAR DETALLES
  }, [dispatch, id, countryId, categories]);


    const renderedAttributes = attributes.map((attribute) => {
        const attributeName = attribute.name;
        const attributeValue = attribute.value;
        return (
            <li key={attributeName} className={styles.attribute}>
                <span className={styles.attributeName}>{attributeName}:</span> {attributeValue}
            </li>
        );
    });

    return (
        <div className={styles.container}>
        {productDetail?.title ? (
          <>
            <img src={productDetail.thumbnail} alt={productDetail.title} />
            <h1 className={styles.title}>{productDetail.title}</h1>
            <ul className={styles.attributeList}>{renderedAttributes}</ul>
      
            {productDetail.sale_price ? (
              <>
                <p>Precio original: <s>{productDetail.original_price}{productDetail.currency_id}</s></p>
                <p>Oferta: {productDetail.price}{productDetail.currency_id}</p>
              </>
            ) : (
              <>
                <h2 className={styles.price}>Precio Orginal: {productDetail.original_price} {productDetail.currency_id}</h2>
                <h2 className={styles.price}>Precio en Sale: {productDetail.price} {productDetail.currency_id}</h2>
              </>
            )}
      
            <h3>Cantidad disponible: {productDetail.available_quantity} unidades</h3>
            <h3>Ya vendidas: {productDetail.sold_quantity} unidades</h3>
            <h3>Store Oficial: {productDetail.official_store_name}</h3>
            <h3>{productDetail.shipping}{productDetail.shipping}</h3>
            <h3>Pais: {productDetail.country}</h3>
          </>
        ) : (
          <h2>Loading... </h2> // MODIFICAR ESTO OBVIAMENTE
        )}
      </div>
    )
}


const DetailProductWithProvider = () => {
    return (
        <Providers>
            <DetailProduct />
        </Providers>
    );
};


export default DetailProductWithProvider;