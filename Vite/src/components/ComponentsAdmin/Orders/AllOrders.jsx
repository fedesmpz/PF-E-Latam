import React from 'react'
import { dataTotal } from './Data';
import { FaShoppingBag } from 'react-icons/fa'
import Styles from './LastOrders.module.css'

const AllOrders = () => {
    return (
        <div className={Styles.container}>
          <h1>Todas las ordenes</h1>
          <ul>
            {dataTotal.map((order, id) => (
              <li
                key={id}
                className={Styles.order}
              >
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

export default AllOrders