import Link from "next/link";

const Product = ({ id,title, thumbnail, original_price, currency_id, price, sale_price, categories }) => {

  let countryID;

  if (currency_id === "ARS") {
    countryID = "ARG";
  } else if (currency_id === "COP") {
    countryID = "COL";
  } else if (currency_id === "MXN") {
    countryID = "MEX";
  }

    return (
        <div>
        <Link href={`/DetailProduct/[countryId]/[categories]/[id]`} as={`/DetailProduct/${countryID}/${categories}/${id}`}>
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