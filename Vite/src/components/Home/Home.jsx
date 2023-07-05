import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProductsByCountries } from "../../redux/slice/productSlice";
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
    const array = useSelector((state) => state.products.productsSoD);
    const [hasProducts, setHasProducts] = useState(true);
    const [currentProducts, setCurrentProducts] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    useEffect(() => {
        const concatenatedObjects = array.reduce((accumulator, currentArray) => {
            return accumulator.concat(currentArray);
        }, []);
        
        let filteredProducts;
        if (!userData?.isAdmin || !userData?.isSuperAdmin) {
            filteredProducts = concatenatedObjects.filter(
                (product) => product.catalog_listing === true
            );
        } else if (userData?.isAdmin || userData?.isSuperAdmin) {
            filteredProducts = concatenatedObjects
        }

        setCurrentProducts(filteredProducts);
    }, [array, userData]);

    useEffect(() => {
        setHasProducts(currentProducts.length > 0);
    }, [currentProducts]);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(loginUserLocal())
    }, [])

    useEffect(() => {
        dispatch(axiosAllProductsByCountries(productsCountry));
    }, [dispatch, productsCountry]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(loginUserLocal())
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (isLoading) {
        return <LoaderLanding />;
    }

    const paginatedProducts = currentProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    return (
        <div className={style.body}>
            <Filter
                setCurrentPage={setCurrentPage}
                countryId={productsCountry}
            />
            <div className={style.main}>
            {hasProducts ? (
                <>
                    <Products currentProducts={paginatedProducts} />
                    <Paginado
                        key="paginado"
                        productsPerPage={productsPerPage}
                        products={currentProducts.length}
                        paginado={paginado}
                        currentProducts={paginatedProducts}
                    />
                </>
            ) : (
                <div className={style.error}>
                    <h2>Ups!</h2>
                    <p>No se encontraron productos con esos filtros.</p>
                </div>
            )}
            </div>
        </div>
    );
};

export default Home;
