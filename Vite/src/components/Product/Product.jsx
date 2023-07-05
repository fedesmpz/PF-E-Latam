import { Link } from "react-router-dom";
import Styles from "./Product.module.css"

const Product = ({ id, title, thumbnail, original_price, currency_id, price, sale_price, categories, catalog_listing, shipping }) => {

    let countryId;

    if (currency_id === "ARS") {
        countryId = "ARG";
    } else if (currency_id === "COP") {
        countryId = "COL";
    } else if (currency_id === "MXN") {
        countryId = "MEX";
    }

    const maxLength = 60;

    const shortenTitle = (title) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    };
    return (
        <div>
            <Link className={Styles.link} to={`/DetailProduct?countryId=${countryId}&categories=${categories}&id=${id}`}>
                <div className={Styles.card}>
                    <img src={thumbnail} alt={title} />
                    <div className={Styles.cardDetails}>
                        <h2 className={`${Styles.title} ${Styles.thinTitle}`}>{shortenTitle(title)}</h2>
                        <div className={Styles.priceTag}>
                        {sale_price ? ( <>
                            <span className={Styles.original_price}> ${original_price}</span> 
                            <span className={Styles.sale_price}> ${price}</span> 
                        </> )
                        : (<span className={Styles.price}>${original_price}</span>)
                        }
                            {/* {sale_price ? ( <>
                                    <p className={Styles.sale_price}>$ {currency_id} {price}</p>
                                    <p className={Styles.original_price}>$ {currency_id} {original_price}</p>
                                </> ) : (
                                <p className={Styles.price}>$ {currency_id} {original_price}</p>
                            )} */}
                        </div>
                        { shipping && <span className={Styles.shipping}>Envío gratis</span> }
                        
                        
                        <span className={Styles.category}>{categories}</span>
                        <p className={`${!catalog_listing ? Styles.hiddenProductTag : Styles.hideTag}`}>
                            {!catalog_listing ? 'Producto oculto' : ''}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Product;