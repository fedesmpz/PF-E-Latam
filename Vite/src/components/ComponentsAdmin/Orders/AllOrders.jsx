import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa'
import Styles from './LastOrders.module.css'
import { axiosAllSales } from '../../../redux/slice/saleSlice';

const AllOrders = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    dispatch(axiosAllSales());
  }, [dispatch]);

    return (
        <div className={Styles.container}>
          <h1>Todas las ordenes</h1>
          <ul>
            {sales.map((sale, id) => (
            <li key={id} className={Styles.order}>
              <div className={Styles.faShop}>
                <FaShoppingBag className="text-blue-800" />
              </div>
              <div className={Styles.textContainer}>
                <p className="text-gray-800 font-bold">${sale.total_price / 100}</p>
                <p className="text-gray-400 text-sm">{sale.user_id}</p>
              </div>
              <p className={Styles.date}>{sale.date}</p>
            </li>
            ))}
          </ul>
        </div>
      );
    };

export default AllOrders