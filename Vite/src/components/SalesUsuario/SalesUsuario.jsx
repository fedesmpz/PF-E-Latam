import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { salesByUser, findProduct } from "../../redux/slice/productSlice";

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
    <div>
      <h2>Tu historial de compras:</h2>
      {productList?.map((product, index) => (
        <div key={index}>
          <p>{product?.title}</p>
          <img src={product?.thumbnail} alt={product.title} />
          <h3>Precio: ${product?.original_price}</h3>
        </div>
      ))}
    </div>
  );
};

export default SalesUsuario;
