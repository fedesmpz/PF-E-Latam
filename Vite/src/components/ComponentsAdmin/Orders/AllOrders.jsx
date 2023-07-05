import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaShoppingBag } from 'react-icons/fa';
import Styles from './LastOrders.module.css';
import moment from 'moment';

// const AllOrders = ({ deletedSales }) => {
  const AllOrders = () => {
  const [limitedSales, setLimitedSales] = useState([]);
  const [deletedSales, setDeletedSales] = useState([]);
  const sales = useSelector((state) => state.sale.sales);

  useEffect(() => {
    const sortedSales = [...sales].sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt)));
    setLimitedSales(sortedSales);
  }, [sales]);

  
  return (
    <div className={Styles.container}>
      <h1>Todas las Ventas</h1>
      <ul>
        {limitedSales.map((sale, id) => (
          <li key={id} className={Styles.order}>
            <div className={Styles.faShop}>
              <FaShoppingBag className='text-blue-800' />
            </div>
            <div className={Styles.textContainer}>
              <p className='text-gray-800 font-bold'>${sale.total_price / 100}</p>
              <p className='text-gray-400 text-sm'>{sale.user_id}</p>
            </div>
            <p className={Styles.date}>{moment(sale.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
          </li>
        ))}
      </ul>
      </div>
  );
};

  // useEffect(() => {
  //   const sortedSales = deletedSales ? [...deletedSales].sort((a, b) => moment(b.updatedAt).diff(moment(a.updatedAt))) : [];
  //   setLimitedSales(sortedSales);
  // }, [deletedSales]);

//   return (
//     <div className={Styles.container}>
//       <h1>Productos eliminados</h1>
//       <div>
//         <ul>
//           {limitedSales?.map((sale, index) => {
//             console.log(limitedSales);
//             return (
//               <li key={index}>
//                 <div>
//                   <p>${sale.total_price / 100}</p>
//                   <p>{sale.user_id}</p>
//                   <p>{moment(sale.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

export default AllOrders;
