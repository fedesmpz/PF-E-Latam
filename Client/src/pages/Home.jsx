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
import LoaderLanding from "./Components/LoaderLanding"
import "bootstrap/dist/css/bootstrap.css"
import FooterLanding from "./Components/FooterLanding";
const Home = () => {
    const dispatch = useDispatch();
    const productsCountry = useSelector((state) => state.products.country);
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

    useEffect(() => {
        dispatch(axiosAllProductsByCountries(productsCountry));
    }, [dispatch, productsCountry]);

    const array = useSelector((state) => state.products.products);
    console.log("lalala" + array)
    const concatenatedObjects = array.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
    }, []);

    let currentProducts = concatenatedObjects;
    const [isAdmin, setIsAdmin] = useState(true); //logica para probar si es admin o no ... y si no lo es no le muestra lo de ocultar
    if (!isAdmin) {
        currentProducts = concatenatedObjects.filter(
            (product) => product.catalog_listing === true
        );
    }

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

    if (isLoading) {
        return <LoaderLanding />;
    }

    return (
        <div className={style.body}>
            <NavBar />
            <Filter
                setCurrentPage={setCurrentPage}
                setOrden={setOrden}
                orden={orden}
            />
            <div className="paginado">
                <Products currentProducts={paginatedProducts} />
                <Paginado
                    key="paginado"
                    productsPerPage={productsPerPage}
                    products={currentProducts.length}
                    paginado={paginado}
                    currentProducts={paginatedProducts}
                />
                <SubFooter />
                <FooterLanding />
            </div>
        </div>
    );
};

const HomeWithProvider = () => {
    return (
        <Providers>
            <Home />
        </Providers>
    );
};

export default HomeWithProvider;
