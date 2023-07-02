import React from 'react';
import Styles from './styles/SalesCard.module.css';

const SalesCard = ({ totalSales, todaySales, monthSales}) => {

    return (
        <div className={Styles.card}>
            <h3>Estadisticas de ventas</h3>
            <div>
                <p>Total Ventas:</p>
                <span>{totalSales}</span>
            </div>
            <div>
                <p>Ventas de hoy:</p>
                <span>{todaySales}</span>
            </div>
            <div>
                <p>Ventas del mes:</p>
                <span>{monthSales}</span>
            </div>
        </div>
    )
}

export default SalesCard;