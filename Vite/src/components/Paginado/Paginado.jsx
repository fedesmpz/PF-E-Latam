import { useEffect, useState } from "react";
import styles from "./Paginado.module.css";

const Paginado = ({ productsPerPage, products, paginado, currentPage }) => {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setActivePage(1);
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

  const goToPreviousPage = () => {
    if (activePage > 1) {
      handlePageClick(activePage - 1);
    }
  };

  const goToNextPage = () => {
    if (activePage < pageNumbers.length) {
      handlePageClick(activePage + 1);
    }
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        <li>
          <button
            className={
              activePage === 1 ? `${styles.pageButton} ${styles.disabledButton}` : styles.pageButton
            }
            onClick={goToPreviousPage}
            disabled={activePage === 1}
          >
            &lt;
          </button>
        </li>
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
        <li>
          <button
            className={
              activePage === pageNumbers.length ? `${styles.pageButton} ${styles.disabledButton}` : styles.pageButton
            }
            onClick={goToNextPage}
            disabled={activePage === pageNumbers.length}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginado;