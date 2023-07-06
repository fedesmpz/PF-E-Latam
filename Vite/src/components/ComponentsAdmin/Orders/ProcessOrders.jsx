import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import Styles from './LastOrders.module.css';
import moment from 'moment';
import AllOrders from './AllOrders';

const ProcessOrders = ({ onSaleDelete }) => {
  const sales = useSelector((state) => state.sale.sales);

  const [limitedSales, setLimitedSales] = useState([]);
  const [deletedSales, setDeletedSales] = useState([]);

  useEffect(() => {
    const sortedSales = [...sales].sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt)));
    setLimitedSales(sortedSales);
  }, [sales]);


  const handleDelete = (id) => {
    const deletedSale = limitedSales.find((_, index) => index === id);
    const updatedSales = limitedSales.filter((_, index) => index !== id);
    
    setLimitedSales(updatedSales);
    onSaleDelete(deletedSale); 
  };

  return (
    <div className={Styles.container}>
      <h1>Procesamiento de pedidos</h1>
      <ul>
        {limitedSales.map((sale, id) => (
          <li key={id} className={Styles.order}>
            <div className={Styles.faShop}>
              <FaShoppingBag className='text-blue-800' />
            </div>
            <div className={Styles.textContainer}>
              <p className='text-gray-800 font-bold'>${sale.total_price / 100}</p>
              <p className='text-gray-400 text-sm'>{sale.user_id}</p>
              <p className={Styles.date}>{moment(sale.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <button onClick={() => handleDelete(id)} className={Styles.deleteButton}>
              procesar
            </button>
            </div>
          </li>
        ))}
      </ul>
     
      {deletedSales.length > 0 && <AllOrders deletedSales={deletedSales} />}
    </div>
  );
};

export default ProcessOrders;
