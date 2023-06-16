import Product from "./Product";
import Styles from "./Styles/Products.module.css"

const Products = ({currentProducts}) => {
   return (
      <div className={Styles.productContainer}>
         <div className={Styles.products}>
         {
            currentProducts.map(({ id,title, thumbnail, original_price, currency_id, price, sale_price,categories }) => {
               return(
                  <Product
                  key={id}
                     id={id}
                     title={title}
                     thumbnail={thumbnail}
                     original_price={original_price}
                     currency_id={currency_id}
                     price={price}
                     sale_price={sale_price}
                     categories={categories}
                  />
               )
            })
         }
         </div>
      </div>
      
   )
}

export default Products;
