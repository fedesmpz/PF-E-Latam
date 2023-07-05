import ProductsSeller from "./ProductsSeller";
import Styles from './ProductsSeller.module.css'


const AllProductsSellers = ({ currentProducts }) => {

  return (
    <div className={Styles.container}>
      <ul>
        {currentProducts.map(({ id, title, thumbnail, original_price, currency_id, price, sale_price, categories, catalog_listing, available_quantity, sold_quantity }) => (
          <ProductsSeller
            key={id}
            id={id}
            title={title}
            thumbnail={thumbnail}
            original_price={original_price}
            currency_id={currency_id}
            price={price}
            sale_price={sale_price}
            categories={categories}
            catalog_listing={catalog_listing}
            available_quantity={available_quantity}
            sold_quantity={sold_quantity}
          />
        ))}
      </ul>
    </div>

  )
}

export default AllProductsSellers;