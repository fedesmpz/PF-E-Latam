import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice"
import StylesAdmin from "./Products.module.css"
import TableSeller from '../ComponentsAdmin/ProductsSeller/TableSeller'
import AllProductsSellers from '../ComponentsAdmin/ProductsSeller/AllProductsSellers'
import { Link } from 'react-router-dom';



const Products = () => {
  const dispatch = useDispatch();
  const productsCountry = useSelector((state) => state.products.country);
  useEffect(() => {
    dispatch(axiosAllProductsByCountries(productsCountry));
  }, [dispatch, productsCountry]);
  const array = useSelector((state) => state.products.products);
  const concatenatedObjects = array.reduce((accumulator, currentArray) => {
    return accumulator.concat(currentArray);
  }, []);

  let currentProducts = concatenatedObjects;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(50);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [orden, setOrden] = useState('');
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [isOpen, setIsOpen] = useState(false);




  return (
    <div className={StylesAdmin.containerAdmin} >
      <Sidebar />
      <div className={StylesAdmin.containerHomeAdmin}>
        <div className={StylesAdmin.containerProducts}>
        <div className={StylesAdmin.containerSuperior}>
          <TableSeller
            key="paginado"
            productsPerPage={productsPerPage}
            products={currentProducts.length}
            paginado={paginado}
            currentProducts={paginatedProducts}
          />
        <Link className={StylesAdmin.button} to="/CreateProduct">Nuevo</Link>
        </div>
          <AllProductsSellers currentProducts={paginatedProducts} />
        </div>
      </div>
    </div>
  )
}


export default Products;