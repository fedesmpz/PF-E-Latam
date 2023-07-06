import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { salesByUser, findProduct } from "../../redux/slice/productSlice";
import Styles from './SalesUsuario.module.css';
import axios from 'axios'

const SalesUsuario = () => {
  const { email } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  //const ventas = useSelector((state) => state.products.sales);
  const productos = useSelector((state) => state.products.productById);

  const [productList, setProductList] = useState([]);
  const [searchedProductIds, setSearchedProductIds] = useState([]);


  useEffect(()=>{
    const fetchtData = async () =>{
      const response = await axios.get(`https://pf-elatam.onrender.com/sales/allSales/?userId=${email}`)
      const data = response.data
      setProductList(data)
    }
    fetchtData()
  },[])

  // const sortByUpdatedAt = (objects) => {
  //   return objects.slice().sort((a, b) => {
  //     const dateA = new Date(a.updatedAt);
  //     const dateB = new Date(b.updatedAt);
  //     return dateB - dateA;
  //   });
  // };


  // const sortedObjects = sortByUpdatedAt(ventas);

  // useEffect(() => {
  //   if (email) {
  //     dispatch(salesByUser(email));
  //   }
  // }, [dispatch, email]);

  // useEffect(() => {
  //   const productsIds = sortedObjects.flatMap((venta) => venta.products_id);
  //   productsIds.forEach((productId) => {
  //     if (!searchedProductIds.includes(productId)) {
  //       dispatch(findProduct(productId));
  //       setSearchedProductIds((prevIds) => [...prevIds, productId]);
  //     }
  //   });
  // }, [dispatch, sortedObjects, searchedProductIds]);

  // useEffect(() => {
  //   if (productos && !productList.some((product) => product.id === productos.id)) {
  //     setProductList((list) => [...list, productos]);
  //   }
  // }, [productos, productList]);

  // return (
  //   <div className={Styles.container}>
  //     <h2 className={Styles.title}>Mis compras</h2>
  //     <div>
  //       {productList && productList?.map((product, index) => (
  //         product.error !== 'No se pudo encontrar el producto'
  //           ?
  //           <div className={Styles.reviewContainer} key={index}>
  //             <img className={Styles.image} src={product?.thumbnail} alt={product?.title} />
  //             <div className={Styles.dataContainer}>
  //               <p className={Styles.productTitle}>{product?.title}</p>
  //               {product?.original_price ?
  //                 (
  //                   <h3 className={Styles.price}>${product?.original_price}</h3>
  //                 ) : (
  //                   null
  //                 )
  //               }
  //             </div>
  //           </div>
  //           : null
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>Mis compras</h2>
      <div>
        {productList && productList?.map((sale, index) => (
          <div className={Styles.saleContainer} key={index}>
            <h3 className={Styles.saleInfo}>
              Fecha de compra: {new Date(sale?.updatedAt).toLocaleString()}
            </h3>
            <p className={Styles.saleInfo}>Precio total de la compra: ${sale?.total_price/100}</p>
            <div className={Styles.productList}>
              {sale.products?.map((product, index) => (
                <div className={Styles.reviewContainer} key={index}>
                  <img className={Styles.image} src={product?.thumbnail} alt={product?.title} />
                  <div className={Styles.dataContainer}>
                    <p className={Styles.productTitle}>{product?.title}</p>
                    {product?.original_price && (
                      <h3 className={Styles.price}>${product?.original_price}</h3>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default SalesUsuario;

