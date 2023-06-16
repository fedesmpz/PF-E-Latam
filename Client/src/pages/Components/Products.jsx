import Product from "./Product"

const Products = ({currentProducts}) => {
//hay fallas a la hora de traerme las recetas al home
   return (
      <div>
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
   )
}

export default Products;
