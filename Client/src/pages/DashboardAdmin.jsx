import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAllProductsByCountries } from "../redux/slice/productSlice"
import NavbarAdmin from "./Components/NavbarAdmin"
import Providers from "@/redux/provider/Provider";
import TableProducts from "./ComponentsAdmin/Products/TableProducts"
import AllProductsAdmin from "./ComponentsAdmin/Products/AllProductsAdmin"
import ButtonNavAdmin from "./Components/ButtonNavAdmin"
import StylesAdmin from "./styles/DashboardAdmin/DashboardAdmin.module.css"




import SalesCard from "./ComponentsAdmin/Statistics/SalesCard";
import SalesStats from "./ComponentsAdmin/Statistics/SalesStats";
import LastOrders from "./ComponentsAdmin/Orders/LastOrders";

const DashboardAdmin = () => {

    //lógica para traerme a los productos y organizarlos y paginarlos
    const dispatch = useDispatch();
    const productsCountry = useSelector((state) => state.products.country);
    useEffect(() => {
        dispatch(axiosAllProductsByCountries(productsCountry));
    }, [dispatch, productsCountry]);
    const array = useSelector((state) => state.products.products);
    const concatenatedObjects = array.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
    }, []);
    console.log("lalala"+concatenatedObjects)
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


    //lógica para el circulo estadístico
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const [showSalesCard, setShowSalesCard] = useState(false);
    const handleSalesClick = () => {
        setShowSalesCard(true);
    }
    const totalSales = 100;
    const todaySales = 12;
    const monthSales = 71;
    const data = {
        labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
        datasets: [{
            values: [60, 20, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6386', '#36A4EB', '#FFCE58']
        }]
    } 
    
    return (
        <div>
            <NavbarAdmin/>
        <div className={StylesAdmin.containerAdmin}>
            <div className={StylesAdmin.containerHomeBar}>
                <ButtonNavAdmin/>
            </div>

            <div className={StylesAdmin.containerHomeAdmin}>
                <div className={StylesAdmin.containerProducts}>
                    <TableProducts
                        key="paginado"
                        productsPerPage={productsPerPage}
                        products={currentProducts.length}
                        paginado={paginado}
                        currentProducts={paginatedProducts}
                    />
                    <AllProductsAdmin currentProducts={paginatedProducts} />
                </div>
                <SalesCard 
                totalSales={totalSales}
                todaySales={todaySales}
                monthSales={monthSales}/>
                <SalesStats />
                <LastOrders />
            </div>
        </div>
        </div>    
    )
    
}




const DashboardAdminWithProvider = () => {
    return (
        <Providers>
            <DashboardAdmin/>
            
        </Providers>
    );
};


export default DashboardAdminWithProvider;