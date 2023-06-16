'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProducts } from "../redux/slice/productSlice"
import Providers from "@/redux/provider/Provider"
import Paginado from "./Paginado";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import Link from "next/link";
import style from "./Styles/Home/Home.module.css"
import "bootstrap/dist/css/bootstrap.css"

const Home = () => {
    const dispatch = useDispatch();
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
        dispatch(axiosAllProducts())
    }, [dispatch]);
    
    //Lógica para el paginado
    const array = useSelector((state) => state.products.allProducts);
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


            <h1>Esto es el Home</h1>

            <Link href="/" >Landing</Link>

            <Link href="/CreateProduct" >CreateProduct</Link>

            <Filter
            setCurrentPage={setCurrentPage}
            setOrden={setOrden}
            orden={orden}
            />

            <div className="paginado">
            <Paginado
            key="paginado"
            productsPerPage={productsPerPage}
            products={products.length}
            paginado={paginado}
            currentProducts={currentProducts}
            />
            </div>

            <Products
            currentProducts={currentProducts}
            />

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

