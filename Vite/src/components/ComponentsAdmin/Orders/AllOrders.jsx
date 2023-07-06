import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import Styles from './LastOrders.module.css';
import moment from 'moment';

const AllOrders = ({ deletedSales }) => {
  const [limitedSales, setLimitedSales] = useState([]);

  useEffect(() => {
    const sortedSales = deletedSales ? [...deletedSales].sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt))) : [];
    setLimitedSales(sortedSales);
  }, [deletedSales]);

  return (
    <div className={Styles.container}>
      <h1>Pedidos Procesados</h1>
      <div>
        {limitedSales.map((sale, index) => {
          return (
            <div key={index} className={Styles.order}>
              <div className={Styles.faShop}>
                <FaShoppingBag className='text-blue-800' />
              </div>
              <div className={Styles.textContainer}>
                <p className='text-gray-800 font-bold'>${sale?.total_price / 100}</p>
                <p className='text-gray-400 text-sm'>{sale?.user_id}</p>
                <p className={Styles.date}>{moment(sale?.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrders;
