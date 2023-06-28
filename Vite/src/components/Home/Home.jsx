'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosProductsByCatalogListing, axiosAllProductsByCountries } from "../../redux/slice/productSlice";
import { loginUserLocal } from "../../redux/slice/userSlice"
import Paginado from "../../components/Paginado/Paginado"
import Products from "../../components/Products/Products.jsx";
import Filter from "../../components/Filter/Filter.jsx";
import style from "../../components/Home/Home.module.css"
import LoaderLanding from "../../components/LoaderLanding/LoaderLanding.jsx"
import "bootstrap/dist/css/bootstrap.css"


const Home = () => {
    const dispatch = useDispatch();
    const productsCountry = useSelector((state) => state.products.country);
    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector((state) => state.user.userData);

    //SE DESPACHA EL ESTADO DEL LOCALSTORAGE Y SE VALIDA
    useEffect(()=>{
        dispatch(loginUserLocal())
        
    },[])
    

    useEffect(() => {
        setIsLoading(true);
        console.log(userData);
       
        dispatch(loginUserLocal())
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (userData.isAdmin || userData.isSuperAdmin) {
          dispatch(axiosAllProductsByCountries(productsCountry));
        } else {
          dispatch(axiosProductsByCatalogListing(productsCountry));
        }
      }, [dispatch, productsCountry, userData]);


    const access = userData.access
    const admin = userData.isAdmin
    const superAdmin = userData.isSuperAdmin
    const verified = userData.verified


    const array = useSelector((state) => state.products.products);

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
            </div>
        </div>
    );
};

export default Home