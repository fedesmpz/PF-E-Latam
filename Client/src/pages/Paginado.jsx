import { useEffect, useState } from "react";
import styles from "./styles/Paginado/Paginado.module.css";

const Paginado = ({ productsPerPage, products, paginado, currentPage }) => {
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    paginado(1);
  }, [products]);

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(products / productsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
    paginado(pageNumber);
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((n) => (
          <li key={n}>
            <button
              className={
                activePage === n ? `${styles.pageButton} ${styles.activePageButton}` : styles.pageButton
              }
              onClick={() => handlePageClick(n)}
            >
              {n}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginado;