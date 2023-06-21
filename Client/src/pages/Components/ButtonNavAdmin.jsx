import { useState } from 'react';
import styles from './Styles/NavbarPage.module.css'


const Menu = () => {
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    // Lógica de cierre de sesión
  };

  return (
    <>
    <button className={styles['menu-button']} onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    {open && (
      <div className={styles.menu}>
      <div className={styles.back}>
        <ul>
          <li><a href="#">Opción 1</a></li>
          <li><a href="#">Opción 2</a></li>
          <li><a href="#">Opción 3</a></li>
        </ul>
        <button className={styles['logout-button']} onClick={handleLogout}>
        Log out
          </button>
      </div>
      </div>
    )}
    {!open && (
      <div className={styles.back}>
      <div className={styles.menuNon}>
        <ul>
          <li><a href="#"> 1</a></li>
          <li><a href="#"> 2</a></li>
          <li><a href="#"> 3</a></li>
        </ul>
        <button className={styles['logout-buttonNon']} onClick={handleLogout}>
        Log out
          </button>
      </div>
      </div>
    )}
  </>
  );
}

export default Menu;
