import ProductAdmin from "./ProductAdmin";
// import Styles from "./StylesProducts/AllProductsAdmin.module.css"
import Styles from './StylesProducts/AllProductsAdmin.module.css'


const AllProductsAdmin = ({ currentProducts }) => {
   console.log(currentProducts);
   return (
      <div className={Styles.container}>
      <h1>Products</h1>
      <ul>
        {currentProducts.map(({ id, title, thumbnail, original_price, currency_id, price, sale_price, categories,catalog_listing }) => (
          <li
            key={id}
            className={Styles.order}
          >
            <div className={Styles.faShop}>
      <img
        src={thumbnail}
        alt="Producto"
        style={{
          width: 'auto',
          height: '3rem'
        }}
      /> 
            </div>
            <div className={Styles.textContainer}>
              <p className='text-gray-800 font-bold'>{title}</p>
              <p className='text-gray-400 text-sm'>{categories}</p>
            </div>
            <p className={Styles.date}>{price}</p>
          </li>
        ))}
      </ul>
    </div>

   )
}

export default AllProductsAdmin;