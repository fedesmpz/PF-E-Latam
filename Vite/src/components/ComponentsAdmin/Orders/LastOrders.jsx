import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import moment from 'moment';
import Styles from './LastOrders.module.css';
import { axiosAllSales } from '../../../redux/slice/saleSlice';

const LastOrders = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  const [limitedSales, setLimitedSales] = useState([]);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

  useEffect(() => {
    const sortedSales = [...sales].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));
    const limitedSales = sortedSales.slice(0, 6);
    setLimitedSales(limitedSales);
  }, [sales]);

  return (
    <div className={Styles.container}>
      <h1>Ordenes recientes</h1>
      <ul>
        {limitedSales.map((sale, id) => (
          <li key={id} className={Styles.order}>
            <div className={Styles.faShop}>
              <FaShoppingBag className="text-blue-800" />
            </div>
            <div className={Styles.textContainer}>
              <p className="text-gray-800 font-bold">${sale.total_price / 100}</p>
              <p className="text-gray-400 text-sm">{sale.user_id}</p>
            </div>
            <p className={Styles.date}>{moment(sale.createdAt).format('YYYY-MM-DD HH:mm')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastOrders;
