import React, { useState } from 'react';
import { FaShoppingBag, FaUsers, FaChartLine, FaClipboardList, FaHome, FaLaptopCode } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
    className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
    style={{ width: isOpen ? '20%' : '5%' }}
  >
    <button className={styles['toggle-btn']} onClick={toggleSidebar}>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav className={styles['nav']}>
      <ul className={styles['ul']}>
      <li className={styles['li']}>
                <a className={styles['a']} href="/Home">
                  <FaHome className={styles['icon']} />
                  <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Home</span>
                </a>
              </li>
              <li className={styles['li']}>
                <a className={styles['a']} href="/DashboardAdmin">
                  <FaLaptopCode className={styles['icon']} />
                  <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Dashboard</span>
                </a>
              </li>
        <li className={styles['li']}>
          <a className={styles['a']} href="/DashboardAdmin/Products">
            <FaShoppingBag className={styles['icon']} />
            <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Productos</span>
          </a>
        </li>
        <li className={styles['li']}>
          <a className={styles['a']} href="/DashboardAdmin/Users">
            <FaUsers className={styles['icon']} />
            <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Usuarios</span>
          </a>
        </li>
        <li className={styles['li']}>
          <a className={styles['a']} href="/DashboardAdmin/Statistics">
            <FaChartLine className={styles['icon']} />
            <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Estadisticas</span>
          </a>
        </li>
        <li className={styles['li']}>
                <a className={styles['a']} href="/DashboardAdmin/Sales">
                  <FaClipboardList className={styles['icon']} />
                  <span className={`${styles['text']} ${isOpen ? '' : styles.hidden}`}>Ventas</span>
                </a>
              </li>
      </ul>
    </nav>
  </div>
  );
};

export default Sidebar;

