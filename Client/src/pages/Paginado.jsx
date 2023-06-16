import Link from "next/link";
import { useEffect } from "react";

const Paginado = ({ productsPerPage, products, paginado, currentPage }) => {

    useEffect(()=>{
        paginado(1)
    },[products])

    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(products / productsPerPage); i++) {
        pageNumbers.push(i + 1);
    }

return (
    <nav>
        <ul className="ul">
            {pageNumbers.map((n) => (
        <li key={n}>
            <button
            className={currentPage === n ? "container current" : "container"}
            onClick={() => paginado(n)}
            >
            {n}
            </button>
        </li>
                ))}
        </ul>
    </nav>
    );
}

export default Paginado;


