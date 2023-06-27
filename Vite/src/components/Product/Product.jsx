import { Link } from "react-router-dom";
import Styles from "./Product.module.css"

const Product = ({ id, title, thumbnail, original_price, currency_id, price, sale_price, categories, catalog_listing }) => {

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
                        {sale_price ? (
                            <>
                                <p className={Styles.text}>Precio<s>{original_price}{currency_id}</s></p>
                                <p className={Styles.text}>Oferta: {price}{currency_id}</p>
                            </>
                        ) : (
                            <p className={Styles.price}>$ {currency_id} {original_price}</p>
                        )}
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