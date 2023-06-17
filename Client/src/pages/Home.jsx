'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProductsByCountries } from "../redux/slice/productSlice"
import Providers from "@/redux/provider/Provider"
import Paginado from "./Paginado";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import SubFooter from "./Components/SubFooter";
import NavBar from "./Components/NavBar"
import Link from "next/link";
import style from "./Styles/Home/Home.module.css"
import "bootstrap/dist/css/bootstrap.css"

const Home = () => {
    const dispatch = useDispatch();

    const productsCountry = useSelector((state) => state.products.country);
    //codigo para que haya un spinner.
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
    
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // codigo para llamar los productos
    useEffect(() => {
        dispatch(axiosAllProductsByCountries(productsCountry))
    }, [dispatch]);
    
    //Lógica para el paginado
    const array = useSelector((state) => state.products.products);
    const concatenatedObjects = array.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
        }, []);
    const products = concatenatedObjects
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(50);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const [orden, setOrden] = useState('');
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return (
            <div>
                <h5>colocar animación del logo cargando...</h5>
            </div>
            );
    }
    return (
        <div className={style.body}>

            <NavBar></NavBar>

            <Filter
            setCurrentPage={setCurrentPage}
            setOrden={setOrden}
            orden={orden}
            />

            <Paginado
            key="paginado"
            productsPerPage={productsPerPage}
            products={products.length}
            paginado={paginado}
            currentProducts={currentProducts}
            />

            <div className="paginado">
            <Products
            currentProducts={currentProducts}
            />

            <Paginado
            key="paginado"
            productsPerPage={productsPerPage}
            products={products.length}
            paginado={paginado}
            currentProducts={currentProducts}
            />

            <SubFooter/>

            </div>
            
            
        </div>
    )
}

const HomeWithProvider = () => {
    return (
        <Providers>
            <Home/>
        </Providers>
    );
};
export default HomeWithProvider;

