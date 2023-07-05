import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { salesByUser, findProduct } from "../../redux/slice/productSlice";
import Styles from './SalesUsuario.module.css'

const SalesUsuario = () => {
  const { email } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const ventas = useSelector((state) => state.products.sales);
  const productos = useSelector((state) => state.products.productById);

  const [productList, setProductList] = useState([]);

  const [searchedProductIds, setSearchedProductIds] = useState([]);

  useEffect(() => {
    if (email) {
      dispatch(salesByUser(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    const productsIds = ventas.flatMap((venta) => venta.products_id);
    productsIds.forEach((productId) => {
      if (!searchedProductIds.includes(productId)) {
        dispatch(findProduct(productId));
        setSearchedProductIds(prevIds => [...prevIds, productId]);
      }
    });
  }, [dispatch, ventas, searchedProductIds]);

  useEffect(() => {
    if (productos) {
      setProductList((list) => [...list, productos]);
    }
  }, [productos]);


  return (
    <div className={Styles.container}>
      <h2 className={Styles.titleSales}>Tu historial de compras:</h2>
      <div>

      {productList?.map((product, index) => (
        <div className={Styles.productContainer}>

            <div key={index}>
              <img className={Styles.image} src={product?.thumbnail} alt={product.title} />
              <div className={Styles.dataContainer}>
                <p>{product?.title}</p>
                <h3>Precio: ${product?.original_price}</h3>

              </div>
            </div>

        </div>
      ))}
      </div>
    </div>
  );
};

export default SalesUsuario;
