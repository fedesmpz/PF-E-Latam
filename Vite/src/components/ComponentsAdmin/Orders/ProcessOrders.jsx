import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import Styles from './LastOrders.module.css';
import { dataTotal } from './Data';

const ProcessOrders = () => {
  const filteredOrders = dataTotal.filter((order) => order.status === 'Processing');

  return (
    <div className={Styles.container}>
      <h1>Procesamiento de pedidos</h1>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id} className={Styles.order}>
            <div className={Styles.faShop}>
              <FaShoppingBag className='text-blue-800' />
            </div>
            <div className={Styles.textContainer}>
              <p className='text-gray-800 font-bold'>${order.total}</p>
              <p className='text-gray-400 text-sm'>{order.name.first}</p>
            </div>
            <p className={Styles.date}>{order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessOrders;
