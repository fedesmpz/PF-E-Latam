import Link from "next/link";

const Product = ({ id, title, thumbnail, original_price, currency_id, price, sale_price, categories }) => {

    let countryId;

    if (currency_id === "ARS") {
        countryId = "ARG";
    } else if (currency_id === "COP") {
        countryId = "COL";
    } else if (currency_id === "MXN") {
        countryId = "MEX";
    }

    return (
        <div>
           <Link href={`/DetailProduct?countryId=${countryId}&categories=${categories}&id=${id}`}>
                <div>
                    <img src={thumbnail} alt={title} />
                    <h2>{title}</h2>
                    {sale_price ? (
                        <>
                            <p>Precio original: <s>{original_price}{currency_id}</s></p>
                            <p>Oferta: {price}{currency_id}</p>
                        </>
                    ) : (
                        <p>Precio: {original_price}{currency_id}</p>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default Product;