//import { axiosAllProducts } from "../../redux/slice/productSlice";
import { useDispatch } from "react-redux";
import CountryImages from "./CountryImages";
import "./Styles/Filter.module.css"

const Filter = ({ setOrden, setCurrentPage }) => {
    const dispatch = useDispatch();

//   function handleFilterByCountry(event) {
//     dispatch(axiosAllProducts(event.target.value));
//   }

//   function handleSort(e) {
//     e.preventDefault();
//     dispatch(orderByName(e.target.value));
//     setCurrentPage(1);
//     setOrden(`Ordenado ${e.target.value}`);
//   }

//   function handlePrice(e) {
//     e.preventDefault();
//     dispatch(orderByPrice(e.target.value));
//     setCurrentPage(1);
//     setOrden(`Ordenado ${e.target.value}`);
//   }

  return (
    <div className="filter-container">
    <div className="bar-promo">
    <h4>
    blablablablaasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    </h4>
    <button className="btn-promo" >botón para comprar</button>
    <span>Texto cualquiera</span>
    </div>


      <div className="filter-item-img">
        <div className="country-images">
          {Object.entries(CountryImages).map(([country, image]) => (
            <div key={country} className="country-image"> 
              <img src={image} alt={country} />
              <span>{country}</span>
            </div>
          ))}
        </div>
      </div>



      <div className="filter-row">
        <div className="filter-item 1">
          <label html="price-select">Price:</label>
          <select id="price-select" className="filter-select" onChange={(e) => handlePrice(e)}>
            <option value="menormayor">From smallest to Largest</option>
            <option value="mayormenor">From older to Younger</option>
          </select>
        </div>
        
        <div className="filter-item tres">
          <label html="sort-select">Order:</label>
          <select id="sort-select" className="filter-select" onChange={(e) => handleSort(e)}>
            <option value="asc">Upward (A-Z)</option>
            <option value="des">Falling (Z-A)</option>
          </select>
        </div>
      </div>



    </div>
  );
};

export default Filter;
