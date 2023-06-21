import Link from "next/link";
import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import Providers from "@/redux/provider/Provider";
import SalesCard from './Components/SalesCard';
import SalesStats from './Components/SalesStats';
import Styles from "./Styles/DashboardAdmin/DashboardAdmin.module.css";

const DashboardAdmin = () => {
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

    const chartData = {
        labels: ['Ventas en linea', 'Ventas por mayor', 'Ventas tienda oficial'],
        values: [60, 20, 20],
    } 

    return (
        <div>
            <NavBar></NavBar>
            <div className={Styles.container}>
            {/* <div className="flex items-center justify-between hover:bg-gray-800 hover:text-white cursor-ponter py-2.5 px-4 rounnded0"> */}
                <SalesStats data={chartData}/>
                <button onClick={toggleMenu}>Menú</button>
                {isOpen && (
                    <ul className={Styles.dropdown}>
                        {/* <select className="text-sm border-l-2 border-grey-800 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1"></select> */}
                        <li>
                            <a href="#" onClick={handleSalesClick}>Statistics</a>
                            { showSalesCard &&
                                <SalesCard 
                                totalSales={totalSales}
                                todaySales={todaySales}
                                monthSales={monthSales}
                                />
                            }
                        </li>
                        <li>
                            <Link href="">Sales</Link>
                        </li>
                        <li>
                            <Link href="">Products</Link>
                        </li>
                        <li>
                            <Link href="">Settings</Link>
                        </li>
                    </ul>
                )}
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