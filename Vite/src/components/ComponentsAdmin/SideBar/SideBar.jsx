import React, { useState } from 'react';
import { FaShoppingBag, FaUsers, FaChartLine, FaClipboardList, FaHome, FaLaptopCode } from 'react-icons/fa';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
    className={`${styles.sidebar} ${isOpen ? styles.open : styles.close}`}
    >
    <button className={styles.btnToggle} onClick={toggleSidebar}>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav className={styles.navi}>
      <ul className={styles.desorList}>
        <li className={styles.orderList}>
                    <Link  className={styles.menuItem} to="/Home">
                      <FaHome className={styles.icon} />
                      <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Inicio</span>
                    </Link>
        </li>
        <li className={styles.orderList}>
                    <Link className={styles.menuItem} to="/DashboardAdmin">
                      <FaLaptopCode className={styles.icon} />
                      <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Panel</span>
                    </Link>
        </li>
        <li className={styles.orderList}>
                <Link className={styles.menuItem} to="/DashboardAdmin/Products">
                  <FaShoppingBag className={styles.icon} />
                  <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Productos</span>
                </Link>
        </li>
        <li className={styles.orderList}>
                <Link className={styles.menuItem} to="/DashboardAdmin/Users">
                  <FaUsers className={styles.icon} />
                  <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Usuarios</span>
                </Link>
              
          
        </li>
        <li className={styles.orderList}>
              <Link className={styles.menuItem} to="/DashboardAdmin/Statistics">
                <FaChartLine className={styles.icon} />
                <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Estadisticas</span>
              </Link>
        </li>
        <li className={styles.orderList}>
              <Link className={styles.menuItem} to="/DashboardAdmin/Sales">
                  <FaClipboardList className={styles.icon} />
                  <span className={`${styles.text} ${isOpen ? '' : styles.hidden}`}>Ventas</span>
              </Link>     
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default Sidebar;

