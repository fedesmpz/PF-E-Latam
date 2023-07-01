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
    const array = useSelector((state) => state.products.products);
    const concatenatedObjects = array.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
    }, []);

    let  currentProducts = null
    if (!userData?.isAdmin || !userData?.isSuperAdmin) {
        currentProducts = concatenatedObjects.filter(
            (product) => product.catalog_listing === true
        );
    } else if (userData?.isAdmin || userData?.isSuperAdmin){
        currentProducts = concatenatedObjects
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15);
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

    useEffect(()=>{
        dispatch(loginUserLocal())
        
    },[])

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

    return (
        <div className={style.body}>
          <div className="row">
          <div className="col-md-3 filter-column">
              <Filter
                setCurrentPage={setCurrentPage}
                setOrden={setOrden}
                orden={orden}
                countryId={productsCountry}
              />
            </div>
            <div className="col-md-9 product-column">
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
          </div>
        </div>
      );
    };
    

export default Home
